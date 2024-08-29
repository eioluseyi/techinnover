export type PriorityType = "LOW" | "MEDIUM" | "HIGH";

export type CardType = {
  id: string;
  listId: string;
  title: string;
  priority: PriorityType;
  dueDate: string;
  description?: string;
  imageSrc?: string;
};
