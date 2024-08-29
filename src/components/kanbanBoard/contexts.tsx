import React, { createContext, useEffect, useState } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";
import { CardType } from "@/components/kanbanBoard/types";

const defaultCards: CardType[] = [
  {
    id: "card1",
    listId: "todo",
    title: "Prepare Project Proposal",
    priority: "LOW",
    dueDate: new Date("2024-09-10T10:00:00Z").toISOString(),
    description: "Draft the initial proposal for the upcoming project meeting.",
    imageSrc: "https://picsum.photos/seed/project1/200/300",
  },
  {
    id: "card2",
    listId: "inprogress",
    title: "Design User Interface",
    priority: "MEDIUM",
    dueDate: new Date("2024-09-15T14:00:00Z").toISOString(),
    description:
      "Create wireframes and mockups for the new application interface.",
    imageSrc: "https://picsum.photos/seed/design/200/300",
  },
  {
    id: "card3",
    listId: "done",
    title: "Fix Bug in Authentication",
    priority: "HIGH",
    dueDate: new Date("2024-08-25T09:00:00Z").toISOString(),
    description: "Resolve the issue with user login that prevents access.",
    imageSrc: "https://picsum.photos/seed/bugfix/200/300",
  },
  {
    id: "card4",
    listId: "done",
    title: "Update Documentation",
    priority: "LOW",
    dueDate: new Date("2024-08-20T11:00:00Z").toISOString(),
    description:
      "Revise the project's documentation to reflect recent changes.",
    imageSrc: "https://picsum.photos/seed/documentation/200/300",
  },
  {
    id: "card5",
    listId: "done",
    title: "Conduct User Testing",
    priority: "MEDIUM",
    dueDate: new Date("2024-08-30T13:00:00Z").toISOString(),
    description:
      "Organize and execute user testing sessions to gather feedback.",
    imageSrc: "https://picsum.photos/seed/testing/200/300",
  },
  {
    id: "card6",
    listId: "done",
    title: "Deploy Application",
    priority: "HIGH",
    dueDate: new Date("2024-09-01T16:00:00Z").toISOString(),
    description:
      "Deploy the final version of the application to the production environment.",
    imageSrc: "https://picsum.photos/seed/deploy/200/300",
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

  const localStorageCards: CardType[] = JSON.parse(
    localStorage.getItem("cards") || "[]"
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
