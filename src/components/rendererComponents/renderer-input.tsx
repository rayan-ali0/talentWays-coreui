import React, { type CSSProperties, type FC } from "react";
// import writtenNumber from "written-number";
import { CustomInputType } from "../../types/types";
import searchIcon from "../../assets/images/search.svg";
// import i18n from "../../../i18n";
// import { CustomTextArea } from "../../custom-text-area/custom-text-area";
// import { CustomTooltip } from "../../custom-tooltip/custom-tooltip";
// import { CustomIdentityInput } from "../custom-input/custom-identity-input";

export interface IRendererInputProps {
  type?: CustomInputType;
  label?: string;
  value: string | boolean | number;
  placeholder?: string;
  required?: boolean;
  checked?: boolean;
  min?: number;
  max?: number;
  step?: number;
  row?: number;
  downLabel?: string;
  onChange?(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  isDisabled?: boolean;
  errorMessage?: string;
  className?: string;
  name: string;
  labelStyle?: CSSProperties | undefined;
  margins?: string;
  minDate?: Date | string | undefined;
  maxDate?: Date | string | undefined;
  maxLength?: number;
  minLength?: number;
  hintText?: string;
  relatedFieldValue?: string | number;
  maxAllowedCharacters: number | undefined;
  isArabic?: boolean;
}

/**
 * `RendererInput` is a customizable input component for handling various input types such as text, number, date, and more.
 *
 * @param {CustomInputType} [type] - The type of the input (e.g., text, number, date).
 * @param {string} [label] - The label associated with the input field.
 * @param {string | boolean | number} value - The current value of the input.
 * @param {string} [placeholder] - Placeholder text for the input field.
 * @param {boolean} [required] - Indicates whether the input is required.
 * @param {boolean} [checked] - Determines if the input (checkbox or radio) is selected.
 * @param {number} [min] - Minimum value for numeric inputs.
 * @param {number} [max] - Maximum value for numeric inputs.
 * @param {number} [step] - Step value for numeric inputs.
 * @param {number} [row] - Number of rows for textarea input.
 * @param {string} [downLabel] - A secondary label displayed below the main label.
 * @param {function} [onChange] - The callback function triggered when the input value changes.
 * @param {boolean} [isDisabled] - Whether the input is disabled.
 * @param {string} [errorMessage] - Error message to display if validation fails.
 * @param {string} [className] - Additional CSS class for custom styling.
 * @param {string} name - The name of the input field (used for form submission).
 * @param {CSSProperties} [labelStyle] - Custom styles for the label.
 * @param {string} [margins] - Custom margin for the input field.
 * @param {Date | string} [minDate] - The minimum date allowed for date inputs.
 * @param {Date | string} [maxDate] - The maximum date allowed for date inputs.
 * @param {number} [maxLength] - Maximum number of characters allowed for text inputs.
 * @param {number} [minLength] - Minimum number of characters required for text inputs.
 * @param {string} [hintText] - A hint text to be shown to the user.
 * @param {string} [relatedFieldValue] - The related other field value if any required when NumberToText type is used
 *
 * @returns {JSX.Element} The rendered input element with various customizable properties.
 */

export const RendererInput: FC<IRendererInputProps> = function _RendererInput({
  type = CustomInputType.Text,
  label = "",
  placeholder = "",
  name,
  required = false,
  errorMessage,
  isDisabled = false,
  value,
  onChange,
  min,
  max,
  step = 1,
  row,
  checked,
  className,
  labelStyle,
  margins,
  minDate,
  maxDate,
  maxLength,
  minLength,
  hintText,
  relatedFieldValue,
  isArabic,
  maxAllowedCharacters,
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) {
      if (type === CustomInputType.Checkbox) {
        const customEvent = {
          ...event,
          target: {
            ...event.target,
            name,
            value: (event.target as any)?.checked,
          },
        };
        onChange(customEvent);
      } else if (type === CustomInputType.IDENITITY) {
        let input = event?.target?.value?.replace(/\D/g, ""); // only numerical values allowed

        if (input?.length > 15) {
          input = input.slice(0, 15);
        }

        // Add the dashes to format as 000-0000-0000000-0
        let formattedValue = input;
        if (input.length > 3 && input.length <= 7) {
          formattedValue = `${input.slice(0, 3)}-${input.slice(3)}`;
        } else if (input.length > 7 && input.length <= 14) {
          formattedValue = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7)}`;
        } else if (input.length > 14) {
          formattedValue = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7, 14)}-${input.slice(14, 15)}`;
        }

        const customEvent = {
          ...event,
          target: {
            ...event.target,
            name,
            value: formattedValue,
          },
        };
        onChange(customEvent);
      } else if (type === CustomInputType.PhoneNumber) {
        let input = event?.target?.value;

        input = input.replace(/[\u200E\u200F]/g, "");

        // Remove all non-numerical characters except '+' (to preserve the country code)
        input = input.replace(/[^0-9+]/g, "");

        if (!input.startsWith("+971")) {
          input = "+971" + input;
        }

        let digits = input.slice(4).replace(/\D/g, "");

        if (digits.length > 9) {
          digits = digits.slice(0, 9);
        }

        // Format the digits as 'xx xxx xxxx'
        let formattedValue = "+971 ";
        if (digits.length > 0) {
          formattedValue += digits.slice(0, 2);
        }
        if (digits.length > 2) {
          formattedValue += " " + digits.slice(2, 5);
        }
        if (digits.length > 5) {
          formattedValue += " " + digits.slice(5);
        }

        // Add Unicode control characters for RTL/LTR handling
        formattedValue = `‎${formattedValue}‏`;

        const customEvent = {
          ...event,
          target: {
            ...event.target,
            name,
            value: formattedValue,
          },
        };
        onChange(customEvent);
      } else if (type === CustomInputType.Year) {
        const newValue = event.target.value;
        if (/^\d{0,4}$/.test(newValue)) {
          onChange(event);
        }
      } else if (type === CustomInputType.TextOnly) {
        const input = event?.target?.value?.replace(/[^a-zA-Z\u0600-\u06FF\s]/g, "")?.replace(/\s+/g, " ");
        const customEvent = {
          ...event,
          target: {
            ...event.target,
            name,
            value: input,
          },
        };

        onChange(customEvent);
      } else if (type === CustomInputType.TextArea) {
        const input = event?.target?.value?.trimStart()?.replace(/\s{2,}/g, " ");
        const customEvent = {
          ...event,
          target: {
            ...event.target,
            name,
            value: input,
          },
        };

        onChange(customEvent);
      } else {
        onChange(event);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === CustomInputType.PhoneNumber && event.key === "Backspace") {
      event.preventDefault();
      handleDeleteDigit();
    }
  };

  const handleDeleteDigit = () => {
    let input = value as string;
    let formattedValue = "+971 ";
    if (onChange) {
      input = input.replace(/[\u200E\u200F]/g, "");

      let digits = input.slice(4).replace(/\D/g, "");

      if (digits.length > 0) {
        digits = digits.slice(0, -1);
      }

      if (digits.length === 0) {
        formattedValue = "";
        onChange({
          target: { name, value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
        return;
      }

      if (digits.length > 9) {
        digits = digits.slice(0, 9);
      }

      // Format phone number as 'xx xxx xxxx'
      if (digits.length > 0) formattedValue += digits.slice(0, 2);
      if (digits.length > 2) formattedValue += " " + digits.slice(2, 5);
      if (digits.length > 5) formattedValue += " " + digits.slice(5);

      formattedValue = `‎${formattedValue}‏`;

      onChange({
        target: { name, value: formattedValue },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  switch (type) {
    case CustomInputType.Search:
      return (
        <div className="aegov-form-control max-md:control-sm">
          <label style={{ ...labelStyle }} htmlFor="search_prefix">
            {label}
          </label>
          <div className="form-control-input">
            <span className="control-prefix">
              <img src={searchIcon} alt="search icon" />
            </span>
            <input
              type="search"
              name={name}
              id="search_prefix"
              value={value as string}
              onChange={handleChange}
              placeholder={placeholder}
              className={`rounded-md disabled:placeholder:text-aeblack-900 ${className ? className : ""}`}
            />
          </div>
        </div>
      );
    case CustomInputType.Date:
      return (
        <div
          className={
            errorMessage
              ? "aegov-form-control max-md:control-sm control-error !m-0"
              : "aegov-form-control max-md:control-sm"
          }
        >
          <label style={{ ...labelStyle }} className={`${required && label ? "required " : ""}`}>
            {label}
          </label>
          <div className={`form-control-input ${margins && margins}`}>
            <input
              type="date"
              name={name}
              value={value as string}
              disabled={isDisabled}
              placeholder={placeholder}
              onChange={handleChange}
              min={minDate ? minDate.toString() : undefined}
              max={maxDate ? maxDate.toString() : undefined}
              className={`disabled:placeholder:text-aeblack-900`}
            />
          </div>
          {errorMessage && <p className="error-message !m-0">{errorMessage}</p>}
        </div>
      );
    case CustomInputType.DateAndTime:
      return (
        <div
          className={
            errorMessage
              ? "aegov-form-control max-md:control-sm control-error !m-0"
              : "aegov-form-control max-md:control-sm"
          }
        >
          <label style={{ ...labelStyle }} className={required && label ? "required" : ""}>
            {label}
          </label>
          <div className="form-control-input">
            <input
              type="datetime-local"
              value={value as string}
              name={name}
              placeholder={placeholder}
              onChange={handleChange}
              min={minDate ? minDate.toString() : undefined}
              max={maxDate ? maxDate.toString() : undefined}
              className={`disabled:placeholder:text-aeblack-900`}
            />
          </div>
          {errorMessage && <p className="error-message !m-0">{errorMessage}</p>}
        </div>
      );
    case CustomInputType.Year:
      return (
        <div
          className={
            errorMessage
              ? "aegov-form-control max-md:control-sm control-error !m-0"
              : "aegov-form-control max-md:control-sm"
          }
        >
          <label style={{ ...labelStyle }} className={`${required && label ? "required " : ""}`}>
            {label}
          </label>
          <div className={`form-control-input ${margins && margins}`}>
            <input
              type="number"
              name={name}
              value={value as string}
              disabled={isDisabled}
              placeholder={placeholder}
              onChange={handleChange}
              min={minDate ? (minDate as Date)?.getFullYear() : undefined}
              max={maxDate ? (maxDate as Date)?.getFullYear() : undefined}
              className={`disabled:placeholder:text-aeblack-900`}
            />
          </div>
          {errorMessage && <p className="error-message !m-0">{errorMessage}</p>}
        </div>
      );
    case CustomInputType.Number:
      return (
        <div
          className={
            errorMessage
              ? "aegov-form-control max-md:control-sm control-error !m-0"
              : "aegov-form-control max-md:control-sm"
          }
        >
          {label && (
            <label style={{ ...labelStyle }} className={required && label ? "required" : ""}>
              {label}
            </label>
          )}
          <div className={`${className ? "" : "form-control-input"}`}>
            <input
              value={value as string}
              name={name}
              disabled={isDisabled}
              type="number"
              onKeyDown={(e) => {
                if (["-", "+", "e"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              className={
                className
                  ? `${className} disabled:placeholder:text-aeblack-900`
                  : "disabled:placeholder:text-aeblack-900"
              }
              step={step}
              placeholder={placeholder}
              onChange={handleChange}
            />
          </div>
          {errorMessage && <p className="error-message !m-0">{errorMessage}</p>}
        </div>
      );
    // case CustomInputType.TextArea:
    //   return (
    //     <CustomTextArea
    //       maxLength={maxLength}
    //       value={value as string}
    //       label={label}
    //       required={required}
    //       rows={row}
    //       name={name}
    //       disabled={isDisabled}
    //       placeholder={placeholder}
    //       onChange={handleChange}
    //       maxAllowedCharacters={maxAllowedCharacters}
    //       error={errorMessage}
    //       isArabic={isArabic}
    //       className={`disabled:placeholder:text-aeblack-900`}
    //     />
    //   );
    case CustomInputType.Password:
      return (
        <div
          className={
            errorMessage
              ? "aegov-form-control max-md:control-sm control-error !m-0"
              : "aegov-form-control max-md:control-sm"
          }
        >
          <label style={{ ...labelStyle }} className={required && label ? "required" : ""}>
            {label}
          </label>
          <div className="form-control-input">
            <input
              type="password"
              value={value as string}
              name={name}
              placeholder={placeholder}
              onChange={handleChange}
              className={`disabled:placeholder:text-aeblack-900`}
            />
          </div>
          {errorMessage && <p className="error-message !m-0">{errorMessage}</p>}
        </div>
      );
    case CustomInputType.Email:
      return (
        <div
          className={
            errorMessage ? "aegov-form-control max-md:control-sm control-error" : "aegov-form-control max-md:control-sm"
          }
        >
          <label style={{ ...labelStyle }} className={required && label ? "required" : ""}>
            {label}
          </label>
          <div className="form-control-input">
            <input
              type="text"
              disabled={isDisabled}
              value={value as string}
              name={name}
              placeholder={placeholder}
              onChange={handleChange}
              className={`disabled:placeholder:text-aeblack-900`}
            />
          </div>
          {errorMessage && <p className="error-message !m-0">{errorMessage}</p>}
        </div>
      );

    case CustomInputType.Checkbox:
      return (
        <div
          className={
            errorMessage ? "aegov-form-control max-md:control-sm control-error" : "aegov-form-control max-md:control-sm"
          }
        >
          <div className="flex items-center aegov-check-item">
            <input
              checked={value as boolean}
              type="checkbox"
              // value={value}
              name={name}
              onChange={handleChange}
              disabled={isDisabled}
            />
            <label style={{ ...labelStyle }} className={required && label ? "required mt-1" : ""} htmlFor={name}>
              {label}
            </label>
            {errorMessage && <p className="error-message !m-0">{errorMessage}</p>}
          </div>
        </div>
      );
    case CustomInputType.RadioButton:
      return (
        <div className="aegov-check-item">
          <input
            disabled={isDisabled}
            checked={checked}
            type="radio"
            name={name}
            value={String(value)}
            className="cursor-pointer"
            onChange={handleChange}
          />
          <label style={{ ...labelStyle }} className="text-[14px] text-aeblack-600">
            {label}
          </label>
        </div>
      );
    case CustomInputType.IBAN:
      return (
        <div
          className={
            errorMessage ? "aegov-form-control max-md:control-sm control-error" : "aegov-form-control max-md:control-sm"
          }
        >
          <label style={{ ...labelStyle }} className={required ? "required" : ""}>
            {label}
          </label>
          <div className="form-control-input">
            <input
              type="text"
              value={value as string}
              disabled={isDisabled}
              name={name}
              placeholder={placeholder}
              onChange={handleChange}
              className={`rounded-md disabled:placeholder:text-aeblack-900 ${className ? className : ""}`}
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      );
    // case CustomInputType.IDENITITY:
    //   return (
    //     <CustomIdentityInput
    //         label={label}
    //         name={name}
    //         error={errorMessage}
    //         value={value as string}
    //         onChange={handleChange}
    //         required={required}
    //         isDisabled={isDisabled}
    //         placeholder={placeholder || "000-0000-0000000-0"}
    //         className={className || ""}
    //         labelStyle={labelStyle}
    //         isArabic={isArabic}
    //         tooltipText={i18n.t("Form.Validation.InformativeMessage")}
    //     />
    //   );

    case CustomInputType.TextOnly:
      return (
        <div
          className={
            errorMessage ? "aegov-form-control max-md:control-sm control-error" : "aegov-form-control max-md:control-sm"
          }
        >
          <label style={{ ...labelStyle }} className={required ? "required" : ""}>
            {label}
          </label>
          <div className="form-control-input">
            <input
              type="text"
              maxLength={maxLength}
              value={value as string}
              name={name}
              placeholder={placeholder}
              onChange={handleChange}
              disabled={isDisabled}
              className={`rounded-md disabled:placeholder:text-aeblack-900 ${className ? className : ""}`}
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      );
    case CustomInputType.PhoneNumber:
      return (
        <div
          className={
            errorMessage ? "aegov-form-control max-md:control-sm control-error" : "aegov-form-control max-md:control-sm"
          }
        >
          <label style={{ ...labelStyle }} className={required ? "required" : ""}>
            {label}
          </label>
          <div>
            <div className="form-control-input">
              <input
                type="text"
                value={value ? `${"\u200E"}${value.toString().replace(/[\u200E\u200F]/g, "")}${"\u200F"}` : ""}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={isDisabled}
                className={`rounded-md disabled:placeholder:text-aeblack-900 ${className ? className : ""}`}
              />
            </div>
            {hintText && !value && <div className="mt-1 text-xs text-aeblack-900">{hintText}</div>}
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      );
    // case CustomInputType.NumberToText: {
    //   writtenNumber.defaults.lang = i18n.language;

    //   const getWrittenNumber = () => {
    //     if (relatedFieldValue) {
    //       const num = parseInt(relatedFieldValue as string, 10);
    //       if (isNaN(num)) {
    //         return "";
    //       }
    //       return writtenNumber(num);
    //     }
    //     return "";
    //   };

    //   return (
    //     <div
    //       className={
    //         errorMessage ? "aegov-form-control max-md:control-sm control-error" : "aegov-form-control max-md:control-sm"
    //       }
    //     >
    //       <label style={{ ...labelStyle }} className={required ? "required" : ""}>
    //         {label}
    //       </label>
    //       <div className="form-control-input">
    //         <input
    //           type="text"
    //           value={getWrittenNumber() as string}
    //           name={name}
    //           placeholder={placeholder}
    //           // onChange={handleChange}
    //           className={`rounded-md disabled:placeholder:text-aeblack-900 ${className ? className : ""}`}
    //         />
    //       </div>
    //       {errorMessage && <p className="error-message">{errorMessage}</p>}
    //     </div>
    //   );
    // }
    default:
      return (
        <div
          className={
            errorMessage
              ? "aegov-form-control max-md:control-sm control-error relative !m-0"
              : "aegov-form-control max-md:control-sm"
          }
        >
          <label style={{ ...labelStyle }} className={`${required && label ? "required " : ""}`}>
            {label}
          </label>
          <div className={`${className ? "" : "form-control-input"} ${margins && margins}`}>
            <input
              type={type}
              name={name}
              value={value as string}
              disabled={isDisabled}
              placeholder={placeholder}
              onChange={handleChange}
              maxLength={maxLength}
              minLength={minLength}
              className={`rounded-md disabled:placeholder:text-aeblack-900 ${className ? className : ""}`}
            />
          </div>
          {errorMessage && <p className="error-message !m-0">{errorMessage}</p>}
        </div>
      );
  }
};
