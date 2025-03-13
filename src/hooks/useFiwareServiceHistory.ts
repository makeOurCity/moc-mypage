import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { logger } from "@/logger";

const MAX_HISTORY_COUNT = 20; // 履歴の最大保持数

interface FiwareServiceHistoryItem {
  service: string;
  lastUsed: number; // タイムスタンプ
}

export const useFiwareServiceHistory = () => {
  const [history, setHistory] = useLocalStorage<FiwareServiceHistoryItem[]>(
    "fiware-service-history",
    []
  );
  const [isOpen, setIsOpen] = useState(false); // サイドメニューの開閉状態

  // 新しい履歴を追加
  const addHistory = useCallback(
    (service: string) => {
      if (!service) return; // 空文字列は保存しない

      setHistory((prev) => {
        const currentHistory = prev || [];
        const now = Date.now();
        const newHistory = currentHistory.filter(
          (item) => item.service !== service
        ); // 重複を除去

        // 新しい項目を先頭に追加
        const updatedHistory = [{ service, lastUsed: now }, ...newHistory];

        // 最大件数を超えた場合、古い履歴を削除
        if (updatedHistory.length > MAX_HISTORY_COUNT) {
          return updatedHistory.slice(0, MAX_HISTORY_COUNT);
        }

        return updatedHistory;
      });
    },
    [setHistory]
  );

  // 履歴の削除
  const removeHistory = useCallback(
    (service: string) => {
      setHistory((prev) => {
        const currentHistory = prev || [];
        return currentHistory.filter((item) => item.service !== service);
      });
    },
    [setHistory]
  );

  // サイドメニューの開閉制御
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // 履歴の更新（最終使用時間の更新）
  const updateLastUsed = useCallback(
    (service: string) => {
      setHistory((prev) => {
        const currentHistory = prev || [];
        const index = currentHistory.findIndex(
          (item) => item.service === service
        );
        if (index === -1) return currentHistory;

        const newHistory = [...currentHistory];
        newHistory[index] = {
          ...newHistory[index],
          lastUsed: Date.now(),
        };

        return newHistory;
      });
    },
    [setHistory]
  );

  return {
    history: history || [], // 常に配列を返す
    addHistory,
    removeHistory,
    updateLastUsed,
    isOpen,
    toggleOpen,
  };
};
