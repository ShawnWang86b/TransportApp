import { useState, useMemo, ReactNode } from "react";
import { CommuteContext } from "./CommuteContext";
import { ConnectionType } from "../types/CommuteTypes";

interface CommuteProviderProps {
  children: ReactNode;
}

export const CommuteProvider = ({ children }: CommuteProviderProps) => {
  const [connectionData, setConnectionData] = useState<ConnectionType | null>(
    null
  );

  const value = useMemo(() => {
    return {
      connection: connectionData,
      updateConnection: setConnectionData,
    };
  }, [connectionData]);

  return (
    <CommuteContext.Provider value={value}>{children}</CommuteContext.Provider>
  );
};
