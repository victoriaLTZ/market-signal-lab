"use client";

// List of indicator definitions
const indicators = [
  {
    name: "MA20",
    definition:
      "20-day moving average. It smooths price movements to highlight short- to medium-term market trends.",
  },

  {
    name: "MA50",
    definition:
      "50-day moving average. It provides a longer-term view of the underlying market trend.",
  },

  {
    name: "Golden Cross",
    definition:
      "Bullish signal: the MA20 crosses above the MA50. This may indicate the beginning of an upward trend shift.",
  },

  {
    name: "Death Cross",
    definition:
      "Bearish signal: the MA20 crosses below the MA50. This may indicate weakening momentum or a downward trend shift.",
  },

  {
    name: "LOOK OUT BUY",
    definition:
      "Early buy signal: the rule-based model detects conditions that may precede a future BUY signal.",
  },

  {
    name: "LOOK OUT SELL",
    definition:
      "Early sell signal: the rule-based model detects conditions that may precede a future SELL signal.",
  },

  {
    name: "BUY",
    definition:
      "Buy signal generated when the strategy's technical conditions are satisfied.",
  },

  {
    name: "SELL",
    definition:
      "Sell signal generated when the strategy's technical conditions are satisfied.",
  },
];

export default function IndicatorHelp() {
  return (
    <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-4">

      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">
        Indicator Guide
      </h3>

      <div className="flex flex-wrap gap-3">

        {indicators.map((indicator) => (

          <div key={indicator.name} className="group relative">

            <button className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-sm text-slate-200 hover:border-blue-500 hover:text-white">

              ⓘ {indicator.name}

            </button>

            <div className="pointer-events-none absolute left-0 top-9 z-50 hidden w-72 rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-slate-300 shadow-xl group-hover:block">

              {indicator.definition}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}