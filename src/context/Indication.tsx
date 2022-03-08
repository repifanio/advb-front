import { createContext, useContext, useState } from 'react';

export const IndicationContext = createContext<any>(
  {} as any
);

export const IndicationProvider = ({ children }) => {
  const [indication, setIndication] = useState<any[]>([]);
  
  return (
    <IndicationContext.Provider
      value={{
        indication,
        setIndication,
      }}>
      {children}
    </IndicationContext.Provider>
  );
};

export function useIndication(): any {
  return useContext(IndicationContext);
}
