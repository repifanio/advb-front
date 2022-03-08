import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue || true;
      }
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      if (typeof window !== 'undefined') {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

export default useLocalStorage;
