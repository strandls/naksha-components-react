import React, { createContext, useContext } from "react";

import { getByPath } from "../utils/getByPath";

interface TranslationContextProps {
  t;
}

interface TranslationProviderProps {
  localeStrings;
  lang;
  children;
}

const CounterContext = createContext<TranslationContextProps>(
  {} as TranslationContextProps
);

export const TranslationProvider = ({
  localeStrings,
  lang = "en",
  children,
}: TranslationProviderProps) => {
  const t = (key: string) => {
    const translatedString = getByPath(localeStrings[lang], key);

    if (!translatedString) {
      console.warn(`Translation '${key}' for locale '${lang}' not found.`);
    }

    return translatedString;
  };

  return (
    <CounterContext.Provider value={{ t }}>{children}</CounterContext.Provider>
  );
};

export function useTranslation() {
  return useContext(CounterContext);
}
