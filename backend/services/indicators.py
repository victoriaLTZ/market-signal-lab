def compute_indicators(df):
    df = df.copy()

    df["RJ"] = df["close"].pct_change() * 100

    df["MA20"] = df["close"].rolling(window=20).mean()
    df["MA50"] = df["close"].rolling(window=50).mean()

    # Volatility over 20 days
    # Measures how unstable daily returns are over the last 20 trading days
    df["volatility_20d"] = df["RJ"].rolling(20).std()


    # Volume ratio
    # Compares today's volume to the average volume over the last 20 trading days
    df["volume_ratio"] = df["volume"] / df["volume"].rolling(20).mean()


    # Distance from MA20
    # Measures how far the current price is from the 20-day moving average, in %
    df["distance_ma20"] = ((df["close"] - df["MA20"]) / df["MA20"]) * 100


    # Distance from MA50
    # Measures how far the current price is from the 50-day moving average, in %
    df["distance_ma50"] = ((df["close"] - df["MA50"]) / df["MA50"]) * 100

    delta = df["close"].diff()
    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)

    avg_gain = gain.rolling(14).mean()
    avg_loss = loss.rolling(14).mean()

    rs = avg_gain / avg_loss
    df["RSI"] = 100 - (100 / (1 + rs))

    return df