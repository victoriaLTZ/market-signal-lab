"use client";

// Liste des définitions des indicateurs
const indicators = [
  {
    name: "MA20",
    definition:
      "Moyenne mobile sur 20 jours. Elle lisse le prix pour montrer la tendance courte/moyenne période.",
  },
  {
    name: "MA50",
    definition:
      "Moyenne mobile sur 50 jours. Elle donne une vision plus longue de la tendance du prix.",
  },
  {
    name: "Golden Cross",
    definition:
      "Signal haussier : la MA20 passe au-dessus de la MA50. Cela peut indiquer un changement positif de tendance.",
  },
  {
    name: "Death Cross",
    definition:
      "Signal baissier : la MA20 passe sous la MA50. Cela peut indiquer un affaiblissement de la tendance.",
  },
  {
    name: "LOOK OUT BUY",
    definition:
      "Pré-signal d'achat : le modèle de règles détecte une situation qui pourrait précéder un signal BUY.",
  },
  {
    name: "LOOK OUT SELL",
    definition:
      "Pré-signal de vente : le modèle de règles détecte une situation qui pourrait précéder un signal SELL.",
  },
  {
    name: "BUY",
    definition:
      "Signal d'achat généré lorsque les conditions techniques définies par la stratégie sont réunies.",
  },
  {
    name: "SELL",
    definition:
      "Signal de vente généré lorsque les conditions techniques définies par la stratégie sont réunies.",
  },
];

export default function IndicatorHelp() {
  return (
    <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">
        Indicator guide
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