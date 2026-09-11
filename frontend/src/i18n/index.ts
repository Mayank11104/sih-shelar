import en from './en';
import hi from './hi';
import mr from './mr';
import type { Language } from '../types';

// ─── Translation Key Type (derived from English as source of truth) ───────────
export type TranslationKey = keyof typeof en;

// ─── Translation Map ──────────────────────────────────────────────────────────
const translations: Record<Language, Record<TranslationKey, string>> = { en, hi, mr };

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function getTranslator(language: Language) {
  const dict = translations[language] ?? translations.en;
  return (key: TranslationKey): string => dict[key] ?? en[key] ?? key;
}

export { translations };
