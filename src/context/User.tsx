import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '~/utils';

export const UserContext = createContext<any>(
  {} as any
);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<any[]>([]);

  useEffect(()=> {
    const newUser = JSON.parse(localStorage.getItem("userInfo"))

    if (!newUser) {
      return
    }

    setUser(newUser)
  }, [])

  const defineUser = (newUser) => {
    localStorage.setItem("userInfo", `${JSON.stringify(newUser)}`)
    setUser(newUser)
  }
  return (
    <UserContext.Provider
      value={{
        user,
        defineUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): any {
  return useContext(UserContext);
}
