import React, { FC } from "react";

export interface ICustomTextAreaProps {
  label?: string;
  name?: string;
  register?: any;
  error?: any;
  isArabic?: boolean;
  required?: boolean;
  maxAllowedCharacters?: number;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string | number | readonly string[] | undefined;
  [prop: string]: any;
}

/**
 * CustomTextArea Component
 *
 * A custom text area component for collecting multi-line text input from users.
 * It supports optional label, error handling, and additional properties via the register prop (typically used with form libraries like React Hook Form).
 *
 * @component
 * @param {string} [label] - The label to display for the text area.
 * @param {string} [name] - The name of the text area, used for form data binding.
 * @param {any} [register] - Optional property used for integrating with form libraries (e.g., React Hook Form).
 * @param {any} [error] - Optional error message, if validation fails.
 * @param {number} [maxAllowedCharacters] - Optional maximum number of characters allowed in the text area.
 * @param {boolean} [required] - Optional boolean indicating if the text area is required.
 * @param {boolean} [isArabic] - Optional boolean indicating if the text direction should be right-to-left.
 * @param {function} [onChange] - Optional callback function that is called when the text area's value changes.
 * @param {string | number | readonly string[] | undefined} [value] - The value of the text area.
 * @param {object} [prop] - Any additional props that will be spread onto the text area element.
 * @returns {JSX.Element} The rendered text area with the provided label and other props.
 */
export const CustomTextArea: FC<ICustomTextAreaProps> = function _CustomTextArea({
  label,
  name,
  register,
  error,
  maxAllowedCharacters,
  required,
  isArabic,
  value,
  onChange,
  ...props
}) {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;

    if (maxAllowedCharacters && inputText.length <= maxAllowedCharacters) {
      if (register) {
        register(name).onChange(e);
      }
      if (onChange) {
        onChange(e);
      }
    } else if (!maxAllowedCharacters) {
      if (register) {
        register(name).onChange(e);
      }
      if (onChange) {
        onChange(e);
      }
    }
  };

  return (
    <div
      className={
        error ? "aegov-form-control max-md:control-sm control-error" : "aegov-form-control max-md:control-sm"
      }
    >
      {label && <label htmlFor={name} className={required && label ? "required" : ""}>{label}</label>}
      <div className="relative form-control-input">
        {register ? (
          <textarea
            id={name}
            wrap="soft"
            className="resize-none"
            {...props}
            value={value}
            rows={props?.rows || 3}
            onChange={handleTextChange}
          />
        ) : (
          <textarea
            id={name}
            wrap="soft"
            className="resize-none"
            {...props}
            value={value}
            rows={props?.rows || 3}
            onChange={handleTextChange}
          />
        )}
        {maxAllowedCharacters !== undefined && (
          <div className={`absolute bottom-2 text-xs text-aeblack-400 ${isArabic ? "left-3" : "right-3"}`}>
            {(value as string)?.length || 0}/{maxAllowedCharacters}
          </div>
        )}
      </div>
      {error && error.message && <div className="text-start text-red-500">{error.message}</div>}
      {error && !error.message && <p className="error-message !m-0 text-red-500">{error}</p>}
    </div>
  );
};
