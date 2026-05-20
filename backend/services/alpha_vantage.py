import os
import requests
from pathlib import Path
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / ".env")

API_KEY = os.getenv("ALPHA_VANTAGE_API_KEY")
BASE_URL = "https://www.alphavantage.co/query"


def search_symbol(query: str):

    if not API_KEY:
        raise ValueError("Missing Alpha Vantage API key")

    params = {
        "function": "SYMBOL_SEARCH",
        "keywords": query,
        "apikey": API_KEY,
    }

    response = requests.get(BASE_URL, params=params)
    response.raise_for_status()

    data = response.json()

    matches = data.get("bestMatches", [])

    results = []

    for item in matches:
        results.append({
            "symbol": item.get("1. symbol"),
            "name": item.get("2. name"),
            "type": item.get("3. type"),
            "region": item.get("4. region"),
            "currency": item.get("8. currency"),
            "matchScore": item.get("9. matchScore"),
        })

    return results


def get_daily_prices(symbol: str):
    if not API_KEY:
        raise ValueError("Missing Alpha Vantage API key")

    params = {
        "function": "TIME_SERIES_DAILY",
        "symbol": symbol,
        "apikey": API_KEY,
        "outputsize": "compact",
    }

    response = requests.get(BASE_URL, params=params)
    response.raise_for_status()

    data = response.json()
    print("API KEY LOADED:", bool(API_KEY))
    print("RAW ALPHA RESPONSE:", data)

    if "Time Series (Daily)" not in data:
        raise ValueError(data)

    time_series = data["Time Series (Daily)"]

    df = pd.DataFrame.from_dict(time_series, orient="index")
    df.index = pd.to_datetime(df.index)
    df = df.sort_index()

    df.columns = ["open", "high", "low", "close", "volume"]
    df = df.astype(float)

    return df