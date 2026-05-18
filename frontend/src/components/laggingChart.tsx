"use client";

// Import dynamique de Plotly pour éviter les erreurs de rendu côté serveur avec Next.js
import dynamic from "next/dynamic";
// Import du type partagé MarketDataRow
import { MarketDataRow } from "../types/market";

// Plotly est chargé uniquement côté navigateur, pas côté serveur
const Plot = dynamic(() => import("react-plotly.js").then((mod) => mod.default), 
{ ssr: false });

// Type des propriétés reçues par le composant LaggingChart
type LaggingChartProps = {
  // Données à afficher dans le graphique
  data: MarketDataRow[];

  // Fonction appelée quand l'utilisateur zoome sur le graphique
  onRangeChange?: (start: string, end: string) => void;
};

// Composant principal du graphique
export default function LaggingChart({
  data,
  onRangeChange,
}: LaggingChartProps) {
  // Sécurité : si aucune donnée n'est reçue, on n'affiche rien
  if (!data || data.length === 0) {
    return null;
  }

  // On garde seulement les lignes où il y a un Golden Cross
  const goldenCross = data.filter((row) => row.trend === "GC");

  // On garde seulement les lignes où il y a un Death Cross
  const deathCross = data.filter((row) => row.trend === "DC");

  // On garde seulement les lignes où la décision est BUY
  const buySignals = data.filter((row) => row.decision === "BUY");

  // On garde seulement les lignes où la décision est SELL
  const sellSignals = data.filter((row) => row.decision === "SELL");

  // On garde seulement les lignes où lookout_buy vaut true
  const lookoutBuy = data.filter((row) => row.lookout_buy === true);

  // On garde seulement les lignes où lookout_sell vaut true
  const lookoutSell = data.filter((row) => row.lookout_sell === true);

  return (
    <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-4">
      <h2 className="mb-4 text-xl font-semibold text-white">
        Lagging indicators chart
      </h2>

      <Plot
        data={[
          {
            x: data.map((row) => row.date),
            y: data.map((row) => row.close),
            type: "scatter",
            mode: "lines",
            name: "Price",
            line: { color: "white", width: 2 },
          },
          {
            x: data.map((row) => row.date),
            y: data.map((row) => row.MA20?? null),
            type: "scatter",
            mode: "lines",
            name: "MA20",
            line: { color: "blue", width: 2 },
          },
          {
            x: data.map((row) => row.date),
            y: data.map((row) => row.MA50 ?? null),
            type: "scatter",
            mode: "lines",
            name: "MA50",
            line: { color: "purple", width: 2 },
          },
          {
            x: goldenCross.map((row) => row.date),
            y: goldenCross.map((row) => row.close),
            type: "scatter",
            mode: "markers",
            name: "Golden Cross",
            marker: { symbol: "star", color: "gold", size: 16 },
          },
          {
            x: deathCross.map((row) => row.date),
            y: deathCross.map((row) => row.close),
            type: "scatter",
            mode: "markers",
            name: "Death Cross",
            marker: { symbol: "x", color: "red", size: 14 },
          },
          {
            x: lookoutBuy.map((row) => row.date),
            y: lookoutBuy.map((row) => row.close),
            type: "scatter",
            mode: "markers",
            name: "LOOK OUT BUY",
            marker: {
              symbol: "triangle-up-open",
              color: "lightgreen",
              size: 10,
            },
          },
          {
            x: lookoutSell.map((row) => row.date),
            y: lookoutSell.map((row) => row.close),
            type: "scatter",
            mode: "markers",
            name: "LOOK OUT SELL",
            marker: {
              symbol: "triangle-down-open",
              color: "orange",
              size: 10,
            },
          },
          {
            x: buySignals.map((row) => row.date),
            y: buySignals.map((row) => row.close),
            type: "scatter",
            mode: "markers",
            name: "BUY",
            marker: { symbol: "triangle-up", color: "green", size: 12 },
          },
          {
            x: sellSignals.map((row) => row.date),
            y: sellSignals.map((row) => row.close),
            type: "scatter",
            mode: "markers",
            name: "SELL",
            marker: { symbol: "triangle-down", color: "red", size: 12 },
          },
        ]}
        
        layout={{
          // Active le mode zoom par défaut quand tu glisses sur le graphique
          dragmode: "zoom",

          // Le graphique prend automatiquement la largeur disponible
          autosize: true,

          // Hauteur du graphique
          height: 600,

          // Couleur de fond autour du graphique
          paper_bgcolor: "#020617",

          // Couleur de fond de la zone de tracé
          plot_bgcolor: "#020617",

          // Couleur générale du texte
          font: { color: "white" },

          // Titre du graphique
          title: {
            text: "Price & Moving Averages",
            font: { color: "white" },
          },

          // Configuration de l'axe X
          xaxis: {
            title: { text: "Date" },
            gridcolor: "#1e293b",
          },

          // Configuration de l'axe Y
          yaxis: {
            title: { text: "Price" },
            gridcolor: "#1e293b",
          },

          // Position de la légende
          legend: {
            x: 1,
            y: 1,
          },
        }}
        style={{ width: "100%" }}
        config={{ 
          // rend le graphique responsive
          responsive: true,
          // affiche les outils plotly
          displayModeBar : true,
          // retirer le logo plotly
          displaylogo : false,
          scrollZoom: true }}

        // Événement déclenché quand l'utilisateur zoome ou déplace le graphique
        onRelayout={(event) => {
          // On affiche l'événement dans la console pour vérifier que le zoom est bien détecté
          console.log("Plotly relayout event:", event);
          // Récupère le début de la zone zoomée sur l'axe X
          const start = event["xaxis.range[0]"];

          // Récupère la fin de la zone zoomée sur l'axe X
          const end = event["xaxis.range[1]"];

        // Si plotly renvoie bien ne plage x
        if (start !== undefined && end !== undefined) {
          // On envoie la plage zoomée
          onRangeChange?.(String(start),String(end));
          // On arrête la fonction ici
          return;
        }

        // Cas ou plotly renvoie directement xaxis.range
        const range = event["xaxis.range"];

        // Si range existe et contient deux valeurs
        if (Array.isArray(range) && range.length === 2) {
        // On envoie la plage zoomée au parent
          onRangeChange?.(String(range[0]), String(range[1]));

          // On arrête la fonction ici
          return;
        }
      }}        
      />
    </div>
  );
}