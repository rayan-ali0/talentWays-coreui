import React, { FC, useCallback, useState } from "react";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import i18n from "i18next";

import { getCustomDropDownDesign } from "../../helpers/function-helper";
import { ClearIndicator, DropdownIndicator, ICustomSelectItem } from "./custom-select-indicator";
import { AppInitializerProvider } from "../../context/initializer-context";

interface ICustomAsyncSelectWithLoadMoreProps {
  name: string;
  value: ICustomSelectItem | ICustomSelectItem[] | undefined;
  options: ICustomSelectItem[];
  fetchOptions: (searchKeyword: any) => any;
  loadMore?: () => any;
  isArabic: boolean;
  disabled?: boolean;
  isMulti?: boolean;
  onChange: (value: any) => any;
  label: string;
  required?: boolean;
  isClearable?: boolean;
  placeholder: string;
  labelStyleClassName?: string;
  withBorder?: boolean;
  errorMessage?: string;
  withFormik?: boolean;
}

export const CustomAsyncSelectWithLoadMore: FC<ICustomAsyncSelectWithLoadMoreProps> = ({
  value,
  options,
  name,
  fetchOptions,
  loadMore,
  isArabic,
  disabled = false,
  isMulti = false,
  onChange,
  labelStyleClassName,
  label,
  placeholder,
  required = false,
  isClearable = true,
  withBorder = true,
  withFormik = false,
  errorMessage,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const CustomMenu = (params: any) => {
    const selectedValues = isMulti
      ? (value as ICustomSelectItem[])?.map((v) => v.value)
      : [(value as ICustomSelectItem)?.value];

    const visibleItems = isMulti ? options : options.filter((opt) => opt.value !== selectedValues?.[0]);

    const handleLoadMore = async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (loadMore && !isLoadingMore) {
        setIsLoadingMore(true);
        try {
          await loadMore();
        } finally {
          setIsLoadingMore(false);
        }
      }
    };

    return (
      <components.MenuList {...params}  >
        {visibleItems.length > 0 ? (
          <>
            {visibleItems.map((source) => {
              const isSelected = selectedValues?.includes(source.value);
              return (
                <div
                  className={`py-2 px-3 cursor-pointer text-sm ${isSelected ? "bg-[#DEEBFF] font-semibold" : "hover:bg-[#DEEBFF]"
                    }`}
                  key={source.value}
                  onClick={() => {
                    const newValue = isMulti
                      ? [...(Array.isArray(value) ? value : []), source]
                      : source;

                    // Handle form integration
                    if (withFormik) {
                      onChange({
                        target: {
                          name,
                          value: isMulti ? newValue : source.value,
                          label: source.label,
                        },
                      });
                    } else {
                      onChange(newValue);
                    }

                    params.selectProps.onMenuClose();
                    setInputValue("");
                  }}
                >
                  {source.label}
                </div>
              );
            })}
            {loadMore && (
              <div className="border-t border-aeblack-200 mt-1">
                <button
                  className={`w-full py-2 px-3 text-center font-medium ${isLoadingMore ? "pointer-events-none" : ""} text-primary-500 hover:text-primary-600 p-2 hover:bg-primary-50 cursor-pointer"`}
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span className="text-sm"> {i18n.t("Loading")}</span>
                    </div>
                  ) : (
                    i18n.t("LoadMore")
                  )}
                </button>
              </div>
            )
            }
          </>
        ) : (
          <div className="flex justify-center py-2 px-3 text-[#999999]">{i18n.t("Form.Select.NoOptionsMessage")}</div>
        )}
      </components.MenuList >
    );
  };

  function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    return (...args: Parameters<T>) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  const handleInputChange = useCallback(
    debounce((newValue: string, action: { action: string }) => {
      if (!newValue && action?.action === "input-change") {
        fetchOptions("");
      } else if (action.action !== "input-blur") {
        fetchOptions(newValue);
      }
    }, 500),
    [fetchOptions]
  );

  const handleChange = (selectedOption: any) => {
    onChange(selectedOption);
    setInputValue(""); // Clear input when an option is selected
  };

  return (
    <AppInitializerProvider containerId="custom-async-load-more" preferredLanguage={isArabic ? "ar" : "en"}>
      <div className={errorMessage ? "aegov-form-control control-error !m-0" : "aegov-form-control"}>
        <label className={`${labelStyleClassName} ${required && label ? "required" : ""}`}>{label}</label>
        <AsyncSelect
          classNames={{
            control: (state) =>
              `${state.isDisabled ? "border border-aeblack-200 bg-aeblack-100" : "form-control-input"}`,
          }}
          isClearable={isClearable}
          styles={getCustomDropDownDesign(true, isArabic, withBorder)}
          placeholder={placeholder}
          cacheOptions
          value={value}
          name={name}
          isMulti={isMulti}
          loadOptions={fetchOptions}
          onInputChange={(value, action) => {
            if (action.action !== "input-blur" && action.action !== "menu-close") {
              setInputValue(value);
              handleInputChange(value, action);
            }
          }}
          menuPortalTarget={document.body}
          onChange={handleChange}
          isDisabled={disabled}
          components={{
            MenuList: CustomMenu,
            ClearIndicator,
            DropdownIndicator,
            IndicatorsContainer: ({ children, innerProps, ...rest }) => (
              <div {...innerProps} className="flex items-center justify-center mx-2">
                {children}
              </div>
            ),
          }}
          inputValue={inputValue}
          closeMenuOnSelect={true}
        />
        {errorMessage && <p className="error-message !m-0">{errorMessage}</p>}

      </div>
    </AppInitializerProvider>
  );
};
