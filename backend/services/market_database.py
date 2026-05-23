from services.alpha_vantage import (
    search_symbol,
    get_daily_prices
)

from services.finnhub import (
    search_symbol_finnhub,
    get_daily_prices_finnhub
)

def search_symbol_with_fallback(query: str):

    try:

        print("Trying Finnhub search...", flush=True)

        results = search_symbol_finnhub(query)

        if len(results) > 0:
            return results

        raise ValueError("No result from Finnhub")

    except Exception as finnhub_error:

        print(
            "Finnhub search failed:",
            finnhub_error,
            flush=True
        )

        return search_symbol(query)
    
def get_daily_prices_with_fallback(symbol: str):
    try:
        print("Trying Finnhub first...", flush=True)

        return get_daily_prices_finnhub(symbol)

    except Exception as finnhub_error:
        print("Finnhub failed:", finnhub_error, flush=True)

        try:
            print("Trying Alpha Vantage fallback...", flush=True)

            return get_daily_prices(symbol)

        except Exception as alpha_error:
            print("Alpha Vantage failed:", alpha_error, flush=True)

            raise ValueError(
                f"No data available for {symbol}. "
                f"Finnhub error: {finnhub_error}. "
                f"Alpha Vantage error: {alpha_error}."
            )