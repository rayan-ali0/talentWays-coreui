import React, { FC, useEffect, useState } from "react";
import searchIcon from "../../assets/images/search.svg";

export interface ICustomSearchProps {
  label?: string;
  onChange(keyword: string): void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  value?: string;
  inputClassName?: string;
}

/**
 * CustomSearch Component
 *
 * A customizable search input component that triggers a callback when the search keyword changes.
 * It supports optional labels, placeholders, and custom styling for the input field.
 *
 * @component
 * @param {string} [label] - An optional label displayed above the search input field.
 * @param {(keyword: string) => void} onChange - A callback function triggered when the search keyword changes.
 * @param {boolean} [required] - If `true`, the search input is marked as required.
 * @param {boolean} [disabled] - If `true`, the search input is disabled and cannot be interacted with.
 * @param {string} [placeholder] - An optional placeholder text displayed in the search input field.
 * @param {string} [className] - Optional CSS class for styling the container of the search input.
 * @param {string} [value] - The current value of the search input field.
 * @param {string} [inputClassName] - Optional CSS class for styling the search input field itself.
 * @returns {JSX.Element} The rendered custom search component.
 */

export const CustomSearch: FC<ICustomSearchProps> = function _CustomSearch({
  label,
  onChange,
  required,
  disabled,
  placeholder,
  className,
  value,
  inputClassName,
}) {

  return (
    <div className={`aegov-form-control control-sm ${className && className}`}>
      {label && <label className={required ? "required" : ""}>{label}</label>}

      <div className={`form-control-input ${inputClassName ? inputClassName : ""}`}>
        <span className="control-prefix">
          <img src={searchIcon} />
        </span>
        <input
          className="min-w-60"
          disabled={disabled} value={value} placeholder={placeholder} maxLength={50}
          autoComplete="off" type="text" name="search-input"
          onChange={(e) => { onChange(e.target.value) }} />
      </div>
    </div>
  );
};
