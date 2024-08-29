import React, { createContext, useEffect, useState } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";
import { CardType } from "@/components/kanbanBoard/types";
import { defaultCards } from "@/components/kanbanBoard/constants";

interface AppContextType {
  activeCardId: UniqueIdentifier | null;
  setActiveCardId: React.Dispatch<
    React.SetStateAction<UniqueIdentifier | null>
  >;
  cards: CardType[];
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
  isModalOpen: boolean;
  currentCard: CardType | null;
  currentListId: string;
  setCurrentCard: React.Dispatch<React.SetStateAction<CardType | null>>;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  setCurrentListId: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeCardId, setActiveCardId] = useState<UniqueIdentifier | null>(
    null
  );

  const localStorageCards: CardType[] = JSON.parse(
    typeof window !== "undefined"
      ? window.localStorage.getItem("cards") || "[]"
      : "[]"
  );
  const initialCards = localStorageCards?.length
    ? localStorageCards
    : defaultCards;

  const [cards, setCards] = useState<CardType[]>(initialCards);
  const [currentListId, setCurrentListId] = useState("");
  const [currentCard, setCurrentCard] = useState<CardType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const cardString = JSON.stringify(cards || []);

    localStorage.setItem("cards", cardString);
  }, [cards]);

  return (
    <AppContext.Provider
      value={{
        cards,
        setCards,
        isModalOpen,
        currentCard,
        activeCardId,
        currentListId,
        setCurrentCard,
        setActiveCardId,
        handleOpenModal,
        handleCloseModal,
        setCurrentListId,
      }}
    >
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
