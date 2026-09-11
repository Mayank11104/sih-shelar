import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/80 border border-slate-800 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-slate-700">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Tailwind CSS v4 Connected</span>
        </div>

        {/* Title */}
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
          React + Vite
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          All starter assets were cleaned up. Tailwind v4 styling and reactive state are functioning properly.
        </p>

        {/* Interactive Button */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setCount((prev) => prev + 1)}
            className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-indigo-500/40 active:scale-[0.98] cursor-pointer"
          >
            <span>Interactive Counter:</span>
            <span className="rounded-lg bg-white/20 px-2 py-0.5 text-sm font-mono font-bold">
              {count}
            </span>
          </button>

          <p className="text-center text-xs text-slate-500">
            Click to test React state updates & Tailwind transitions
          </p>
        </div>

        {/* Tailwind v4 Feature Badges */}
        <div className="mt-8 border-t border-slate-800/80 pt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Active Stack
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-cyan-300">
              React 19
            </span>
            <span className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-indigo-300">
              TypeScript
            </span>
            <span className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-purple-300">
              Vite 8
            </span>
            <span className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-emerald-300">
              Tailwind CSS v4
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
