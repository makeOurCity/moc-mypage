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
    }
  };
};

describe("useFiwareServiceHistory", () => {
  beforeEach(() => {
    // LocalStorageのモックを設定
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage(),
      writable: true
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("初期状態では空の履歴を返す", () => {
    const { result } = renderHook(() => useFiwareServiceHistory());
    expect(result.current.history).toEqual([]);
  });

  it("履歴を追加できる", () => {
    const { result } = renderHook(() => useFiwareServiceHistory());

    act(() => {
      result.current.addHistory("test-service");
    });

    expect(result.current.history.length).toBe(1);
    expect(result.current.history[0].service).toBe("test-service");
  });

  it("重複する履歴は追加せず、最新の使用時間で更新する", () => {
    const { result } = renderHook(() => useFiwareServiceHistory());

    act(() => {
      result.current.addHistory("test-service");
      // 少し待ってから同じサービスを追加
      jest.advanceTimersByTime(1000);
      result.current.addHistory("test-service");
    });

    expect(result.current.history.length).toBe(1);
    expect(result.current.history[0].service).toBe("test-service");
  });

  it("履歴を削除できる", () => {
    const { result } = renderHook(() => useFiwareServiceHistory());

    act(() => {
      result.current.addHistory("test-service-1");
      result.current.addHistory("test-service-2");
    });

    expect(result.current.history.length).toBe(2);

    act(() => {
      result.current.removeHistory("test-service-1");
    });

    expect(result.current.history.length).toBe(1);
    expect(result.current.history[0].service).toBe("test-service-2");
  });

  it("最大20件まで履歴を保持する", () => {
    const { result } = renderHook(() => useFiwareServiceHistory());

    act(() => {
      // 21件の履歴を追加
      for (let i = 1; i <= 21; i++) {
        result.current.addHistory(`test-service-${i}`);
      }
    });

    expect(result.current.history.length).toBe(20);
    // 最新の履歴が先頭にあることを確認
    expect(result.current.history[0].service).toBe("test-service-21");
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
