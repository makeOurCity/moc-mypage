import { useState } from "react";

export function useMultiTenancy() {
  const [fiwareService, setFiwareService] = useState<string | undefined>(
    undefined
  );

  const reset = () => {
    setFiwareService(undefined);
  };

  return {
    fiwareService,
    setFiwareService,
    reset,
  };
}
