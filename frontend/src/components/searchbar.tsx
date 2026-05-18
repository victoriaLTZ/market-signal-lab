"use client";

import { useState } from "react";
import ChartWithLinkedTable from "./ChartWithLinkedTable";

type SearchResult = {
  symbol: string;
  name: string;
  type: string;
  region: string;
  currency: string;
  matchScore: string;
};

export default function SearchBar() {
  // texte tapé dans la barre de recherche
  const [query, setQuery] = useState("");
  // résultats retournés par search
  const [results, setResults] = useState<SearchResult[]>([]);
  // symbole séléctionné dans la liste déroulante
  const [selectedSymbol, setSelectedSymbol] = useState("");
  // Stocke toutes les données reçues du backend pour le graphique lagging
  const [laggingData, setLaggingData] = useState<any>(null);

  async function handleSearch() {
    if (!query.trim()) return;
    // réinitialise le symbole sélectionné
    setSelectedSymbol("");
    // réinitialise les données du graphique
    setLaggingData(null);

    const response = await fetch(
      `http://127.0.0.1:8000/search?query=${encodeURIComponent(query)}`
    );

    const data = await response.json();
    console.log("Full raw response:", JSON.stringify(data, null, 2));
    // Vérifie la forme exacte de la réponse reçue depuis FastAPI
    console.log("Search response:", data);

    const cleanResults =
    data.results?.bestMatches ??
    data.bestMatches ??
    data.results ??
    data ??
    [];

    console.log("Clean results:", cleanResults);
    console.log("Is array:", Array.isArray(cleanResults));
    console.log("Length:", cleanResults.length);

  setResults(Array.isArray(cleanResults) ? cleanResults : []);
  }

  async function handleSelectSymbol(symbol: string) {
  setSelectedSymbol(symbol);

  const response = await fetch(
    `http://127.0.0.1:8000/lagging?symbol=${encodeURIComponent(symbol)}`
  );
  // transfo de la réponse JSON en object javaScript
  const data = await response.json();
  // sauvegarder les données lagging dans react > pour le graph ap
  setLaggingData(data);
  // Verification dans la console navigateur
  console.log("Lagging data:", data);
}

return (
  <div className="mt-6 w-full">

    {/* Bloc recherche */}
    <div className="max-w-2xl">

      <div className="flex gap-2">

        <input
          className="w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-2 text-white"
          placeholder="Search stock symbol, e.g. BNP, Hermès, AAPL..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium"
        >
          Search
        </button>

      </div>

      <p className="mt-3 text-sm text-yellow-300">
        Results count: {results.length}
      </p>

      {results.length > 0 && (

        <select
          className="mt-4 w-full rounded-lg bg-slate-900 border border-slate-700 px-4 py-2 text-white"
          value={selectedSymbol}
          onChange={(e) => handleSelectSymbol(e.target.value)}
        >

          <option value="">
            Select a symbol
          </option>

          {results.map((item) => (

            <option
              key={item.symbol}
              value={item.symbol}
            >
              {item.symbol}
              {" — "}
              {item.name}
              {" — "}
              {item.region}
              {" — "}
              {item.currency}
            </option>

          ))}

        </select>

      )}

      {selectedSymbol && (

        <p className="mt-3 text-sm text-slate-300">

          Selected symbol:

          <span className="font-semibold">
            {" "}
            {selectedSymbol}
          </span>

        </p>

      )}

    </div>

    {/* Bloc graphique séparé */}
    {laggingData?.data && (

      <div className="mt-8 w-full">

        <ChartWithLinkedTable
          data={laggingData.data}
        />

      </div>

    )}

  </div>
);
}