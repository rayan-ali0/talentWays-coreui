import React, { CSSProperties, FC, useEffect, useRef, useState } from "react";
import { useField, useFormikContext } from "formik";
import i18n from "../../i18n";
import deleteIcon from "../../assets/images/delete-file-icon.svg";
import downloadIcon from "../../assets/images/download-file-icon.svg";
import fileGreenTick from "../../assets/images/success-file-icon.svg";
import { IAttachment } from "@moj/common";
import { CustomInputType } from "../../types/types";
import { isFileReadable } from "../../helpers/function-helper";

export interface IFormikFileInputProps {
  type?: CustomInputType;
  label?: string;
  value: string | boolean;
  name: string;
  placeholder?: string;
  required?: boolean;
  onChange?(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  isDisabled?: boolean;
  errorMessage?: string;
  hintText?: string;
  accept?: string;
  labelStyle?: CSSProperties | undefined;
  fileOnRead?: IAttachment | undefined;
  viewMode: boolean | undefined;
  handleRemoveFile?: (id: string) => Promise<void>;
  handleDownloadFile?: () => Promise<void>;
  maxFileSize?: number;
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

export const FormikFileInput: FC<IFormikFileInputProps> = ({
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
  maxFileSize = 5 * 1024 * 1024, // default to 5MB
}) => {
  const [error, setError] = useState<string | undefined>("");
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [newSelectedFile, setNewSelectedFile] = useState<boolean>(false);
  const allowedTypes = accept.split(",").map((type) => type.trim());

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;

      if (!allowedTypes.includes(fileExtension)) {
        setError(i18n.t("Form.FileInput.InvalidFileType"));
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
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
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      if (error) {
        setError(undefined);
      }

      const newFile = {
        data: file,
        fileName: file.name,
      };
      setNewSelectedFile(true);
      setFieldValue(name, [newFile]);
    }
  };

  const handleRemoveFileUi = () => {
    // Clear the form field value and the file input
    setFieldValue(name, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setNewSelectedFile(false); // Reset the new file flag
    setError(undefined); // Clear any errors
  };

  useEffect(() => {
    if (fileOnRead) {
      setFieldValue(name, [
        {
          data: fileOnRead,
          fileName: fileOnRead.name,
        },
      ]);
    }
  }, [fileOnRead]);

  // conditional styles
  const getLabelTextColor = () => {
    return errorMessage && required ? "text-aered-600" : "";
  };

  const getBorderColor = () => {
    if (errorMessage) return "border-aered-400";
    if (isDisabled) return "border-aegold-300 opacity-90";
    return "border-aegold-400";
  };

  const getLabelStyles = () => {
    const baseStyles = `font-medium flex h-full items-center ${isArabic ? "border-l-2" : "border-r-2"} ${
      isDisabled ? " border-aegold-300" : "border-aegold-400"
    } px-4 py-2 text-sm text-aegold-600`;

    if (errorMessage) return `${baseStyles} border-aered-400 bg-aered-100`;
    if (isDisabled) return `${baseStyles} cursor-not-allowed`;
    return `${baseStyles} hover:bg-aegold-200`;
  };

  const getFileDisplayStyles = () => {
    const baseStyles = "flex-1 flex items-center px-4 py-2 text-sm text-aeblack-300";
    if (errorMessage) return `${baseStyles} bg-aered-100`;
    if (isDisabled) return `${baseStyles} bg-aeblack-50 border-aegold-100 cursor-not-allowed`;
    return baseStyles;
  };

  const getContainerStyles = () => {
    const baseStyles = "flex overflow-hidden md:h-full w-full rounded-lg border-2";
    if (isDisabled) return `${baseStyles} ${getBorderColor()} cursor-not-allowed`;
    return `${baseStyles} ${getBorderColor()}`;
  };

  const getInputStyles = () => {
    const baseStyles = "absolute inset-0 h-full w-full opacity-0";
    if (isDisabled) return `${baseStyles} cursor-not-allowed`;
    return `${baseStyles} cursor-pointer`;
  };

  const isArabic = i18n.language.includes("ar");

  return (
    <div className="w-full h-full aegov-form-control">
      <label
        className={`mb-1 block text-sm font-medium leading-6 text-[#232528] ${getLabelTextColor()} ${
          required && "required"
        }`}
      >
        {label}
      </label>
      <div className="relative md:h-12 form-control-input">
        <div className={getContainerStyles()}>
          <label htmlFor={`file-upload-${name}`} className={getLabelStyles()}>
            {i18n.t("Form.FileInput.ChooseFile")}
          </label>
          <div className={getFileDisplayStyles()}>
            {(field.value && field?.value[0].fileName) || i18n.t("Form.FileInput.NoFileChosen")}
          </div>
        </div>
        <input
          id={`file-upload-${name}`}
          type="file"
          key={field.value ? `has-file-${field.value}` : `no-file-${field?.name}`}
          className={getInputStyles()}
          onChange={handleFileChange}
          disabled={isDisabled}
        />
      </div>

      {!field.value && !fileOnRead && (
        <>
          {hintText && <div className="mt-1 text-xs text-aeblack-400">{hintText}</div>}
          <div className="mt-1 text-xs text-aeblack-400">
            {i18n.t("Form.FileInput.MaxFileSize", {
              size: maxFileSize / (1024 * 1024),
            })}
          </div>
        </>
      )}

      {(errorMessage || error) && <p className="text-sm text-aered-500">{errorMessage || error}</p>}
      {field.value && (
        <div className="h-[47px] bg-aegreen-100 mt-[15px] p-[10px] flex justify-between items-center text-[14px] font-normal text-neutral-500 gap-[10px] rounded-md">
          <div className="flex items-center gap-2">
            <img src={fileGreenTick} alt="File icon" />
            <div className="max-md:text-xs max-[639px]:text-[14px]">{field.value[0].fileName}</div>
          </div>
          <div className="flex items-center gap-3">
            {fileOnRead && !newSelectedFile && handleDownloadFile && (
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => {
                  if (handleDownloadFile) {
                    handleDownloadFile();
                  }
                }}
              >
                <img src={downloadIcon} width={17} alt="download icon" />
              </div>
            )}
            {!viewMode && (
              <div
                onClick={() => {
                  if (handleRemoveFile) {
                    handleRemoveFile(field.value[0].data.id);
                  }
                  handleRemoveFileUi();
                }}
                className="flex items-center gap-1 cursor-pointer"
              >
                <img src={deleteIcon} width={17} alt="Delete icon" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
