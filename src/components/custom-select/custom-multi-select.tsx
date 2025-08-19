import React, { FC } from "react";
import Select from "react-select";
import { getCustomDropDownDesign } from "../../helpers/function-helper";
import { ClearIndicator, DropdownIndicator } from "./custom-multi-select-indicator";
import i18n from "../../i18n";

export interface ICustomSelectItem {
  value: number | string;
  label: string;
}

interface ICustomMultiSelectProps {
  value: ICustomSelectItem[] | undefined;
  label: string;
  isArabic?: boolean;
  placeholder: string;
  options: ICustomSelectItem[];
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (values: ICustomSelectItem[]) => any;
  required?: boolean;
  labelStyleClassName?: string;
  isClearable?: boolean;
  withBorder?: boolean;
}

/**
 * CustomMultiSelect Component
 *
 * A customizable multi-select input component that allows users to select multiple values from a list of options.
 * It supports optional placeholder text, error handling, and RTL support for Arabic text.
 *
 * @component
 * @param {ICustomSelectItem[]} value - An array of selected options.
 * @param {string} label - The label displayed above the multi-select input.
 * @param {boolean} [isArabic] - If `true`, the multi-select input supports right-to-left (RTL) text direction.
 * @param {string} placeholder - The placeholder text displayed in the multi-select input when no value is selected.
 * @param {ICustomSelectItem[]} options - An array of options available for selection in the multi-select dropdown.
 * @param {string} [errorMessage] - An optional error message displayed when the input is invalid.
 * @param {boolean} [disabled] - If `true`, the multi-select input is disabled and cannot be interacted with.
 * @param {(values: ICustomSelectItem[]) => void} [onChange] - A callback function triggered when the selected values change.
 * @param {boolean} [required] - If `true`, the multi-select input is marked as required.
 * @param {string} labelStyleClassName - A string that is added to the className prop of the label
 * @param {boolean} [isClearable] - If `true`, the selected value can be cleared by the user.
 * @param {boolean} [withBorder] - To check if dropdown has border or not
 * @returns {JSX.Element} The rendered custom multi-select component.
 */

export const CustomMultiSelect: FC<ICustomMultiSelectProps> = ({
  value,
  label,
  placeholder,
  options,
  errorMessage,
  disabled,
  onChange,
  required,
  isArabic = true,
  labelStyleClassName,
  isClearable = true,
  withBorder = true,
}) => {
  return (
    <>
      <div className={errorMessage ? "control-sm aegov-form-control control-error" : " control-sm aegov-form-control"}>
        {label && (
          <label className={` ${labelStyleClassName} font-semibold ${required ? "required" : ""} }`}>{label}</label>
        )}
        <Select
          noOptionsMessage={() => i18n.t("Form.Select.NoOptionsMessage")}
          classNames={{
            control: (state) =>
              ` ${state.isDisabled ? "border border-aeblack-200 bg-aeblack-100" : "form-control-input"}`,
          }}
          isClearable={isClearable}
          components={{
            ClearIndicator,
            DropdownIndicator,
            IndicatorsContainer: ({ children, innerProps, ...rest }) => (
              <div {...innerProps} className="flex items-center justify-center mx-2">
                {children}
              </div>
            ),
          }}
          styles={getCustomDropDownDesign(true, isArabic, withBorder)}
          isDisabled={disabled === true ? true : false}
          isMulti={true}
          placeholder={placeholder}
          value={value || placeholder}
          onChange={(v: any) => {
            if (onChange) onChange(v);
          }}
          options={options}
          menuPortalTarget={document.body}
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </>
  );
};
