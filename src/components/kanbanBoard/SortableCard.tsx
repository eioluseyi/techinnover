import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/components/kanbanBoard/contexts";

export const TaskCard = ({
  card,
  isDragOverlay,
}: {
  card: { id: string; content: string; listId: string };
  isDragOverlay?: boolean;
}) => {
  const { activeCardId } = useAppContext();
  const isActiveCard = activeCardId === card.id;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "flex justify-between items-center gap-2 bg-white shadow p-4 rounded-lg cursor-grab active:cursor-grabbing select-none",
        isDragOverlay &&
          "border-[#7fa1e4] border shadow-md rotate-[3deg] transition-transform",
        !isDragOverlay &&
          isActiveCard &&
          "text-[#e6ecf6] bg-[#e6ecf6] outline-dashed outline-[#7fa1e4]"
      )}
    >
      <div className="flex items-center gap-2">
        <span>{card.content}</span>
      </div>
    </div>
  );
};
