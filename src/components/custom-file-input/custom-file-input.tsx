import React, { CSSProperties, FC, useEffect, useRef, useState } from "react";
import i18n from "../../i18n";
import deleteIcon from "../../assets/images/delete-file-icon.svg";
import downloadIcon from "../../assets/images/download-file-icon.svg";
import fileGreenTick from "../../assets/images/success-file-icon.svg";
import { IAttachment } from "@moj/common";
import { AppInitializerContext, AppInitializerProvider } from "../../context/initializer-context";
import { isFileReadable } from "../../helpers/function-helper";

export interface ICustomFileInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (fileData: { data: File; fileName: string }[] | null) => void;
  isDisabled?: boolean;
  errorMessage?: string;
  hintText?: string;
  accept?: string;
  labelStyle?: CSSProperties;
  fileOnRead?: IAttachment;
  viewMode?: boolean;
  handleRemoveFile?: (id: string) => Promise<void>;
  handleDownloadFile?: () => Promise<void>;
  maxFileSize?: number;
  isArabic: boolean;
}

/**
 * CustomFileInput Component
 *
 * A customizable file input component that allows users to upload or select files.
 * Supports optional labels, error messages, file previews, and callbacks for file removal or download.
 *
 * @component
 * @param {CustomInputType} [type] - The type of the custom input, e.g., text, password, or file input type.
 * @param {string} [label] - Optional label displayed alongside the input field to describe its purpose.
 * @param {string | boolean} value - The value of the input, which can be a string (e.g., file path) or boolean (e.g., checked state for a checkbox).
 * @param {string} name - The name attribute for the input element, used for form submissions.
 * @param {string} [placeholder] - Optional placeholder text displayed inside the input when it is empty.
 * @param {boolean} [required] - If `true`, the input is marked as required, indicating that the user must fill it before submitting the form.
 * @param {(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void} [onChange] - Optional callback triggered when the input value changes.
 * @param {boolean} [isDisabled] - If `true`, the input field is disabled and cannot be interacted with.
 * @param {string} [errorMessage] - Optional error message displayed when the input is invalid or has issues.
 * @param {string} [hintText] - Optional hint text displayed to provide additional guidance or context for the input.
 * @param {string} [accept] - Optional MIME types to filter the file selection options (e.g., `"image/*"` or `"application/pdf"`).
 * @param {CSSProperties} [labelStyle] - Optional custom CSS styles to apply to the label element.
 * @param {IAttachment} fileOnRead - A file attachment that should be displayed when the input is in view mode.
 * @param {boolean} viewMode - If `true`, the component is in view mode, showing a preview of the file instead of the file input field.
 * @param {(id: string) => Promise<void>} [handleRemoveFile] - Optional callback triggered when the file is removed, receiving the file's ID as an argument.
 * @param {() => Promise<void>} [handleDownloadFile] - Optional callback triggered when the file is downloaded.
 * @param {number} [maxFileSize] - Optional maximum allowed file size
 * @returns {JSX.Element} The rendered file input component.
 */

