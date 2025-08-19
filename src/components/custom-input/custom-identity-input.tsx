import React from "react";

import { CustomTooltip } from "../custom-tooltip/custom-tooltip";
import i18n from "../../i18n";


interface ICustomIdentityProps {
  label?: string;
  name?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  className?: string;
  classNameLabel?: string;
  inputClassName?: string;
  tooltipText?: string;
  labelStyle?: React.CSSProperties;
  isArabic?: boolean;
}

export const CustomIdentityInput: React.FC<ICustomIdentityProps> = ({
  label,
  name = "",
  error,
  value,
  onChange,
  required = false,
  isDisabled = false,
  placeholder = "000-0000-0000000-0",
  className = "",
  classNameLabel = "",
  inputClassName = "",
  tooltipText,
  labelStyle = {},
  isArabic = false,
  ...restProps
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
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
    }
  };

  return (
    <div
      className={error ? "aegov-form-control max-md:control-sm control-error" : "aegov-form-control max-md:control-sm"}
      {...restProps}
    >
      {label && (
        <label style={{ ...labelStyle }} className={`${required ? "required" : ""} ${classNameLabel}`}>
          {label}
        </label>
      )}
      <div className="form-control-input">
        <input
          type="text"
          value={value}
          name={name}
          disabled={isDisabled}
          placeholder={placeholder}
          onChange={handleChange}
          className={`rounded-md disabled:placeholder:text-aeblack-900 ${inputClassName} ${className}`}
        />
        <div className="relative">
          <span className="control-suffix peer cursor-pointer mt-3 max-md:mt-2">
            <svg className="text-primary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none" />
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,168a12,12,0,1,1,12-12A12,12,0,0,1,128,192Zm8-48.72V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8c13.23,0,24-9,24-20s-10.77-20-24-20-24,9-24,20v4a8,8,0,0,1-16,0v-4c0-19.85,17.94-36,40-36s40,16.15,40,36C168,125.38,154.24,139.93,136,143.28Z" />
            </svg>
          </span>
          {/* <CustomTooltip isArabic={isArabic} placement="top" bgColor="bg-aeblack-700">
            {tooltipText || i18n.t("Form.Validation.InformativeMessage")}
          </CustomTooltip> */}
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};
