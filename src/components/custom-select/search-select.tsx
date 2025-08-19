import React, { CSSProperties, FC } from "react";
import AsyncSelect from "react-select/async";
import { getCustomDropDownDesign } from "../../helpers/function-helper";
import { ClearIndicator, DropdownIndicator, ICustomSelectItem } from "./custom-select-indicator";
import i18n from "../../i18n";

export interface ISearchSelectProps {
  options: ICustomSelectItem[];
  name?: string;
  label?: string;
  value: any | number;
  placeholder?: string;
  required?: boolean;
  isDisabled?: boolean;
  onChange(event: any): void; // Ensure this matches Formik's handleChange
  errorMessage?: string;
  labelStyles?: CSSProperties | undefined;
  searchSelectClass?: string;
  labelStyleClassName?: string;
  isMulti?: boolean;
  isArabic?: boolean;
  withBorder?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
}

/**
 * CustomSearchSelect Component
 *
 * A customizable select input component that allows users to select a value from a list of options,
 * with search functionality and multi-selection support.
 *
 * @component
 * @param {ICustomSelectItem[]} options - An array of options to be displayed in the select dropdown.
 * @param {string} [name] - The name attribute for the select input.
 * @param {string} [label] - An optional label displayed above the select input field.
 * @param {any | number} value - The currently selected value.
 * @param {string} [placeholder] - The placeholder text displayed in the select input field when no value is selected.
 * @param {boolean} [required] - If `true`, the select input is marked as required.
 * @param {boolean} [isDisabled] - If `true`, the select input is disabled and cannot be interacted with.
 * @param {(event: any) => void} onChange - A callback function triggered when the selected value changes.
 * @param {string} [errorMessage] - An optional error message displayed when the input is invalid.
 * @param {CSSProperties} [labelStyles] - Optional styles for the label of the select input.
 * @param {string} [searchSelectClass] - Optional CSS class for styling the select input.
 * @param {string} [labelStyleClassName] - Optional CSS class for styling the label.
 * @param {boolean} [isMulti] - If `true`, the select input allows multi-selection.
 * @param {boolean} [withBorder] - To check if dropdown has border or not
 * @param {boolean} [isArabic] - If `true`, the select input supports right-to-left (RTL) text direction.
 * @returns {JSX.Element} The rendered custom search select component.
 */

export const CustomSearchSelect: FC<ISearchSelectProps> = ({
  options,
  label,
  name,
  value,
  errorMessage,
  placeholder,
  onChange,
  labelStyles,
  isDisabled = false,
  required = false,
  searchSelectClass,
  labelStyleClassName,
  isMulti,
  isArabic = true,
  withBorder = true,
  isSearchable = true,
  isClearable = false,
}) => {
  const customOnChange = (newValue: any) => {
    if (!newValue) {
      onChange({
        label: undefined,
        value: undefined
      })
      return;
    }
    onChange(newValue);
  };
  const getOptions = async (keyword: string) => {
    if (keyword) {
      const filterOptions = options?.filter((x) => x?.label?.includes(keyword));
      return filterOptions;
    }
    return options;
  };

  return (
    <>
      <div className={errorMessage ? "aegov-form-control control-error !m-0" : "aegov-form-control"}>
        {label && (
          <label
            className={`${required ? "required" : ""} ${labelStyleClassName || ""}`}
            htmlFor={name}
            style={{ ...labelStyles }}
          >
            {label}
          </label>
        )}
        <AsyncSelect
          noOptionsMessage={() => i18n.t("Form.Select.NoOptionsMessage")}
          classNames={{
            control: (state) => `form-control-input md:h-12 `,
            placeholder: (state) => `${state.isDisabled ? "text-aegold-900" : ""}`,
          }}
          className={searchSelectClass ? searchSelectClass : "w-full"}
          placeholder={placeholder}
          isSearchable={isSearchable}
          cacheOptions
          value={
            isMulti && value
              ? value.map((x: any) => options.find((option) => option.value === x.value)).filter(Boolean)
              : options.find((option) => option.value === value) || null
          }
          isClearable={isClearable}
          defaultOptions={options}
          loadOptions={getOptions}
          styles={getCustomDropDownDesign(true, isArabic, withBorder)}
          name={name}
          components={{
            ClearIndicator: ClearIndicator,
            DropdownIndicator: DropdownIndicator,
            IndicatorsContainer: ({ children, innerProps, ...rest }) => (
              <div className="mx-2">
                <div {...innerProps} className={`${isMulti ? "absolute top-4 left-2" : "flex items-center justify-center"}`} >
                  {children}
                </div>
              </div>
            ),
          }}
          onChange={customOnChange}
          isDisabled={isDisabled}
          isMulti={isMulti}
        />

        {errorMessage && <p className="error-message !m-0">{errorMessage}</p>}
      </div>
    </>
  );
};
