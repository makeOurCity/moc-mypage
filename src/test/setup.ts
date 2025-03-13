import "@testing-library/jest-dom";

// setImmediateのグローバルモック
(global as any).setImmediate = (callback: () => void) =>
  setTimeout(callback, 0);
