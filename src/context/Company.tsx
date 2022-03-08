import { createContext, useContext, useState } from 'react';

export const ComapnyContext = createContext<any>(
  {} as any
);

export const ComapnyProvider = ({ children }) => {
  const [company, setCompany] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  
  return (
    <ComapnyContext.Provider
      value={{
        company,
        setCompany,
        contacts,
        setContacts,
      }}>
      {children}
    </ComapnyContext.Provider>
  );
};

export function useComapny(): any {
  return useContext(ComapnyContext);
}
