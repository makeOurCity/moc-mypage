/* eslint-disable react-hooks/exhaustive-deps */
import { logger } from "@/logger";
import { useState, useEffect } from "react";

interface UseLocalStorageOptions {}

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const setValue = (value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    const value = window.localStorage.getItem(key);

    if (value) {
      try {
        const parsed = JSON.parse(value) as T;
        logger.info("Set stored value from localStorage");
        setStoredValue(parsed);
      } catch (error) {
        logger.error(error);
        setStoredValue(initialValue);
      }
    } else {
      logger.info("Set stored value using initialValue", initialValue);
      setStoredValue(initialValue);
    }
  }, []);

  useEffect(() => {
    if (storedValue !== initialValue) {
      setLoading(false);
      logger.info("Set stored value useEffect[storedValue]", initialValue);
      setValue(storedValue as T);
    }
  }, [storedValue]);

  return [storedValue as T, setStoredValue, loading] as const;
};
