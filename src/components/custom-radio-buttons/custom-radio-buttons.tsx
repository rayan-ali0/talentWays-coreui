import React, { FC } from "react";

export interface ICustomRadioButtonsItem {
  key: string | number;
  label: string;
}
interface ICustomRadioButtonsProps {
  options: ICustomRadioButtonsItem[];
  selectedKey: string | number | undefined;
  disabled?: boolean;
  label?: string;
  handleOptionChange?: (key: string | number) => any;
  className?: string;
}

/**
 * CustomRadioButtons Component
 *
 * A customizable radio button group that allows users to select one option from a list of choices.
 * It supports a label, optional disabling, and a callback for handling option changes.
 *
 * @component
 * @param {Array} options - An array of options to be displayed as radio buttons.
 * @param {any} selectedKey - The key or value of the currently selected radio button.
 * @param {boolean} [disabled] - If `true`, the radio buttons are disabled and cannot be selected.
 * @param {string} [label] - An optional label displayed above the radio buttons.
 * @param {(key: any) => any} [handleOptionChange] - An optional callback function triggered when the selected radio button changes.
 * @returns {JSX.Element} The rendered radio button group component.
 */

export const CustomRadioButtons: FC<ICustomRadioButtonsProps> = ({
  options,
  selectedKey,
  label,
  handleOptionChange,
  className,
  disabled = false,
}) => {
  return (
    <div className="control-sm aegov-form-control">
      {label && <label className="font-semibold">{label}</label>}

      <div className={`flex flex-row flex-wrap gap-8 mt-2 ${className ? className : ""}`}>
        {options.map((option, index) => {
          return (
            <div className="input-checkBox-item" key={option.key}>
              <div className="flex items-center gap-2">
                <input
                  disabled={disabled}
                  className={disabled && option.key == selectedKey ? "bg-aeblack-200" : ""}
                  checked={option.key == selectedKey ? true : false}
                  onClick={handleOptionChange ? () => handleOptionChange(option.key) : undefined}
                  onChange={() => {}}
                  id={option.key + "category"}
                  type="radio"
                  value=""
                />
                <label className="input-checkBox-item-label mt-1" htmlFor={option.key + "category"}>
                  {option.label}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
