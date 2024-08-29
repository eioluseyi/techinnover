import { PriorityType } from "@/components/kanbanBoard/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export const PriorityBadge = ({ priority }: { priority: PriorityType }) => {
  // use a switch statement within an IIFE to return the colors and use the exact colors from the figma design
  const colorClass = (() => {
    switch (priority) {
      case "HIGH":
        return "bg-[#EBFAE2] text-[#4F9C20]";
      case "MEDIUM":
        return "bg-[#EEF3FF] text-[#3069FE]";
      case "LOW":
      default:
        return "bg-[#FDF2F2] text-[#EC5962]";
    }
  })();

  return (
    <div className="flex">
      <div className={cn("px-2 py-1 rounded text-xs font-medium", colorClass)}>
        {priority}
      </div>
    </div>
  );
};

export const StatusFlag = ({ status = "" }) => (
  <span
    className={cn(
      "text-[#6E7C87]",
      status === "completed" && "text-[#4F9C20]",
      status === "overdue" && "text-[#F76659]"
    )}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.5"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 8C5 7.20435 5.31607 6.44129 5.87868 5.87868C6.44129 5.31607 7.20435 5 8 5H18C18.1857 5 18.3678 5.05171 18.5257 5.14935C18.6837 5.24698 18.8114 5.38668 18.8944 5.55279C18.9775 5.71889 19.0126 5.90484 18.996 6.08981C18.9793 6.27477 18.9114 6.45143 18.8 6.6L16.25 10L18.8 13.4C18.9114 13.5486 18.9793 13.7252 18.996 13.9102C19.0126 14.0952 18.9775 14.2811 18.8944 14.4472C18.8114 14.6133 18.6837 14.753 18.5257 14.8507C18.3678 14.9483 18.1857 15 18 15H8C7.73478 15 7.48043 15.1054 7.29289 15.2929C7.10536 15.4804 7 15.7348 7 16V19C7 19.2652 6.89464 19.5196 6.70711 19.7071C6.51957 19.8946 6.26522 20 6 20C5.73478 20 5.48043 19.8946 5.29289 19.7071C5.10536 19.5196 5 19.2652 5 19V8Z"
        fill="currentColor"
      />
    </svg>
  </span>
);

export const CardImage = ({ src = "", alt = "" }) => {
  if (!src) return <></>;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Image
          src={src || "/#"}
          alt={alt}
          width={200}
          height={100}
          className="mt-2 rounded-md w-full max-h-24 hover:cursor-context-menu object-cover"
        />
      </HoverCardTrigger>
      <HoverCardContent className="max-w-[80vw] md:max-w-[50vw]">
        <Image
          src={src || "/#"}
          alt={alt}
          width={200}
          height={100}
          className="rounded-md w-full"
        />
      </HoverCardContent>
    </HoverCard>
  );
};

const MenuButton = () => (
  <Popover>
    <PopoverTrigger asChild>
      <button
        className="relative z-10 place-items-center grid px-1 border rounded-md aspect-square"
        type="button"
      >
        <DotsHorizontalIcon className="size-4" />
      </button>
    </PopoverTrigger>
    <PopoverContent className="grid p-0 border w-fit text-xs">
      <button
        type="button"
        className="hover:bg-foreground/5 px-3 pt-2 pb-1 text-[#252C32] text-left transition-colors"
      >
        Edit
      </button>
      <button
        type="button"
        className="hover:bg-foreground/5 px-3 pt-1 pb-2 text-[#E60C02] text-left transition-colors"
      >
        Delete
      </button>
    </PopoverContent>
  </Popover>
);

export const CardHeader = ({ title = "" }) => (
  <div className="flex justify-between gap-4 mt-4">
    <h4 className="font-medium text-[#1A1919] text-base">{title}</h4>
    <MenuButton />
  </div>
);
