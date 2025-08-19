import React, { FC, useCallback, useRef, useState } from "react";
import { ICustomSelectItem, ClearIndicator, DropdownIndicator } from "./custom-select-indicator";
import AsyncSelect from "react-select/async";

import { getCustomDropDownDesign } from "../../helpers/function-helper";

import i18n from "../../i18n";
import { AppInitializerProvider } from "../../context/initializer-context";

export interface ICustomAsyncSearchSelectProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  defaultOption?: ICustomSelectItem;
  onSelectItem: (supervisorId: string | number) => void;
  fetchOptions: (keyword: string) => Promise<ICustomSelectItem[]>;
  clearSelection?(): void;
  isArabic: boolean;
  noOptionMessage?: string;
}

export const CustomAsyncSearchSelect: FC<ICustomAsyncSearchSelectProps> = function _CustomAsyncSearchSelect({
  isArabic,
  label,
  placeholder,
  required,
  disabled,
  defaultOption,
  onSelectItem,
  fetchOptions,
  clearSelection,
  noOptionMessage
}) {
  const [selectedOption, setSelectedOption] = useState<ICustomSelectItem | undefined>(defaultOption);

  const handleAddOption = (selectedItem: ICustomSelectItem) => {
    onSelectItem(selectedItem.value);
    setSelectedOption(selectedItem);
  };

  const clearSelectionItem = () => {
    setSelectedOption(undefined);
    onSelectItem("");
    if (clearSelection) clearSelection();
  };

  function useDebounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>();

    return (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  const debouncedFetchOptions = useCallback(
    useDebounce((keyword: string, callback: (options: ICustomSelectItem[]) => void) => {
      fetchOptions(keyword).then(callback);
    }, 300), // Adjust delay time (300ms)
    [fetchOptions]
  );

  return (
    <AppInitializerProvider containerId="custom-select-more" preferredLanguage={isArabic ? "ar" : "en"}>
      <div className="aegov-form-control">
        <label className={`${required && label ? "required " : ""}`}>{label}</label>

        <AsyncSelect
          classNames={{
            control: (state) =>
              ` ${state.isDisabled ? "border border-aeblack-200 bg-aeblack-100" : "form-control-input"}`,
          }}
          styles={getCustomDropDownDesign(true, isArabic)}
          placeholder={placeholder}
          isClearable
          defaultOptions
          loadOptions={(inputValue, callback) => {
            if (inputValue.trim()) {
              debouncedFetchOptions(inputValue, callback);
            } else {
              callback([]);
            }
          }}
          value={selectedOption}
          isDisabled={disabled}
          noOptionsMessage={() => (noOptionMessage || i18n.t("Form.Select.NoOptionsMessage"))}
          onInputChange={(inputValue, { action }) => {
            if (action === "input-change" && inputValue === "") {
              setSelectedOption(undefined);
            }
          }}
          menuPortalTarget={document.body}
          onChange={(option) => {
            if (option) handleAddOption(option);
            else clearSelectionItem();
          }}
          components={{
            ClearIndicator: ClearIndicator,
            DropdownIndicator: DropdownIndicator,
            IndicatorsContainer: ({ children, innerProps, ...rest }) => (
              <div {...innerProps} className="flex items-center justify-center mx-2">
                {children}
              </div>
            ),
          }}
        />
      </div>
    </AppInitializerProvider>
  );
};
