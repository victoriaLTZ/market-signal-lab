"use client";

import { MarketDataRow } from "../types/market";

type DataTableProps = {
  data: MarketDataRow[];
};

export default function DataTable({ data }: DataTableProps) {
  function formatNumber(value: number | null | undefined) {
    if (value === null || value === undefined) return "-";
    return value.toFixed(2);
  }

  return (
    <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950 p-4">
      <h3 className="mb-4 text-lg font-semibold text-white">
        Full Dataset
      </h3>

      <div className="max-h-[500px] overflow-auto rounded-lg border border-slate-800">
        <table className="w-full min-w-[1000px] text-left text-sm text-slate-200">
          <thead className="sticky top-0 bg-slate-900 text-slate-300">
            <tr>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Open</th>
              <th className="px-3 py-2">High</th>
              <th className="px-3 py-2">Low</th>
              <th className="px-3 py-2">Close</th>
              <th className="px-3 py-2">Volume</th>
              <th className="px-3 py-2">Volume Ratio</th>
              <th className="px-3 py-2">RJ</th>
              <th className="px-3 py-2">RSI</th>
              <th className="px-3 py-2">MA20</th>
              <th className="px-3 py-2">MA50</th>
              <th className="px-3 py-2">Distance MA20</th>
              <th className="px-3 py-2">Distance MA50</th>
              <th className="px-3 py-2">Volatility 20D</th>
              <th className="px-3 py-2">Spread</th>
              <th className="px-3 py-2">Trend</th>
              <th className="px-3 py-2">Lookout Buy</th>
              <th className="px-3 py-2">Lookout Sell</th>
              <th className="px-3 py-2">Decision</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr key={row.date} className="border-t border-slate-800">
                <td className="px-3 py-2">{row.date}</td>
                <td className="px-3 py-2">{formatNumber(row.open)}</td>
                <td className="px-3 py-2">{formatNumber(row.high)}</td>
                <td className="px-3 py-2">{formatNumber(row.low)}</td>
                <td className="px-3 py-2">{formatNumber(row.close)}</td>
                <td className="px-3 py-2">{row.volume ?? "-"}</td>
                <td className="px-3 py-2">{formatNumber(row.volume_ratio)}</td>
                <td className="px-3 py-2">{formatNumber(row.RJ)}</td>
                <td className="px-3 py-2">{formatNumber(row.RSI)}</td>
                <td className="px-3 py-2">{formatNumber(row.MA20)}</td>
                <td className="px-3 py-2">{formatNumber(row.MA50)}</td>
                <td className="px-3 py-2">{formatNumber(row.distance_ma20)}</td>
                <td className="px-3 py-2">{formatNumber(row.distance_ma50)}</td>
                <td className="px-3 py-2">{formatNumber(row.volatility_20d)}</td>
                <td className="px-3 py-2">{formatNumber(row.spread)}</td>
                <td className="px-3 py-2">{row.trend ?? "-"}</td>
                <td className="px-3 py-2">{row.lookout_buy ? "True" : "-"}</td>
                <td className="px-3 py-2">{row.lookout_sell ? "True" : "-"}</td>
                <td className="px-3 py-2 font-semibold">{row.decision ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}