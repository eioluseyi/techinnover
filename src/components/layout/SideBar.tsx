import {
  CalendarIcon,
  InboxIcon,
  NotesIcon,
  SettingsIcon,
  TodoListIcon,
} from "@/components/layout/navIcons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  {
    title: "Calendar",
    icon: <CalendarIcon />,
    isActive: true,
  },
  {
    title: "Inbox",
    icon: <InboxIcon />,
    isActive: false,
  },
  {
    title: "Notes",
    icon: <NotesIcon />,
    isActive: false,
  },
  {
    title: "Todo List",
    icon: <TodoListIcon />,
    isActive: false,
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    isActive: false,
  },
];

const Logo = () => (
  <div className="place-items-center grid pt-10 pb-14">
    <Image
      src={"/assets/img/logo.png"}
      alt={"Techinnover Logo"}
      width={175}
      height={38}
      className="w-20 lg:w-auto object-contain"
    />
  </div>
);

const NavLink = ({ icon, title, isActive }: (typeof navLinks)[number]) => (
  <Link
    href="/"
    className={cn(
      "flex items-center gap-5 border-transparent p-5 border-r-[6px] uppercase text-[#65676D] font-semibold text-lg hover:bg-foreground/5 hover:border-foreground/10",
      isActive && "!border-primary !bg-primary/10 !text-primary"
    )}
  >
    {icon}
    <span className="lg:inline hidden">{title}</span>
  </Link>
);

const SideBar = () => {
  return (
    <div className="h-full">
      <Logo />
      <div>
        {navLinks.map((itm, idx) => (
          <NavLink key={idx} {...itm} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
