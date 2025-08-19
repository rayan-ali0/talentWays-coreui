import React, { CSSProperties, FC, useEffect, useState } from "react";
export interface IRadioOption {
  value: string | number;
  label: string;
}

export interface IRadioProps {
  options: IRadioOption[];
  name: string;
  label?: string;
  value: string | number;
  desgin?: string;
  placeholder?: string;
  required?: boolean;
  isDisabled?: boolean;
  labelStyles?: CSSProperties | undefined;
  inputStyles?: CSSProperties | undefined;
  optionStyles?: CSSProperties | undefined;
  onChange(event: React.ChangeEvent<any>): void;
  errorMessage?: string;
  className?: string;
}

/**
 * CustomRadio Component
 *
 * A customizable radio button component that allows users to select a single option from a list of radio buttons.
 * It supports labels, error messages, and various style customizations.
 *
 * @component
 * @param {Array} options - An array of radio button options, each with a `value` and `label`.
 * @param {string | number} name - The name attribute for the radio button group, which groups them together.
 * @param {string | number} value - The currently selected value of the radio button group.
 * @param {string} [label] - An optional label displayed above the radio buttons.
 * @param {string} [design] - An optional custom design class or identifier for styling purposes.
 * @param {string} [placeholder] - An optional placeholder text for the radio button group.
 * @param {boolean} [required] - If `true`, the radio button group is marked as required.
 * @param {boolean} [isDisabled] - If `true`, the radio button group is disabled and cannot be interacted with.
 * @param {CSSProperties} [labelStyles] - Optional inline CSS for styling the label.
 * @param {CSSProperties} [inputStyles] - Optional inline CSS for styling the radio button inputs.
 * @param {CSSProperties} [optionStyles] - Optional inline CSS for styling each radio button option.
 * @param {(event: React.ChangeEvent<any>) => void} onChange - A callback function triggered when the selected radio button changes.
 * @param {string} [errorMessage] - An optional error message displayed when the input is invalid.
 * @param {string} [labelClass] - Optional CSS class for styling the label.
 * @param {boolean} [displayBlock] - If `true`, the radio buttons are displayed as block elements, stacking them vertically.
 * @param {string} [noSpace] - An optional property to remove space between the radio buttons.
 * @param {string} [blockMargins] - Optional margins applied to the radio button group if displayed as block elements.
 * @returns {JSX.Element} The rendered custom radio button component.
 */

export const CustomRadio: FC<IRadioProps> = ({
  options,
  label,
  name,
  value,
  errorMessage,
  // placeholder,
  labelStyles,
  className,
  inputStyles,
  optionStyles,
  onChange,
  isDisabled = false,
  required,
}) => {
  const [radioValue, setRadioValue] = useState<string | number>(value); // Local state to track selected radio value

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setRadioValue(newValue);
    if (onChange) {
      const customEvent = {
        ...event,
        target: {
          ...event.target,
          name,
          value: newValue,
        },
      };
      onChange(customEvent as React.ChangeEvent<any>);
    }
  };

  useEffect(() => {
    setRadioValue(value);
  }, [value]);

  return (
    <>
      <div className={errorMessage ? "aegov-form-control control-error" : "aegov-form-control"}>
        <label style={{ ...labelStyles }} className={`${required && label ? "required" : ""} font-semibold`}>
          {label}
        </label>
        <div className={`flex gap-4 mt-4 md:gap-8 max-sm:flex-wrap  ${className ? className : ""}`}>
          {options?.map((option) => (
            <div className={`aegov-check-item`} key={option.value}>
              <input
                checked={radioValue == option.value}
                id={option.value.toString()}
                type="radio"
                name={name}
                value={option.value}
                onChange={handleInputChange}
                disabled={isDisabled}
                style={{ ...inputStyles }}
              />
              <label style={{ ...optionStyles }} htmlFor={option.value.toString()} className="mt-1">
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </>
  );
};
