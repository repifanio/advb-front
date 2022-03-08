import { createContext, useContext, useState } from 'react';

export const SectorContext = createContext<any>(
  {} as any
);

export const SectorProvider = ({ children }) => {
  const [sector, setSector] = useState<any[]>([]);
  
  return (
    <SectorContext.Provider
      value={{
        sector,
        setSector,
      }}>
      {children}
    </SectorContext.Provider>
  );
};

export function useSector(): any {
  return useContext(SectorContext);
}
