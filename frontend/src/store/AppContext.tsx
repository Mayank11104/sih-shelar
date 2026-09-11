import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Language, Trader, ProduceInput, AppState } from '../types';
import { getTranslator } from '../i18n';
import type { TranslationKey } from '../i18n';
import { DEMO_FARMER, DEMO_TRADER, CROPS } from '../mockData/data';

// ─── Context Types ────────────────────────────────────────────────────────────
interface AppContextValue {
  state: AppState;
  t: (key: TranslationKey) => string;
  setLanguage: (lang: Language) => void;
  setTrader: (trader: Trader) => void;
  setProduce: (produce: ProduceInput) => void;
  confirmDecision: (timing: AppState['decision']['timing'], option: AppState['decision']['option'], earnings: number) => void;
  resetDecision: () => void;
  loadDemoData: () => void;
}

// ─── Default State ────────────────────────────────────────────────────────────
const defaultState: AppState = {
  farmer: DEMO_FARMER,
  language: 'en',
  trader: null,
  produce: null,
  decision: {
    confirmed: false,
    timing: null,
    option: null,
    expectedEarnings: null,
  },
};

const LS_LANG_KEY = 'agriverse_language';
const LS_TRADER_KEY = 'agriverse_trader';
const LS_DECISION_KEY = 'agriverse_decision';

// ─── Context ──────────────────────────────────────────────────────────────────
const AppContext = createContext<AppContextValue | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    // Rehydrate from localStorage
    const savedLang = localStorage.getItem(LS_LANG_KEY) as Language | null;
    const savedTrader = localStorage.getItem(LS_TRADER_KEY);
    const savedDecision = localStorage.getItem(LS_DECISION_KEY);

    return {
      ...defaultState,
      language: savedLang ?? 'en',
      trader: savedTrader ? (JSON.parse(savedTrader) as Trader) : null,
      decision: savedDecision ? JSON.parse(savedDecision) : defaultState.decision,
    };
  });

  const t = getTranslator(state.language);

  // Persist language on change
  useEffect(() => {
    localStorage.setItem(LS_LANG_KEY, state.language);
  }, [state.language]);

  // Persist trader on change
  useEffect(() => {
    if (state.trader) {
      localStorage.setItem(LS_TRADER_KEY, JSON.stringify(state.trader));
    } else {
      localStorage.removeItem(LS_TRADER_KEY);
    }
  }, [state.trader]);

  // Persist decision on change
  useEffect(() => {
    localStorage.setItem(LS_DECISION_KEY, JSON.stringify(state.decision));
  }, [state.decision]);

  const setLanguage = (lang: Language) => setState((s) => ({ ...s, language: lang }));

  const setTrader = (trader: Trader) => setState((s) => ({ ...s, trader }));

  const setProduce = (produce: ProduceInput) => setState((s) => ({ ...s, produce }));

  const confirmDecision = (
    timing: AppState['decision']['timing'],
    option: AppState['decision']['option'],
    earnings: number,
  ) => setState((s) => ({ ...s, decision: { confirmed: true, timing, option, expectedEarnings: earnings } }));

  const resetDecision = () => setState((s) => ({ ...s, decision: defaultState.decision }));

  const loadDemoData = () => {
    setState((s) => ({
      ...s,
      trader: DEMO_TRADER,
      produce: {
        crop: CROPS[0], // Tomato
        quantity: 500,
        unit: 'kg',
        quality: 'A',
      },
    }));
  };

  return (
    <AppContext.Provider value={{ state, t, setLanguage, setTrader, setProduce, confirmDecision, resetDecision, loadDemoData }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
