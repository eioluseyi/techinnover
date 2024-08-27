import { Input } from "@/components/ui/input";

const SearchIcon = ({ className = "" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 6.00077C8.93913 6.00077 7.92172 6.42219 7.17157 7.17234C6.42143 7.92248 6 8.9399 6 10.0008C6 11.0616 6.42143 12.079 7.17157 12.8292C7.92172 13.5793 8.93913 14.0008 10 14.0008C11.0609 14.0008 12.0783 13.5793 12.8284 12.8292C13.5786 12.079 14 11.0616 14 10.0008C14 8.9399 13.5786 7.92248 12.8284 7.17234C12.0783 6.42219 11.0609 6.00077 10 6.00077ZM4 10.0008C3.99988 9.05647 4.22264 8.12548 4.65017 7.28351C5.0777 6.44154 5.69792 5.71236 6.4604 5.15529C7.22287 4.59822 8.10606 4.22898 9.03815 4.0776C9.97023 3.92622 10.9249 3.99698 11.8245 4.28412C12.724 4.57126 13.5432 5.06667 14.2152 5.73006C14.8872 6.39346 15.3931 7.2061 15.6919 8.1019C15.9906 8.9977 16.0737 9.95136 15.9343 10.8853C15.795 11.8193 15.4372 12.7072 14.89 13.4768L17.707 16.2938C17.8892 16.4824 17.99 16.735 17.9877 16.9972C17.9854 17.2594 17.8802 17.5102 17.6948 17.6956C17.5094 17.881 17.2586 17.9862 16.9964 17.9884C16.7342 17.9907 16.4816 17.8899 16.293 17.7078L13.477 14.8918C12.5794 15.53 11.5233 15.9089 10.4247 15.9869C9.326 16.0648 8.22707 15.8389 7.2483 15.3337C6.26953 14.8286 5.44869 14.0638 4.87572 13.1231C4.30276 12.1824 3.99979 11.1022 4 10.0008Z"
      fill="#B0BABF"
    />
  </svg>
);

export default function SearchInput() {
  return (
    <div className="relative">
      <SearchIcon className="top-1/2 left-3 absolute w-6 h-6 text-gray-400 transform -translate-y-1/2" />
      <Input
        type="text"
        placeholder="Search"
        className="border-gray-200 focus:border-gray-300 focus:ring-opacity-50 shadow-sm py-2 pr-4 pl-10 rounded-md focus:ring focus:ring-gray-200 placeholder:text-foreground/30"
      />
    </div>
  );
}
