import SearchBar from "@/src/components/searchbar"; 


export default function laggingpage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen bg-slate-950 text-white p-8">
        < h1 className="text-3xl font-bold mb-4">Lagging Signals</h1>
        <p className="text-slate-300">
          Search a stock, analyze lagging indicators, and compare srategy performance.
        </p>

        <SearchBar />

      </main>
    </div>
  );
}
