import { useAppContext } from "@/components/kanbanBoard/contexts";
import { PriorityBadge } from "@/components/kanbanBoard/fragments";
import { CardType, PriorityType } from "@/components/kanbanBoard/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FileInput from "@/components/ui/file-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  cn,
  combineDateTimeToISOString,
  getDateTimeValuesForPickers,
  getFilePath,
  getPseudoFile,
} from "@/lib/utils";
import { FormEvent, useEffect, useMemo, useState } from "react";

const priorityList: PriorityType[] = ["HIGH", "MEDIUM", "LOW"];

const Modal = () => {
  const {
    isModalOpen,
    currentCard: card,
    currentListId,
    setCards,
    handleOpenModal,
    handleCloseModal,
  } = useAppContext();

  const currentCard = useMemo(() => ({ ...card }), [card]);

  const listId = currentListId || currentCard?.listId;
  const isEditing = Boolean(card);
  const titleText = isEditing ? "Edit Task" : "Add Task";

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<PriorityType | "">("");
  const [cover, setCover] = useState<File | null>(null);
  const [deadline, setDeadline] = useState("");
  const [time, setTime] = useState("");

  const onOpenChange = (val: boolean) => {
    if (val) return handleOpenModal?.();
    handleCloseModal?.();
  };

  type PayloadType = {
    taskName: string;
    description: string;
    priority: "" | PriorityType;
    cover: File | null;
    deadline: string;
    time: string;
  };

  const handleUpdate = async (data: PayloadType) => {
    let imgSrc = "";

    try {
      imgSrc = await getFilePath(data.cover);
    } catch (_) {}

    setCards((prev) => {
      const updatingData = [...prev];
      const selectedCardIdx = prev.findIndex((el) => el.id === currentCard.id);

      if (selectedCardIdx < 0) return prev;

      const dateTime = combineDateTimeToISOString(data.deadline, data.time);

      updatingData[selectedCardIdx].title = data.taskName;
      updatingData[selectedCardIdx].priority = data.priority as PriorityType;
      updatingData[selectedCardIdx].dueDate = dateTime;
      updatingData[selectedCardIdx].description = data.description;
      updatingData[selectedCardIdx].imageSrc = imgSrc;

      return updatingData;
    });

    handleCloseModal();

    toast({
      title: "Task Updated",
    });
  };

  const handleCreate = async (data: PayloadType) => {
    let imgSrc = "";

    try {
      imgSrc = await getFilePath(data.cover);
    } catch (_) {}

    const dateTime = combineDateTimeToISOString(data.deadline, data.time);

    const newData: CardType = {
      id: String(new Date().getTime()),
      listId: String(listId),
      title: data.taskName,
      priority: data.priority as PriorityType,
      dueDate: dateTime,
      description: data.description,
      imageSrc: imgSrc,
    };

    setCards((prev) => [...prev, newData]);

    handleCloseModal();

    toast({
      title: "Task Created",
    });
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const payload = {
      taskName,
      description,
      priority,
      cover,
      deadline,
      time,
    };

    if (!payload.taskName)
      return toast({
        title: "Task name cannot be empty",
        variant: "destructive",
      });

    if (!payload.priority)
      return toast({
        title: "You must set your priorities right",
        variant: "destructive",
      });

    if (!payload.deadline)
      return toast({
        title: "You need a deadline for this task",
        variant: "destructive",
      });

    if (!payload.time)
      return toast({
        title: "The task has to be timebound",
        variant: "destructive",
      });

    if (isEditing) return handleUpdate(payload);
    handleCreate(payload);
  };

  useEffect(() => {
    setTaskName(currentCard?.title || "");
    setDescription(currentCard?.description || "");
    setPriority(currentCard?.priority || "");
    setCover(getPseudoFile(currentCard?.imageSrc || ""));
    setDeadline(
      Boolean(currentCard?.dueDate)
        ? getDateTimeValuesForPickers(new Date(String(currentCard.dueDate)))
            .dateValue
        : ""
    );
    setTime(
      Boolean(currentCard?.dueDate)
        ? getDateTimeValuesForPickers(new Date(String(currentCard.dueDate)))
            .timeValue
        : ""
    );
  }, [currentCard]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onOpenChange} modal>
      <DialogContent aria-describedby="Modal">
        <DialogHeader>
          <DialogTitle>{titleText}</DialogTitle>
          <DialogDescription className="h-0"></DialogDescription>
        </DialogHeader>
        <form className="gap-5 grid py-8" onSubmit={handleSubmit}>
          <div className="items-center gap-1.5 grid w-full">
            <Label htmlFor="task-name">Task Name</Label>
            <Input
              id="task-name"
              placeholder="Enter task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className="items-center gap-1.5 grid w-full">
            <Label htmlFor="description">
              Description <span className="text-[#848585]">(Optional)</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Write more on the task...."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="items-center gap-1.5 grid w-full">
            <Label htmlFor="description">Priority</Label>
            <Select
              value={priority}
              onValueChange={(v: PriorityType) => setPriority(v)}
            >
              <SelectTrigger className={cn(!priority && "text-[#848585]")}>
                <SelectValue placeholder="Select the priority of the task">
                  <PriorityBadge priority={priority || "LOW"} />
                </SelectValue>
              </SelectTrigger>
              <SelectContent
                side="right"
                className="max-w-48 !-translate-x-full translate-y-10"
              >
                <SelectGroup>
                  {priorityList.map((itm, idx) => (
                    <SelectItem
                      key={idx}
                      value={itm}
                      className={cn(
                        "[&_*]:!bg-transparent",
                        itm === "HIGH" && "!text-[#4F9C20]",
                        itm === "HIGH" &&
                          priority === "HIGH" &&
                          "!bg-[#EBFAE2]",
                        itm === "MEDIUM" && "!text-[#3069FE]",
                        priority === "MEDIUM" &&
                          itm === "MEDIUM" &&
                          "!bg-[#EEF3FF]",
                        itm === "LOW" && "!text-[#EC5962]",
                        priority === "LOW" && itm === "LOW" && "!bg-[#FDF2F2]"
                      )}
                    >
                      <PriorityBadge priority={itm} />
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="items-center gap-1.5 grid w-full">
            <Label htmlFor="cover">
              Upload cover <span className="text-[#848585]">(Optional)</span>
            </Label>
            <FileInput
              id="cover"
              accept="image/*"
              file={cover}
              setFile={setCover}
            />
          </div>
          <div className="gap-4 grid lg:grid-cols-2 w-full">
            <div className="items-center gap-1.5 grid">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                placeholder={new Date().toLocaleString()}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <div className="items-center gap-1.5 grid">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                placeholder={new Date().toLocaleString()}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          <button className="bg-primary hover:bg-primary/80 p-3 rounded-xl text-white transition-colors">
            {isEditing ? "Update" : "Create"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
