def compute_indicators(df):
    df = df.copy()

    df["RJ"] = df["close"].pct_change() * 100

    df["MA20"] = df["close"].rolling(window=10).mean()
    df["MA50"] = df["close"].rolling(window=30).mean()

    delta = df["close"].diff()
    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)

    avg_gain = gain.rolling(14).mean()
    avg_loss = loss.rolling(14).mean()

    rs = avg_gain / avg_loss
    df["RSI"] = 100 - (100 / (1 + rs))

    return df