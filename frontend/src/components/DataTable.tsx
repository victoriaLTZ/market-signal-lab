"use client";

// On importe useState pour gérer l'indicateur sélectionné
import { useState } from "react";

// On importe le type partagé des données
import { MarketDataRow } from "../types/market";

// Type des props reçues par la table
type DataTableProps = {
  // Données complètes reçues depuis le backend
  data: MarketDataRow[];
};

// Liste des indicateurs que l'utilisateur pourra observer
const indicatorOptions = [
  "BUY",
  "SELL",
  "GC",
  "DC",
  "LOOKOUT_BUY",
  "LOOKOUT_SELL",
];

export default function DataTable({ data }: DataTableProps) {
  // Indicateur sélectionné dans la liste déroulante
  const [selectedIndicator, setSelectedIndicator] = useState("");

  // Fonction utilitaire pour afficher proprement les nombres
  function formatNumber(value: number | null | undefined) {
    // Si la valeur est absente, on affiche un tiret
    if (value === null || value === undefined) return "-";

    // Sinon, on arrondit à 2 décimales
    return value.toFixed(2);
  }

  // Fonction qui détecte si une ligne correspond à l'indicateur choisi
  function matchIndicator(row: MarketDataRow) {
    if (selectedIndicator === "BUY") return row.decision === "BUY";

    if (selectedIndicator === "SELL") return row.decision === "SELL";

    if (selectedIndicator === "GC") return row.trend === "GC";

    if (selectedIndicator === "DC") return row.trend === "DC";

    if (selectedIndicator === "LOOKOUT_BUY") return row.lookout_buy === true;

    if (selectedIndicator === "LOOKOUT_SELL") return row.lookout_sell === true;

    return false;
  }

  // Dates correspondant à l'indicateur sélectionné
  const indicatorDates = data
    .filter((row) => selectedIndicator && matchIndicator(row))
    .map((row) => row.date);

  // Données observées autour des indicateurs sélectionnés
  const observationData = selectedIndicator
    ? data.filter((row) => {
        // Date de la ligne actuelle
        const rowTime = new Date(row.date).getTime();

        // On regarde si la ligne est autour d'une date d'indicateur
        return indicatorDates.some((indicatorDate) => {
          // Date de l'indicateur
          const indicatorTime = new Date(indicatorDate).getTime();

          // 10 jours en millisecondes
          const tenDays = 10 * 24 * 60 * 60 * 1000;

          // On garde les lignes entre J-10 et J+10
          return rowTime >= indicatorTime - tenDays && rowTime <= indicatorTime + tenDays;
        });
      })
    : [];

  return (
    <div className="mt-6 space-y-8">
      {/* Table principale */}
      <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Données complètes
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
                <th className="px-3 py-2">RJ</th>
                <th className="px-3 py-2">RSI</th>
                <th className="px-3 py-2">MA20</th>
                <th className="px-3 py-2">MA50</th>
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
                  <td className="px-3 py-2">{formatNumber(row.RJ)}</td>
                  <td className="px-3 py-2">{formatNumber(row.RSI)}</td>
                  <td className="px-3 py-2">{formatNumber(row.MA20)}</td>
                  <td className="px-3 py-2">{formatNumber(row.MA50)}</td>
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

      {/* Bloc observation autour des indicateurs */}
      <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
        <h3 className="mb-3 text-lg font-semibold text-white">
          Observer les données autour d’un indicateur
        </h3>

        <p className="mb-4 text-sm text-slate-400">
          Sélectionne un indicateur pour afficher les lignes situées environ 10 jours avant et 10 jours après chaque signal.
        </p>

        <select
          value={selectedIndicator}
          onChange={(event) => setSelectedIndicator(event.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white"
        >
          <option value="">Choisir un indicateur</option>
          {indicatorOptions.map((indicator) => (
            <option key={indicator} value={indicator}>
              {indicator}
            </option>
          ))}
        </select>

        {selectedIndicator && (
          <p className="mt-4 text-sm text-slate-300">
            Nombre de dates détectées :{" "}
            <span className="font-semibold text-white">
              {indicatorDates.length}
            </span>
          </p>
        )}

        {selectedIndicator && observationData.length > 0 && (
          <div className="mt-4 max-h-[500px] overflow-auto rounded-lg border border-slate-800">
            <table className="w-full min-w-[900px] text-left text-sm text-slate-200">
              <thead className="sticky top-0 bg-slate-900 text-slate-300">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Close</th>
                  <th className="px-3 py-2">RJ</th>
                  <th className="px-3 py-2">RSI</th>
                  <th className="px-3 py-2">MA20</th>
                  <th className="px-3 py-2">MA50</th>
                  <th className="px-3 py-2">Spread</th>
                  <th className="px-3 py-2">Trend</th>
                  <th className="px-3 py-2">Lookout Buy</th>
                  <th className="px-3 py-2">Lookout Sell</th>
                  <th className="px-3 py-2">Decision</th>
                </tr>
              </thead>

              <tbody>
                {observationData.map((row) => (
                  <tr key={`${selectedIndicator}-${row.date}`} className="border-t border-slate-800">
                    <td className="px-3 py-2">{row.date}</td>
                    <td className="px-3 py-2">{formatNumber(row.close)}</td>
                    <td className="px-3 py-2">{formatNumber(row.RJ)}</td>
                    <td className="px-3 py-2">{formatNumber(row.RSI)}</td>
                    <td className="px-3 py-2">{formatNumber(row.MA20)}</td>
                    <td className="px-3 py-2">{formatNumber(row.MA50)}</td>
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
        )}

        {selectedIndicator && observationData.length === 0 && (
          <p className="mt-4 text-sm text-slate-400">
            Aucun signal trouvé pour cet indicateur.
          </p>
        )}
      </div>
    </div>
  );
}