// List.js
import React from "react";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PlusIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import TaskListPlaceholder from "@/components/kanbanBoard/TaskListPlaceholder";
import { TaskCard } from "@/components/kanbanBoard/TaskCard";
import { useAppContext } from "@/components/kanbanBoard/contexts";
import { CardType } from "@/components/kanbanBoard/types";

export const TaskList = ({
  list,
  cards,
}: {
  list: { title: string; id: UniqueIdentifier };
  cards: CardType[];
}) => {
  const { setCurrentListId, setCurrentCard, handleOpenModal } = useAppContext();
  const { setNodeRef } = useDroppable({
    id: list.id,
  });

  const count = cards.length;

  const ListHeader = () => {
    const handleClick = () => {
      setCurrentListId(String(list.id));
      setCurrentCard(null);
      handleOpenModal();
    };

    return (
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span>{list.title}</span>
          {Boolean(count) && (
            <span className="bg-[#DDDDDD] px-2 py-0.5 rounded text-sm">
              {count}
            </span>
          )}
        </div>
        <button
          onClick={handleClick}
          className="hover:scale-110 border border-transparent hover:border-border rounded transition-all"
        >
          <PlusIcon className="p-1 w-6 h-6" />
        </button>
      </div>
    );
  };

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col gap-4 bg-[#F5F7F9] px-2 py-3 rounded-lg w-full h-fit max-h-full text-[#6F6F6F] overflow-x-visible overflow-y-hidden"
    >
      <ListHeader />
      <SortableContext
        items={cards.map((card) => card.id)}
        strategy={verticalListSortingStrategy}
        id={`list_id_${list.id}`}
      >
        <div
          className={cn(
            "flex-1 relative content-start gap-4 grid -mx-1 -mt-1 overscroll-contain p-1 rounded-lg min-h-96_ max-h-full overflow-x-visible overflow-y-auto",
            cards.length === 0 && "grid-rows-1"
          )}
        >
          <TaskListPlaceholder id={list.id} isActive={cards.length === 0} />
          {cards.map((card) => (
            <TaskCard key={card.id} card={card} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};
