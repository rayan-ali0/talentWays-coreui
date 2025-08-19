import React, { FC } from "react";
import Select from "react-select";
import { getCustomDropDownDesign } from "../../helpers/function-helper";
import { ClearIndicator, DropdownIndicator, FormatLabelWithView, ICustomSelectItem } from "./custom-select-indicator";
import i18n from "../../i18n";

interface IReactSelectProps {
  value: ICustomSelectItem | any | undefined;
  label?: string;
  isClearable?: boolean;
  isArabic?: boolean;
  labelStyleClassName?: string;
  placeholder: string;
  options: ICustomSelectItem[];
  errorMessage?: string;
  disabled?: boolean;
  name?: string;
  onChange?: (values: ICustomSelectItem) => any;
  onView?: (value: ICustomSelectItem) => any;
  required?: boolean;
  withBorder?: boolean;
  noOptionMessage?: string;
}

/**
 * ReactSelect Component
 *
 * A customizable select input component that allows users to choose from a list of options.
 * It supports features like clearable selection, placeholder text, and optional error handling.
 *
 * @component
 * @param {ICustomSelectItem | undefined} value - The currently selected option.
 * @param {string} [label] - An optional label displayed above the select input field.
 * @param {boolean} [isClearable] - If `true`, the selected value can be cleared by the user.
 * @param {boolean} [isArabic] - If `true`, the select input supports right-to-left (RTL) text direction.
 * @param {string} [labelStyleClassName] - Optional CSS class for styling the label.
 * @param {string} placeholder - The placeholder text displayed in the select input field when no value is selected.
 * @param {ICustomSelectItem[]} options - An array of options to be displayed in the select dropdown.
 * @param {string} [errorMessage] - An optional error message displayed when the input is invalid.
 * @param {boolean} [disabled] - If `true`, the select input is disabled and cannot be interacted with.
 * @param {string} [name] - The name attribute for the select input.
 * @param {(values: ICustomSelectItem) => any} [onChange] - An optional callback function triggered when the selected value changes.
 * @param {(value: ICustomSelectItem) => any} [onView] - An optional callback function triggered when a value is viewed.
 * @param {boolean} [required] - If `true`, the select input is marked as required.
 * @param {boolean} [withBorder] - To check if dropdown has border or not
 * @returns {JSX.Element} The rendered custom select component.
 */

export const ReactSelect: FC<IReactSelectProps> = ({
  value,
  label,
  isClearable = false,
  placeholder,
  options,
  errorMessage,
  disabled = false,
  onChange,
  onView,
  required = false,
  isArabic = true,
  name,
  labelStyleClassName,
  withBorder = true,
  noOptionMessage
}) => {
  return (
    <>
      <div className={errorMessage ? " aegov-form-control control-error !m-0" : " aegov-form-control"}>
        {label && <label className={`${required ? "required" : ""} ${labelStyleClassName || ""}`}>{label}</label>}

        <Select
          noOptionsMessage={() => (noOptionMessage || i18n.t("Form.Select.NoOptionsMessage"))}
          classNames={{
            control: (state) =>
              ` ${state.isDisabled ? "form-control-input md:h-12" : withBorder ? "form-control-input md:h-12" : ""}`,
            placeholder: (state) => `${state.isDisabled ? "text-aegold-900" : ""}`,
          }}
          maxMenuHeight={125}
          isSearchable={true}
          isClearable={isClearable}
          components={{
            ClearIndicator: ClearIndicator,
            DropdownIndicator: DropdownIndicator,
            IndicatorsContainer: ({ children, innerProps, ...rest }) => (
                <div 
                  {...innerProps} 
                  className="flex items-center justify-center  mx-2"
                >
                  {children}
                </div>
            )
          }}
          formatOptionLabel={(option, { context }) => {
            return context === "menu" ? (
              option.label
            ) : onView ? (
              <FormatLabelWithView
                label={option.label}
                view={() => {
                  if (onView) onView(option);
                }}
              />
            ) : (
              option.label
            );
          }}
          styles={getCustomDropDownDesign(true, isArabic, withBorder)}
          isDisabled={disabled}
          name={name}
          placeholder={placeholder}
          menuPortalTarget={document.body}
          value={value?.value ? value : placeholder}
          onChange={(v: any) => {
            if (onChange) onChange(v);
          }}
          options={options}
        />

        {errorMessage && <div className="error-message !m-0">{errorMessage}</div>}
      </div>
    </>
  );
};
