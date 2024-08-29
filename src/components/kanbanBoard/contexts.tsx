import React, { createContext, useState } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";
import { CardType } from "@/components/kanbanBoard/types";

const initialCards: CardType[] = [
  {
    id: "card1",
    listId: "todo",
    title: "First",
    priority: "LOW",
    dueDate: new Date().toString(),
    description: "Task 1",
    imageSrc: "https://picsum.photos/seed/picsum/200/300",
  },
  {
    id: "card2",
    listId: "inprogress",
    title: "Firstond",
    priority: "MEDIUM",
    dueDate: new Date(1600000000000).toString(),
    description: "Task 2",
    imageSrc: "https://picsum.photos/seed/picsum/200/300",
  },
  {
    id: "card3",
    listId: "done",
    title: "Ford",
    priority: "HIGH",
    dueDate: new Date(1800000000000).toString(),
    description: "Task 3",
  },
  {
    id: "card4",
    listId: "done",
    title: "Feet",
    priority: "LOW",
    dueDate: new Date().toString(),
    description: "Task 4",
  },
  {
    id: "card5",
    listId: "done",
    title: "Seat",
    priority: "MEDIUM",
    dueDate: new Date(1850000000000).toString(),
    description: "Task 5",
  },
  {
    id: "card6",
    listId: "done",
    title: "Se'un",
    priority: "HIGH",
    dueDate: new Date(1720000000000).toString(),
    description: "Task 6",
  },
];

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
  const [cards, setCards] = useState<CardType[]>(initialCards);
  const [currentListId, setCurrentListId] = useState("");
  const [currentCard, setCurrentCard] = useState<CardType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
