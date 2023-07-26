import { createContext, useContext } from "react";
import { ConnectionType } from "../types/CommuteTypes";

interface CommuteContextType {
  connection: ConnectionType | null;
  updateConnection: (value: ConnectionType | null) => void;
}

export const CommuteContext = createContext<CommuteContextType | null>(null);

export const useCommuteContext = () => {
  const context = useContext(CommuteContext);

  if (!context) {
    throw new Error("useCommuteContext must used within CommuteContext");
  }

  return context;
};
