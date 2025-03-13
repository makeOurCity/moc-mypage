/* eslint-disable react-hooks/exhaustive-deps */
import { logger } from "@/logger";
import { useState, useEffect, SetStateAction, Dispatch } from "react";

interface UseLocalStorageOptions {}

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>, boolean] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState<boolean>(true);

  // LocalStorageとstateを同時に更新する関数
  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      // valueが関数の場合は実行して値を取得
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // LocalStorageを更新
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      // Stateも更新
      setStoredValue(valueToStore);
    } catch (error) {
      logger.error("Error saving to localStorage", error);
    }
  };

  /**
   * 初回のlocalStorageの読み込み
   */
  useEffect(() => {
    try {
      const value = window.localStorage.getItem(key);
      if (value) {
        const parsed = JSON.parse(value) as T;
        logger.info("Set stored value from localStorage");
        setStoredValue(parsed);
      } else {
        logger.info("Set stored value using initialValue", initialValue);
        setStoredValue(initialValue);
      }
    } catch (error) {
      logger.error("Error reading from localStorage", error);
      setStoredValue(initialValue);
    } finally {
      setLoading(false);
    }
  }, [key]); // keyが変更された場合にも再読み込み

  /**
   * localStorageの値が外部で変更された場合に同期を取る
   */
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = JSON.parse(e.newValue) as T;
          setStoredValue(newValue);
        } catch (error) {
          logger.error("Error parsing storage change", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue, loading];
};
