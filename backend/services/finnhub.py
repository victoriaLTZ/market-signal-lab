import os
from datetime import datetime, timedelta

import pandas as pd
import requests


FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")
BASE_URL = "https://finnhub.io/api/v1"

def search_symbol_finnhub(query: str):

    if not FINNHUB_API_KEY:
        raise ValueError("Missing Finnhub API key")

    params = {
        "q": query,
        "token": FINNHUB_API_KEY,
    }

    response = requests.get(
        f"{BASE_URL}/search",
        params=params,
        timeout=20,
    )

    response.raise_for_status()

    data = response.json()

    print("RAW FINNHUB SEARCH:", data, flush=True)

    results = []

    for item in data.get("result", []):

        results.append({
            "symbol": item.get("symbol"),
            "name": item.get("description"),
            "type": item.get("type"),
            "region": "",
            "currency": "",
            "matchScore": "1.0000",
        })

    return results

def convert_symbol_to_finnhub(symbol: str) -> str:
    symbol_map = {
        "BNP.PAR": "BNP.PA",
        "RMS.PAR": "RMS.PA",
        "MC.PAR": "MC.PA",
        "AI.PAR": "AI.PA",
        "AMNU.PAR":"AMUN.PA"
    }

    return symbol_map.get(symbol, symbol)


def get_daily_prices_finnhub(symbol: str) -> pd.DataFrame:
    if not FINNHUB_API_KEY:
        raise ValueError("Missing Finnhub API key")

    finnhub_symbol = convert_symbol_to_finnhub(symbol)

    to_date = datetime.now()
    from_date = to_date - timedelta(days=365)

    params = {
        "symbol": finnhub_symbol,
        "resolution": "D",
        "from": int(from_date.timestamp()),
        "to": int(to_date.timestamp()),
        "token": FINNHUB_API_KEY,
    }

    response = requests.get(
        f"{BASE_URL}/stock/candle",
        params=params,
        timeout=20,
    )

    response.raise_for_status()

    data = response.json()

    print("RAW FINNHUB RESPONSE:", data, flush=True)

    if data.get("s") != "ok":
        raise ValueError(f"Finnhub error: {data}")

    df = pd.DataFrame(
        {
            "open": data["o"],
            "high": data["h"],
            "low": data["l"],
            "close": data["c"],
            "volume": data["v"],
        }
    )

    df.index = pd.to_datetime(data["t"], unit="s")
    df = df.sort_index()

    return df