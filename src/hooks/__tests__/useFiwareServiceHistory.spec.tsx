import { renderHook, act } from "@testing-library/react";
import { useFiwareServiceHistory } from "../useFiwareServiceHistory";

// LocalStorageのモック
const mockLocalStorage = () => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: any) => {
      store[key] = JSON.stringify(value);
    },
    clear: () => {
      store = {};
    },
    // テスト用にstoreの中身を確認する関数を追加
    _getStore: () => store,
  };
};

describe("useFiwareServiceHistory", () => {
  beforeEach(() => {
    // LocalStorageのモックを設定
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage(),
      writable: true
    });
    // フェイクタイマーを有効化
    jest.useFakeTimers();
  });

  afterEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
    // フェイクタイマーをリセット
    jest.useRealTimers();
  });

  it("初期状態では空の履歴を返す", () => {
    const { result } = renderHook(() => useFiwareServiceHistory());
    expect(result.current.history).toEqual([]);
  });

  it("空文字列は履歴に追加されない", () => {
    const { result } = renderHook(() => useFiwareServiceHistory());

    act(() => {
      result.current.addHistory("");
    });

    expect(result.current.history.length).toBe(0);
  });

  it("undefinedは履歴に追加されない", () => {
    const { result } = renderHook(() => useFiwareServiceHistory());

    act(() => {
      result.current.addHistory(undefined as any);
    });

    expect(result.current.history.length).toBe(0);
  });

  it("履歴を追加できる", async () => {
    const { result, rerender } = renderHook(() => useFiwareServiceHistory());
    const testService = "test-service";

    act(() => {
      result.current.addHistory(testService);
    });

    rerender(); // 再レンダリングして最新の状態を取得

    expect(result.current.history.length).toBe(1);
    expect(result.current.history[0].service).toBe(testService);
    expect(result.current.history[0].lastUsed).toBeDefined();
  });

  it("重複する履歴は追加せず、最新の使用時間で更新する", () => {
    jest.setSystemTime(new Date('2025-01-01')); // システム時間を固定
    const { result, rerender } = renderHook(() => useFiwareServiceHistory());
    const testService = "test-service";

    // 1回目の追加
    act(() => {
      result.current.addHistory(testService);
    });
    rerender();
    const firstTimestamp = result.current.history[0].lastUsed;

    // 時間を進めて2回目の追加
    jest.setSystemTime(new Date('2025-01-02')); // 1日進める
    act(() => {
      result.current.addHistory(testService);
    });
    rerender();

    expect(result.current.history.length).toBe(1);
    expect(result.current.history[0].lastUsed).toBeGreaterThan(firstTimestamp);
  });

  it("履歴を削除できる", async () => {
    const { result, rerender } = renderHook(() => useFiwareServiceHistory());

    act(() => {
      result.current.addHistory("test-service-1");
    });
    rerender();

    act(() => {
      result.current.addHistory("test-service-2");
    });
    rerender();

    expect(result.current.history.length).toBe(2);

    act(() => {
      result.current.removeHistory("test-service-1");
    });
    rerender();

    expect(result.current.history.length).toBe(1);
    expect(result.current.history[0].service).toBe("test-service-2");
  });

  it("最大20件まで履歴を保持する", async () => {
    const { result, rerender } = renderHook(() => useFiwareServiceHistory());

    // 21件の履歴を追加
    for (let i = 1; i <= 21; i++) {
      act(() => {
        result.current.addHistory(`test-service-${i}`);
      });
      rerender();
    }

    expect(result.current.history.length).toBe(20);
    // 最新の履歴が先頭にあることを確認
    expect(result.current.history[0].service).toBe("test-service-21");
    // 最も古い履歴が削除されていることを確認
    expect(result.current.history.find(h => h.service === "test-service-1")).toBeUndefined();
  });

  it("サイドメニューの開閉状態を切り替えられる", () => {
    const { result } = renderHook(() => useFiwareServiceHistory());

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggleOpen();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggleOpen();
    });

    expect(result.current.isOpen).toBe(false);
  });
});
