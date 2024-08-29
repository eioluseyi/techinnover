import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn, formatDate, formatTime } from "@/lib/utils";
import { useAppContext } from "@/components/kanbanBoard/contexts";
import { CardType } from "@/components/kanbanBoard/types";
import {
  CardHeader,
  CardImage,
  PriorityBadge,
  StatusFlag,
} from "@/components/kanbanBoard/fragments";

export const TaskCard = ({
  card,
  isDragOverlay,
}: {
  card: CardType;
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

  const isTaskOverdue = new Date(card.dueDate) < new Date();

  const taskStatus = (() => {
    if (card.listId === "done") return "completed";
    if (isTaskOverdue) return "overdue";
    return "";
  })();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-white shadow p-4 rounded-lg text-[#6E7C87] select-none",
        isDragOverlay && "border-[#7fa1e4] border shadow-md rotate-[3deg]",
        !isDragOverlay &&
          isActiveCard &&
          "text-[#e6ecf6] bg-[#e6ecf6] outline-dashed outline-[#7fa1e4]"
      )}
    >
      <PriorityBadge priority={card.priority} />
      <CardHeader title={card.title} />
      <CardImage src={card.imageSrc} alt={card.title} />
      <div
        className="cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <p className="mt-2 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis
          fuga, magnam soluta assumenda placeat, quas fugit inventore sunt illo
          optio doloremque quod facilis cum ab perspiciatis tempore magni
          architecto quos?
        </p>
        <div className="flex items-center gap-2 mt-4 font-medium text-xs">
          <StatusFlag status={taskStatus} />
          <span>{formatDate(new Date(card.dueDate), { month: "short" })}</span>
          <span className="ml-auto">
            {formatTime(new Date(card.dueDate), {
              hour12: true,
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
