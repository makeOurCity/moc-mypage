import { Environments } from "../environments";

describe("Environments.getAppVersion", () => {
  const originalVersion = process.env.NEXT_PUBLIC_APP_VERSION;

  afterEach(() => {
    if (originalVersion === undefined) {
      delete process.env.NEXT_PUBLIC_APP_VERSION;
    } else {
      process.env.NEXT_PUBLIC_APP_VERSION = originalVersion;
    }
  });

  it("returns the version from NEXT_PUBLIC_APP_VERSION", () => {
    process.env.NEXT_PUBLIC_APP_VERSION = "1.2.3";

    expect(Environments.getAppVersion()).toBe("1.2.3");
  });

  it("returns x.x.x when NEXT_PUBLIC_APP_VERSION is not set", () => {
    delete process.env.NEXT_PUBLIC_APP_VERSION;

    expect(Environments.getAppVersion()).toBe("x.x.x");
  });

  it("returns x.x.x when NEXT_PUBLIC_APP_VERSION is empty", () => {
    process.env.NEXT_PUBLIC_APP_VERSION = "";

    expect(Environments.getAppVersion()).toBe("x.x.x");
  });
});
