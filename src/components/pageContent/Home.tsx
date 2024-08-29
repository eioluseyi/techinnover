"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { TaskCard } from "@/components/kanbanBoard/SortableCard";
import { useAppContext } from "@/components/kanbanBoard/contexts";
import { TaskList } from "@/components/kanbanBoard/List";
import { CardType, PriorityType } from "@/components/kanbanBoard/types";

const initialCards: CardType[] = [
  {
    id: "card1",
    content: "Task 1",
    listId: "todo",
    title: "First",
    priority: "LOW",
    dueDate: new Date().toString(),
    imageSrc: "https://picsum.photos/seed/picsum/200/300",
  },
  {
    id: "card2",
    content: "Task 2",
    listId: "inprogress",
    title: "Firstond",
    priority: "MEDIUM",
    dueDate: new Date(1600000000000).toString(),
    imageSrc: "https://picsum.photos/seed/picsum/200/300",
  },
  {
    id: "card3",
    content: "Task 3",
    listId: "done",
    title: "Ford",
    priority: "HIGH",
    dueDate: new Date(1800000000000).toString(),
  },
  {
    id: "card4",
    content: "Task 4",
    listId: "done",
    title: "Feet",
    priority: "LOW",
    dueDate: new Date().toString(),
  },
  {
    id: "card5",
    content: "Task 5",
    listId: "done",
    title: "Seat",
    priority: "MEDIUM",
    dueDate: new Date(1850000000000).toString(),
  },
  {
    id: "card6",
    content: "Task 6",
    listId: "done",
    title: "Se'un",
    priority: "HIGH",
    dueDate: new Date(1720000000000).toString(),
  },
];

const HomeContent = () => {
  const { activeCardId, setActiveCardId } = useAppContext();
  const [lists, setLists] = useState([
    { id: "todo", title: "To Do" },
    { id: "inprogress", title: "In Progress" },
    { id: "done", title: "Done" },
  ]);
  const [cards, setCards] = useState<CardType[]>(initialCards);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveCardId(event.active.id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const overListId = (() => {
      if (String(over.id).startsWith("placeholder-"))
        return String(over.id).split("-")[1];
      return cards.find((card) => card.id === over.id)?.listId;
    })();

    const activeCard = cards.find((card) => card.id === active.id);

    if (!activeCard || !overListId) return;

    if (activeCard.listId !== overListId) {
      setCards((prev) =>
        prev.map((card) =>
          card.id === activeCard.id ? { ...card, listId: overListId } : card
        )
      );
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const overListId = (() => {
      if (String(over.id).startsWith("placeholder-"))
        return String(over.id).split("-")[1];
      return cards.find((card) => card.id === over.id)?.listId;
    })();

    const activeCard = cards.find((card) => card.id === active.id);

    if (!activeCard || !overListId) return;

    if (activeCard.listId === overListId) {
      const oldIndex = cards.findIndex((card) => card.id === active.id);
      const newIndex = cards.findIndex((card) => card.id === over.id);
      setCards(arrayMove(cards, oldIndex, newIndex));
    }

    setActiveCardId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <div className="gap-4 grid grid-cols-3 h-full max-h-full overflow-x-auto overflow-y-hidden">
        {lists.map((list) => (
          <TaskList
            key={list.id}
            list={list}
            cards={cards.filter((card) => card.listId === list.id)}
          />
        ))}
      </div>
      <DragOverlay>
        {activeCardId ? (
          <TaskCard
            card={cards.find((card) => card.id === activeCardId)!}
            isDragOverlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default HomeContent;
