import { DefaultView, FileView } from "@/components/ui/file-input/fragments";
import { calculateFileSize } from "@/components/ui/file-input/utils";
import { clear } from "console";
import { useState, useRef, useEffect, ReactNode } from "react";

type SizeUnits = "b" | "kb" | "mb" | "gb" | "tb";

const FileInput = ({
  id,
  label,
  accept,
  file,
  error,
  maxFileSize,
  maxFileErrorMessage = "File is too large",
  isLoading = false,
  isSuccess = false,
  onMaxFileErrorMessage,
  setFile,
  onUpload,
}: {
  id?: string;
  label?: ReactNode;
  accept?: string;
  file?: any;
  error?: string;
  maxFileSize?: [number, SizeUnits?];
  maxFileErrorMessage?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  onMaxFileErrorMessage?: (err?: any) => void;
  setFile?: (args?: any) => void;
  onUpload?: () => void;
}) => {
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<File[] | FileList | null>(
    file ? [file] : null
  );
  const [showMaxFileErrorMessage, setShowMaxFileErrorMessage] = useState(false);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (evt: { target: { files: any; value: string } }) => {
    setShowMaxFileErrorMessage(false);
    const maxSize = calculateFileSize(maxFileSize);
    const filesize = evt.target.files?.[0]?.size;

    if (maxFileSize?.length && filesize > maxSize) {
      setShowMaxFileErrorMessage(true);
      onMaxFileErrorMessage?.(maxFileErrorMessage);
      evt.target.value = "";
    }

    setFiles(evt.target.files);
  };

  const handleDelete = () => {
    const element = fileInput.current;
    if (!element) return;

    element.value = "";
    setFiles(null);
    setProgress(0);
  };

  useEffect(() => {
    const element = fileInput.current;
    if (!element || !files) return;

    const dataTransfer = new DataTransfer();

    Array.from(files)?.forEach((itm: File) => {
      if (itm.name) dataTransfer?.items?.add(itm);
    });

    element.files = dataTransfer.files;
  }, [files]);

  useEffect(() => {
    setFile?.(files?.[0]);

    if (!files?.[0]) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const random = Math.random();
        const amount = prev + random * 10;

        if (amount >= 100) {
          clearInterval(interval);
          return 100;
        }

        return amount;
      });
    }, 100);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  useEffect(() => {
    setFiles(file ? [file] : null);
  }, [file]);

  return (
    <div>
      {label && (
        <span className="block mb-3 font-medium text-[#101828] text-sm">
          {label}
        </span>
      )}
      <div className="relative grid border rounded-lg min-h-32">
        <input
          id={id}
          type="file"
          ref={fileInput}
          accept={accept}
          onChange={handleFileChange}
          className="opacity-0 w-full h-full cursor-pointer"
        />
        <div className="absolute inset-0 pointer-events-none">
          {(() => {
            if (files?.length)
              return (
                <FileView
                  file={files?.[0]}
                  handleDelete={handleDelete}
                  onUpload={onUpload}
                  isLoading={isLoading}
                  isSuccess={isSuccess}
                  progress={progress}
                />
              );
            return <DefaultView />;
          })()}
        </div>
      </div>
      {(showMaxFileErrorMessage || error) && (
        <div
          role="alert"
          className="flex items-center gap-1 mt-2 sm:mt-2.5 text-[#FF1313] text-xs"
        >
          <div className="mt-1">
            <p>{maxFileErrorMessage || error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileInput;
