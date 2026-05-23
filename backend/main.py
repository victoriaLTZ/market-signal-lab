import numpy as np
import pandas as pd
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from services.market_database import search_symbol_with_fallback, get_daily_prices_with_fallback
from services.indicators import compute_indicators
from services.signals import generate_signals


# uvicorn main:app --reload / uvicorn main:app --host 0.0.0.0 --port 8000
# uvicorn -> lance le serveur ASGI Python
# main:app -> fichier main.py , objet app
# add --host 0.0.0.0 -> autorise la connexion réseau
# --port 800 -> lance le backend sur le port 800

app = FastAPI(title="Market Signal Lab API")

# Ajoute le middleware CORS à ton application FastAPI
app.add_middleware(
    # Type de middleware utilisé
    CORSMiddleware,
    # Liste des URLs autorisées à appeler l'API
    allow_origins=[
        # Autorise le frontend lancé en local
        "http://localhost:3000",
        # Front déployé Vercel
        "https://market-signal-lab.vercel.app",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    # Autorise l'envoi des cookies / sessions / authentification
    allow_credentials=True,
    # Autorise toutes les méthodes HTTP :
    # GET, POST, PUT, DELETE, etc.
    allow_methods=["*"],
    # Autorise tous les headers HTTP
    allow_headers=["*"],
)

@app.get("/search")
def search(query: str = Query(..., min_length=1)):
    return {"query": query, "results": search_symbol_with_fallback(query)}

@app.get("/lagging")
def lagging(symbol: str = Query(..., min_length=1)):
    try:
        df = get_daily_prices_with_fallback(symbol)
        df = compute_indicators(df)
        df = generate_signals(df)

        df = df.reset_index().rename(columns={"index": "date"})
        df["date"] = df["date"].astype(str)

        # Remplacer inf, -inf et NaN par None pour JSON
        df = df.replace([np.inf, -np.inf], np.nan)
        df = df.astype(object).where(pd.notna(df), None)

        return {
            "symbol": symbol,
            "data": df.where(df.notna(), None).to_dict(orient="records")
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))