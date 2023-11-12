import { createContext, useContext } from 'react';

export function createContextAndHook<T>(defaultValues: T) {
  const context = createContext(defaultValues);

  function useMyContext() {
    const useContextReturn = useContext(context);
    if (!context) {
      throw new Error('useMyContext must be used within a ContextProvider');
    }
    return useContextReturn;
  }

  return [context.Provider, useMyContext, context] as const;
}
