"use client";

// Permet d'utiliser les hooks React côté navigateur
import { useState } from "react";

// Type décrivant une ligne du dataset marché
import { MarketDataRow } from "../types/market";


// Type des propriétés reçues par le composant
type Props = {

  // Le tableau complet venant du backend
  data: MarketDataRow[];

};


// Liste des indicateurs observables
const indicatorOptions = [

  // Décisions finales du modèle
  "BUY",
  "SELL",

  // Golden Cross / Death Cross
  "GC",
  "DC",

  // Pré-signaux
  "LOOKOUT_BUY",
  "LOOKOUT_SELL",

];


// Composant principal
export default function IndicatorObservation({ data }: Props) {

  // Stocke l'indicateur sélectionné
  const [selectedIndicator, setSelectedIndicator] = useState("");



  // Formate les nombres pour éviter
  // les null / undefined
  function formatNumber(
    value: number | null | undefined
  ) {

    if (
      value === null ||
      value === undefined
    ) {

      return "-";

    }

    return value.toFixed(2);

  }



  // Vérifie si une ligne correspond
  // à l'indicateur sélectionné
  function matchIndicator(
    row: MarketDataRow
  ) {

    // Achat détecté
    if (
      selectedIndicator === "BUY"
    ) {

      return (
        row.decision === "BUY"
      );

    }


    // Vente détectée
    if (
      selectedIndicator === "SELL"
    ) {

      return (
        row.decision === "SELL"
      );

    }


    // Golden Cross
    if (
      selectedIndicator === "GC"
    ) {

      return (
        row.trend === "GC"
      );

    }


    // Death Cross
    if (
      selectedIndicator === "DC"
    ) {

      return (
        row.trend === "DC"
      );

    }


    // Pré-signal achat
    if (
      selectedIndicator ===
      "LOOKOUT_BUY"
    ) {

      return (
        row.lookout_buy === true
      );

    }


    // Pré-signal vente
    if (
      selectedIndicator ===
      "LOOKOUT_SELL"
    ) {

      return (
        row.lookout_sell === true
      );

    }


    return false;

  }



  // Récupère toutes les dates
  // où l'indicateur apparaît
  const indicatorDates = data

    .filter(

      (row) =>

        selectedIndicator &&

        matchIndicator(row)

    )

    .map(

      (row) => row.date

    );




  // Construit le tableau
  // ±10 jours autour du signal
  const observationData =

    selectedIndicator

      ? data.filter((row) => {

          // Date ligne actuelle
          const rowTime =

            new Date(
              row.date
            ).getTime();


          // Fenêtre de 10 jours
          const tenDays =

            10 *

            24 *

            60 *

            60 *

            1000;


          // Vérifie si la ligne
          // est proche d'un signal
          return indicatorDates.some(

            (
              indicatorDate
            ) => {

              const indicatorTime =

                new Date(
                  indicatorDate
                ).getTime();


              return (

                rowTime >=

                  indicatorTime -

                  tenDays &&

                rowTime <=

                  indicatorTime +

                  tenDays

              );

            }

          );

        })

      : [];



  return (

    <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950 p-4">

      <h3 className="mb-3 text-lg font-semibold text-white">

        Explore Market Data Around Signals

      </h3>


      <p className="mb-4 text-sm text-slate-400">

        Select an indicator to inspect market data approximately 10 days before and after each detected signal.
      </p>



      {/* Sélecteur indicateur */}

      <select

        value={selectedIndicator}

        onChange={(event) =>

          setSelectedIndicator(

            event.target.value

          )

        }

        className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white"

      >

        <option value="">

          Select Indicator

        </option>


        {indicatorOptions.map(

          (indicator) => (

            <option

              key={indicator}

              value={indicator}

            >

              {indicator}

            </option>

          )

        )}

      </select>



      {/* Nombre de signaux trouvés */}

      {selectedIndicator && (

        <p className="mt-4 text-sm text-slate-300">

          number of detected Signals :

          <span className="ml-2 font-semibold text-white">

            {indicatorDates.length}

          </span>

        </p>

      )}



      {/* Tableau résultat */}

      {selectedIndicator &&

        observationData.length > 0 && (

          <div className="mt-4 max-h-[500px] overflow-auto rounded-lg border border-slate-800">

            <table className="w-full min-w-[800px] text-left text-sm text-slate-200">
            <thead className="sticky top-0 bg-slate-900 text-slate-300">
              <tr>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Close</th>
                <th className="px-3 py-2">RSI</th>
                <th className="px-3 py-2">Volume Ratio</th>
                <th className="px-3 py-2">Distance MA20</th>
                <th className="px-3 py-2">Volatility 20D</th>
                <th className="px-3 py-2">Decision</th>
              </tr>
            </thead>

            <tbody>
              {observationData.map((row) => (
                <tr
                  key={`${selectedIndicator}-${row.date}`}
                  className="border-t border-slate-800"
                >
                  <td className="px-3 py-2">{row.date}</td>

                  <td className="px-3 py-2">
                    {formatNumber(row.close)}
                  </td>

                  <td className="px-3 py-2">
                    {formatNumber(row.RSI)}
                  </td>

                  <td className="px-3 py-2">
                    {formatNumber(row.volume_ratio)}
                  </td>

                  <td className="px-3 py-2">
                    {formatNumber(row.distance_ma20)}
                  </td>

                  <td className="px-3 py-2">
                    {formatNumber(row.volatility_20d)}
                  </td>

                  <td className="px-3 py-2 font-semibold">
                    {row.decision ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

      )}



      {/* Aucun signal */}

      {selectedIndicator &&

        observationData.length === 0 && (

          <p className="mt-4 text-sm text-slate-400">

            No signals found for this indicator.

          </p>

      )}

    </div>

  );

}