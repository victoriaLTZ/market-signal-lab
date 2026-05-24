import pandas as pd
import yfinance as yf


def convert_symbol_to_yahoo(symbol: str) -> str:

    symbol_map = {

        # Compatibilité anciens symboles Alpha Vantage
        "BNP.PAR": "BNP.PA",
        "RMS.PAR": "RMS.PA",
        "MC.PAR": "MC.PA",
        "AI.PAR": "AI.PA",

    }

    return symbol_map.get(symbol, symbol)


def get_daily_prices_yahoo(symbol: str):

    yahoo_symbol = convert_symbol_to_yahoo(symbol)

    print(
        "Yahoo symbol used:",
        yahoo_symbol,
        flush=True
    )

    df = yf.download(
        yahoo_symbol,

        # Historique 1 an
        period="1y",

        # Données journalières
        interval="1d",

        progress=False
    )

    if df.empty:

        raise ValueError(
            f"No Yahoo data for {symbol}"
        )

    df = df[
        [
            "Open",
            "High",
            "Low",
            "Close",
            "Volume"
        ]
    ]

    df.columns = [
        "open",
        "high",
        "low",
        "close",
        "volume"
    ]

    df.index = pd.to_datetime(df.index)

    return df