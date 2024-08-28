import { PlusIcon } from "@radix-ui/react-icons";

const ListItem = ({ title = "" }) => {
  return (
    <div className="flex justify-between items-center gap-2 bg-white shadow p-4 rounded-lg cursor-grab active:cursor-grabbing select-none">
      <div className="flex items-center gap-2">
        <span>{title}</span>
      </div>
    </div>
  );
};

type ListColumnProps = {
  title: string;
  items: { title: string }[];
};

const ListColumn = ({ title = "", items = [] }: ListColumnProps) => {
  const count = items.length;

  const ListHeader = () => (
    <div className="flex justify-between items-center gap-2">
      <div className="flex items-center gap-2 font-medium">
        <span>{title}</span>
        {Boolean(count) && (
          <span className="bg-[#DDDDDD] px-2 py-0.5 rounded text-sm">
            {count}
          </span>
        )}
      </div>
      <button className="hover:scale-110 border border-transparent hover:border-border rounded transition-all">
        <PlusIcon className="p-1 w-6 h-6" />
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 bg-[#F5F7F9] px-2 py-3 rounded-lg max-h-full text-[#6F6F6F] overflow-hidden">
      <ListHeader />
      <div className="flex-1 content-start gap-4 grid -mx-1 -mt-1 px-1 pt-1 rounded-lg max-h-full overflow-x-hidden overflow-y-auto">
        {items.map((item, index) => (
          <ListItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const listColumnList = [
    {
      title: "To Do",
      items: [
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
        { title: "Initialize!" },
      ],
    },
  ];

  return (
    <div className="gap-4 grid grid-cols-3 h-full max-h-full overflow-x-auto overflow-y-hidden">
      {listColumnList.map((listColumn, idx) => (
        <ListColumn key={idx} {...listColumn} />
      ))}
    </div>
  );
}
