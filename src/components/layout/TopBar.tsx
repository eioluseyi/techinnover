import SearchInput from "@/components/ui/search-input";
import { formatDate } from "@/lib/utils";

const ArrowLeft = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.9989 11.0002H9.40892L12.7089 7.71019C12.8972 7.52188 13.003 7.26649 13.003 7.00019C13.003 6.73388 12.8972 6.47849 12.7089 6.29019C12.5206 6.10188 12.2652 5.99609 11.9989 5.99609C11.7326 5.99609 11.4772 6.10188 11.2889 6.29019L6.28892 11.2902C6.19788 11.3853 6.12651 11.4974 6.07892 11.6202C5.9789 11.8636 5.9789 12.1367 6.07892 12.3802C6.12651 12.5029 6.19788 12.6151 6.28892 12.7102L11.2889 17.7102C11.3819 17.8039 11.4925 17.8783 11.6143 17.9291C11.7362 17.9798 11.8669 18.006 11.9989 18.006C12.1309 18.006 12.2616 17.9798 12.3835 17.9291C12.5054 17.8783 12.616 17.8039 12.7089 17.7102C12.8026 17.6172 12.877 17.5066 12.9278 17.3848C12.9786 17.2629 13.0047 17.1322 13.0047 17.0002C13.0047 16.8682 12.9786 16.7375 12.9278 16.6156C12.877 16.4937 12.8026 16.3831 12.7089 16.2902L9.40892 13.0002H16.9989C17.2641 13.0002 17.5185 12.8948 17.706 12.7073C17.8936 12.5198 17.9989 12.2654 17.9989 12.0002C17.9989 11.735 17.8936 11.4806 17.706 11.2931C17.5185 11.1055 17.2641 11.0002 16.9989 11.0002Z"
      fill="black"
    />
  </svg>
);

const TopBar = () => (
  <div className="flex flex-wrap justify-between items-center gap-4 lg:gap-10 mb-8">
    <div className="flex justify-between items-center gap-4 max-w-fit">
      <span className="font-semibold text-xl lg:text-3xl whitespace-nowrap">
        {formatDate(new Date())}
      </span>
      <button
        type="button"
        className="lg:inline-block hidden p-2 border rounded-full"
      >
        <ArrowLeft />
      </button>
      <button
        type="button"
        className="lg:inline-block hidden p-2 border rounded-full rotate-180"
      >
        <ArrowLeft />
      </button>
    </div>
    <SearchInput />
  </div>
);

export default TopBar;
