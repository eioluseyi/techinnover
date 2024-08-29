import { formatFileSize } from "@/components/ui/file-input/utils";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";

const TrashIcon = ({ className = "" }) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10.5 13H12.1667M12.1667 13H25.5M12.1667 13V24.6666C12.1667 25.1087 12.3423 25.5326 12.6548 25.8451C12.9674 26.1577 13.3913 26.3333 13.8333 26.3333H22.1667C22.6087 26.3333 23.0326 26.1577 23.3452 25.8451C23.6577 25.5326 23.8333 25.1087 23.8333 24.6666V13H12.1667ZM14.6667 13V11.3333C14.6667 10.8913 14.8423 10.4673 15.1548 10.1548C15.4674 9.84222 15.8913 9.66663 16.3333 9.66663H19.6667C20.1087 9.66663 20.5326 9.84222 20.8452 10.1548C21.1577 10.4673 21.3333 10.8913 21.3333 11.3333V13M16.3333 17.1666V22.1666M19.6667 17.1666V22.1666"
      stroke="#667085"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UploadCloud = ({ className = "" }) => (
  <svg
    width="47"
    height="46"
    viewBox="0 0 47 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="3.5" y="3" width="40" height="40" rx="20" fill="#F2F4F7" />
    <rect
      x="3.5"
      y="3"
      width="40"
      height="40"
      rx="20"
      stroke="#F9FAFB"
      strokeWidth="6"
    />
    <g clipPath="url(#clip0_215_556)">
      <path
        d="M26.8335 26.3334L23.5002 23M23.5002 23L20.1669 26.3334M23.5002 23V30.5M30.4919 28.325C31.3047 27.8819 31.9467 27.1808 32.3168 26.3322C32.6868 25.4837 32.7637 24.5361 32.5354 23.6389C32.307 22.7418 31.7865 21.9463 31.0558 21.3779C30.3251 20.8095 29.4259 20.5006 28.5002 20.5H27.4502C27.198 19.5244 26.7278 18.6186 26.0752 17.8509C25.4225 17.0831 24.6042 16.4732 23.682 16.0672C22.7597 15.6612 21.7573 15.4695 20.7503 15.5066C19.7433 15.5437 18.7578 15.8086 17.8679 16.2814C16.9779 16.7542 16.2068 17.4226 15.6124 18.2363C15.018 19.0501 14.6158 19.988 14.436 20.9795C14.2563 21.9711 14.3036 22.9905 14.5746 23.9611C14.8455 24.9317 15.3329 25.8282 16.0002 26.5834"
        stroke="#475467"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_215_556">
        <rect
          width="20"
          height="20"
          fill="white"
          transform="translate(13.5 13)"
        />
      </clipPath>
    </defs>
  </svg>
);

export const DefaultView = () => (
  <div className="place-content-center gap-3 grid p-4 h-full text-center text-sm">
    <UploadCloud className="mx-auto" />
    <p>
      <span className="font-medium text-primary">Click to upload</span> or drag
      and drop
      <br />
      PNG or JPG
    </p>
  </div>
);

export const FileFormat = ({
  format,
  className,
}: {
  format: string;
  className?: string;
}) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_11722_25181)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 0C2.44772 0 2 0.447716 2 1V23C2 23.5523 2.44772 24 3 24H21C21.5523 24 22 23.5523 22 23V4L18 0H3Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 0V4H22L18 0Z"
        fill="#D0D5DD"
      />
    </g>
    <rect x="1" y="10" width="22" height="10" rx="1" fill="#1671D9" />
    <text
      x="3"
      y="17.5"
      fill="white"
      fontSize={"8"}
      fontWeight={900}
      textLength={"73%"}
    >
      {(format || "").toUpperCase()}
    </text>
    <defs>
      <clipPath id="clip0_11722_25181">
        <rect width="20" height="24" fill="white" transform="translate(2)" />
      </clipPath>
    </defs>
  </svg>
);

export const FileView = ({
  file = { name: "", size: 0 } as File,
  handleDelete = () => {},
  onUpload = () => {},
  progress = 0,
  isLoading = false,
  isSuccess: successValue = false,
}) => {
  const [fileWarning, setFileWarning] = useState(false);
  const currentFile = file;
  const name = currentFile?.name || "";
  const size = formatFileSize(currentFile?.size || 0);
  const isRemoteFile = Boolean(currentFile.webkitRelativePath);
  const isSuccess = Boolean(successValue || isRemoteFile);
  const isUploading = progress > 0 && !isSuccess;

  const src = useMemo(() => {
    if (!currentFile) return "";
    if (isRemoteFile) return currentFile.webkitRelativePath;

    return URL.createObjectURL(currentFile as File);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFile.name]);

  type PreviewComponentProps = {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    href?: string;
    target?: string;
    rel?: string;
  };

  const PreviewComponent = ({
    children,
    href,
    target,
    ...props
  }: PreviewComponentProps) => (
    <Link
      href={href || "#"}
      target={target}
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </Link>
  );

  return (
    <div className="relative flex items-center px-4 py-5 h-full">
      <PreviewComponent
        className={cn(
          "relative flex-1 place-items-center grid bg-[#F1F3F6] !pointer-events-auto bg-cover bg-no-repeat bg-center rounded-lg h-full",
          src && "bg-black"
        )}
        style={{
          backgroundImage: `url('${src}')`,
        }}
        href={src}
        target="_blank"
      />
      <div className="flex flex-1 justify-between items-center gap-2 pl-4 font-medium text-sm">
        <div className="flex-1">
          <div className="line-clamp-2 font-medium text-[#344054]">{name}</div>
          {currentFile?.size ? (
            <div className="font-normal text-[#667085]">{size}</div>
          ) : null}
          <div className="flex items-center gap-1">
            <Progress className="flex-1 h-3" value={progress} />
            <span className="text-right w-[3.25rem]">
              {Number(progress).toFixed(1)}%
            </span>
          </div>
        </div>
        <button
          className="bg-background grid place-content-center [&_*]:transition-all [&:hover_*]:text-primary [&:hover>*]:scale-110 !pointer-events-auto"
          type="button"
          onClick={handleDelete}
        >
          <TrashIcon className="-mr-2 text-foreground" />
        </button>
      </div>
    </div>
  );
};
