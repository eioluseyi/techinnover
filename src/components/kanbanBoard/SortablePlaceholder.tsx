import { cn } from "@/lib/utils";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortablePlaceholder = ({
  id = 0,
  isActive,
}: {
  id: UniqueIdentifier;
  isActive: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: `placeholder-${id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        "text-gray-300 pointer-events-none select-none opacity-0 h-0 overflow-hidden transition-opacity place-items-center grid",
        isActive && "h-20 opacity-100"
      )}
    >
      Drop items here
    </div>
  );
};

export default SortablePlaceholder;
