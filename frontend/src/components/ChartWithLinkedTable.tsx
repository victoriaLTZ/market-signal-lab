"use client";

// On importe useState pour gérer les états React
import { useState } from "react";

// On importe le graphique
import LaggingChart from "./laggingChart";

// On importe le tableau
import DataTable from "./DataTable";

// On importe le type partagé des données de marché
import { MarketDataRow } from "../types/market";

// Type des propriétés reçues par ce composant
type ChartWithLinkedTableProps = {
  // Données complètes reçues depuis SearchBar
  data: MarketDataRow[];
};

// Composant qui relie le graphique Plotly et le tableau
export default function ChartWithLinkedTable({
  data,
}: ChartWithLinkedTableProps) {
  // État qui décide si le tableau est affiché ou caché
  const [showTable, setShowTable] = useState(false);

  return (
    <section className="mt-8">
      {/* Graphique principal */}
      <LaggingChart
        // On donne toutes les données au graphique
        data={data}
        // Cette fonction est appelée quand l'utilisateur zoome
        onRangeChange={() => {}}
      />
          {/* Bouton pour afficher ou cacher les données */}
          <button
            // Au clic, on inverse l'état actuel
            onClick={() => setShowTable(!showTable)}
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            {/* Texte du bouton selon l'état actuel */}
            {showTable ? "Masquer les données" : "Afficher les données"}
          </button>

          {/* Le tableau s'affiche seulement si showTable vaut true */}
          {showTable && (
            <div className="mt-4">
              <DataTable data={data} />
            </div>
          )}
    </section>
  );
}