export const CustomFileInput: FC<ICustomFileInputProps> = ({
  label,
  name,
  required,
  hintText,
  isDisabled,
  errorMessage,
  labelStyle,
  accept = ".jpg,.jpeg,.doc,.docx,.pdf",
  fileOnRead,
  viewMode = false,
  handleRemoveFile,
  handleDownloadFile,
  maxFileSize = 5 * 1024 * 1024,
  onChange,
  isArabic,
}) => {
  const [error, setError] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileValue, setFileValue] = useState<{ data: File | IAttachment; fileName: string }[] | null>(null);
  const [newSelectedFile, setNewSelectedFile] = useState<boolean>(false);

  const allowedTypes = accept.split(",").map((type) => type.trim());

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;


      if (!allowedTypes.includes(fileExtension)) {
        setError(i18n.t("Form.FileInput.InvalidFileType"));
        fileInputRef.current!.value = "";
        return;
      }

      if (fileExtension === ".pdf" || fileExtension === ".doc" || fileExtension === ".docx") {
        const isReadable = await isFileReadable(file);
        if (!isReadable) {
          setError(i18n.t("Form.FileInput.FileNotReadable"));
          if (fileInputRef.current) fileInputRef.current.value = "";
          return;
        }
      }

      if (file.size > maxFileSize) {
        setError(i18n.t("Form.FileInput.MaxFileSizeError", { maxSize: maxFileSize / (1024 * 1024) }));
        fileInputRef.current!.value = "";
        return;
      }

      const fileData = [{ data: file, fileName: file.name }];
      setFileValue(fileData);
      setNewSelectedFile(true);
      setError(undefined);
      onChange?.(fileData);
    }
  };

  const handleRemoveFileUi = () => {
    setFileValue(null);
    fileInputRef.current!.value = "";
    setNewSelectedFile(false);
    setError(undefined);
    onChange?.(null);
  };

  useEffect(() => {
    if (fileOnRead) {
      const readFile = {
        data: fileOnRead,
        fileName: fileOnRead.name,
      };
      setFileValue([readFile]);
    }
  }, [fileOnRead]);

  const getBorderColor = () => {
    if (errorMessage) return "border-aered-400";
    if (isDisabled) return "border-aegold-300 opacity-90";
    return "border-aegold-400";
  };

  const getLabelStyles = () => {
    const base = `font-medium flex h-full items-center ${isArabic ? "border-l-2" : "border-r-2"} ${
      isDisabled ? " border-aegold-300" : "border-aegold-400"
    } px-4 py-2 text-sm text-aegold-600`;

    if (errorMessage) return `${base} border-aered-400 bg-aered-100`;
    if (isDisabled) return `${base} cursor-not-allowed`;
    return `${base} hover:bg-aegold-200`;
  };

  const getFileDisplayStyles = () => {
    const base = "flex-1 flex items-center px-4 py-2 text-sm text-aeblack-300";
    if (errorMessage) return `${base} bg-aered-100`;
    if (isDisabled) return `${base} bg-aeblack-50 border-aegold-100 cursor-not-allowed`;
    return base;
  };

  const getInputStyles = () => {
    const base = "absolute inset-0 h-full w-full opacity-0";
    return `${base} ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`;
  };

  return (
    <AppInitializerProvider containerId="custom-file-input" preferredLanguage={isArabic ? "ar" : "en"}>
      <div className="w-full h-full aegov-form-control">
        {label && (
          <label
            style={labelStyle}
            className={`mb-1 block text-sm font-medium leading-6 text-[#232528] ${
              errorMessage ? "text-aered-600" : ""
            } ${required ? "required" : ""}`}
          >
            {label}
          </label>
        )}

        <div className="relative md:h-12 form-control-input">
          <div className={`flex overflow-hidden md:h-full w-full rounded-lg border-2 ${getBorderColor()}`}>
            <label htmlFor={`file-upload-${name}`} className={getLabelStyles()}>
              {i18n.t("Form.FileInput.ChooseFile")}
            </label>
            <div className={getFileDisplayStyles()}>
              {(fileValue && fileValue[0]?.fileName) || i18n.t("Form.FileInput.NoFileChosen")}
            </div>
          </div>
          <input
            id={`file-upload-${name}`}
            type="file"
            className={getInputStyles()}
            onChange={handleFileChange}
            ref={fileInputRef}
            disabled={isDisabled}
            accept={accept}
          />
        </div>

        {!fileValue && !fileOnRead && (
          <>
            {hintText && <div className="mt-1 text-xs text-aeblack-400">{hintText}</div>}

            <div className="mt-1 text-xs text-aeblack-400">
              {i18n.t("Form.FileInput.MaxFileSize", { size: maxFileSize / (1024 * 1024) })}
            </div>
          </>
        )}

        {(error || errorMessage) && <p className="text-sm text-aered-500">{error || errorMessage}</p>}

        {fileValue && (
          <div className="h-[47px] bg-aegreen-100 mt-[15px] p-[10px] flex justify-between items-center text-[14px] font-normal text-neutral-500 gap-[10px] rounded-md">
            <div className="flex items-center gap-2">
              <img src={fileGreenTick} alt="File icon" />
              <div className="max-md:text-xs max-[639px]:text-[14px]">{fileValue[0].fileName}</div>
            </div>
            <div className="flex items-center gap-3">
              {fileOnRead && !newSelectedFile && handleDownloadFile && (
                <div className="flex items-center gap-1 cursor-pointer" onClick={handleDownloadFile}>
                  <img src={downloadIcon} width={17} alt="download icon" />
                </div>
              )}
              {!viewMode && (
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => {
                    if (handleRemoveFile && fileValue[0].data && "id" in fileValue[0].data) {
                      handleRemoveFile(fileValue[0].data.id);
                    }
                    handleRemoveFileUi();
                  }}
                >
                  <img src={deleteIcon} width={17} alt="delete icon" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AppInitializerProvider>
  );
};
