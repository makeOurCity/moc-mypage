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

  // 履歴が未定義の場合は空配列を使用
  const currentHistory = history || [];

  // 新しい履歴を追加
  const addHistory = useCallback(
    (service: string) => {
      if (!service) return; // 空文字列は保存しない

      setHistory((prev) => {
        const current = prev || [];
        const now = Date.now();

        // 重複を除去して新しい項目を先頭に追加
        const withoutDuplicate = current.filter(
          (item) => item.service !== service
        );
        const updated = [{ service, lastUsed: now }, ...withoutDuplicate];

        // 最大件数を超えた場合、古い履歴を削除
        return updated.slice(0, MAX_HISTORY_COUNT);
      });
    },
    [setHistory]
  );

  // 履歴の削除
  const removeHistory = useCallback(
    (service: string) => {
      setHistory((prev) => {
        const current = prev || [];
        return current.filter((item) => item.service !== service);
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
        const current = prev || [];
        const index = current.findIndex((item) => item.service === service);
        if (index === -1) return current;

        const updated = [...current];
        updated[index] = {
          ...updated[index],
          lastUsed: Date.now(),
        };

        return updated;
      });
    },
    [setHistory]
  );

  return {
    history: currentHistory,
    addHistory,
    removeHistory,
    updateLastUsed,
    isOpen,
    toggleOpen,
  };
};
