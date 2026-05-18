def generate_signals(df):
    df = df.copy()

    df["trend"] = ""

    df.loc[
        (df["MA20"] > df["MA50"]) &
        (df["MA20"].shift(1) <= df["MA50"].shift(1)),
        "trend"
    ] = "GC"

    df.loc[
        (df["MA20"] < df["MA50"]) &
        (df["MA20"].shift(1) >= df["MA50"].shift(1)),
        "trend"
    ] = "DC"

    df["decision"] = "HOLD"
    df["spread"] = df["MA20"] - df["MA50"]

    df["lookout_buy"] = (
        (df["spread"] < 0) &
        (df["spread"].diff() > 0) &
        (df["RSI"] > 45) &
        (df["RSI"] < 60)
    )

    df["recent_lookout_buy"] = df["lookout_buy"].rolling(5).max().astype(bool)

    df["buy_signal"] = (
        df["recent_lookout_buy"] &
        (df["RSI"] > 50) &
        (df["RSI"] < 65) &
        (df["MA20"].diff() > 0) &
        (df["close"] > df["MA20"]) &
        (df["close"].diff(3) > 0)
    )

    df["near_top"] = df["close"] >= df["close"].rolling(10).max() * 0.98

    df["lookout_sell"] = (
        (df["spread"] > 0) &
        (df["spread"].diff() < 0) &
        (df["RSI"] < df["RSI"].shift(1)) &
        (df["near_top"])
    )

    df["recent_lookout_sell"] = df["lookout_sell"].rolling(5).max().astype(bool)

    df["negative_RJ_3d"] = (
        (df["RJ"] < 0) &
        (df["RJ"].shift(1) < 0) &
        (df["RJ"].shift(2) < 0)
    )

    df["sell_signal"] = (
        df["recent_lookout_sell"] &
        df["negative_RJ_3d"] &
        (df["close"] < df["MA20"])
    )

    df.loc[df["buy_signal"], "decision"] = "BUY"
    df.loc[df["sell_signal"], "decision"] = "SELL"

    return df