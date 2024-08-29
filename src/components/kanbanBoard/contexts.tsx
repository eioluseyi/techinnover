import React, { createContext, useState } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";

interface AppContextType {
  activeCardId: UniqueIdentifier | null;
  setActiveCardId: React.Dispatch<
    React.SetStateAction<UniqueIdentifier | null>
  >;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeCardId, setActiveCardId] = useState<UniqueIdentifier | null>(
    null
  );

  return (
    <AppContext.Provider value={{ activeCardId, setActiveCardId }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
