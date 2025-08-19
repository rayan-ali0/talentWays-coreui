import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ThreeDotsSvgIcon } from "../icons/icons";

export interface Option<T = number> {
  label: string;
  value: T;
  icon?: React.ReactNode;
  className?: string;
}

export interface ThreePointsDropDownProps<T = number> {
  options: Option<T>[];
  onSelect: (value: T) => void;
  isArabic?: boolean;
  className?: string;
}

export const ThreePointsDropDown = <T,>({ options, onSelect, isArabic = true }: ThreePointsDropDownProps<T>) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 150 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!showDropDown && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const dropdownHeight = options.length * 40 + 16;
      const dropdownWidth = 150;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      const showAbove = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;

      let leftPosition;
      if (isArabic) {
        const spaceOnLeft = rect.left;
        if (spaceOnLeft >= dropdownWidth) {
          leftPosition = rect.left - dropdownWidth;
        } else {
          leftPosition = rect.right - dropdownWidth;
        }
      } else {
        const spaceOnRight = window.innerWidth - rect.right;
        if (spaceOnRight >= dropdownWidth) {
          leftPosition = rect.right;
        } else {
          leftPosition = rect.left;
        }
      }

      setPosition({
        top: showAbove ? rect.top - dropdownHeight : rect.bottom + 2,
        left: leftPosition,
        width: dropdownWidth,
      });
    }
    setShowDropDown(!showDropDown);
  };

  // Handle option selection
  const handleSelect = (value: T) => {
    onSelect(value);
    setShowDropDown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    };

    if (showDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDropDown]);

  // Close dropdown when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (showDropDown) {
        setShowDropDown(false);
      }
    };

    const scrollContainer = document.querySelector(".table-scroll-container");
    if (scrollContainer && showDropDown) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [showDropDown]);

  const DropdownContent = () => (
    <div
      ref={dropdownRef}
      className="fixed z-50 flex flex-col whitespace-nowrap bg-whitely-100 shadow-lg"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        minWidth: "160px",
      }}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <ul className="text-slate-700 py-1">
        {options.map((option, index) => (
          <li
            key={index}
            className={`px-4 py-2 hover:bg-aegold-50 cursor-pointer ${option.className || ""}`}
            onClick={() => handleSelect(option.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelect(option.value);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Select ${option.label}`}
          >
            {option.icon && <span className="mr-3">{option.icon}</span>}
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={`inline-block relative`} ref={triggerRef}>
      <ThreeDotsSvgIcon onClick={handleToggle} className="cursor-pointer" />

      {showDropDown && createPortal(<DropdownContent />, document.body)}
    </div>
  );
};
