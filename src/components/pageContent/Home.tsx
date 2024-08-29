"use client";

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
import { TaskCard } from "@/components/kanbanBoard/TaskCard";
import { useAppContext } from "@/components/kanbanBoard/contexts";
import { TaskList } from "@/components/kanbanBoard/List";
import Modal from "@/components/kanbanBoard/Modal";

const lists = [
  { id: "todo", title: "To Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const HomeContent = () => {
  const { cards, setCards, activeCardId, setActiveCardId } = useAppContext();

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
    <>
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
      <Modal />
    </>
  );
};

export default HomeContent;
