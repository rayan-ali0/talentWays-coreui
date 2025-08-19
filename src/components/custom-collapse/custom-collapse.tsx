import React, { useRef, useState } from "react";
import i18n from "../../i18n";
import { ArrowRightSvgIcon, ChevronRightSvgIcon } from "../icons/icons";
import { AppInitializerProvider } from "../../context/initializer-context";

import { TextType,Text } from "../custom-text/custom-text";

interface CustomCollapseProps {
  buttonText?: string;
  dateText?: string;
  collapseLabel?: string;
  initialCollapsed?: boolean;
  children?: any;
  showTextBesideArrow?: boolean;
  isFileDetails?: boolean;
  handleClickFunction?: () => void;
  textClassName?: string;
  isArabic: boolean;
}

/**
 * CustomCollapse Component
 *
 * A collapsible component that displays content that can be expanded or collapsed, with optional labels, text, and custom click behavior.
 * It can be used for file details, with customizable button text, collapse state, and additional styling.
 *
 * @component
 * @param {string} [buttonText] - Optional text to display on the button that toggles the collapse state.
 * @param {string} [dateText] - Optional text to display the date associated with the collapse section.
 * @param {string} [collapseLabel] - Optional label that appears beside the collapse button.
 * @param {boolean} [initialCollapsed] - If `true`, the content is initially collapsed when the component loads.
 * @param {React.ReactNode} [children] - The content that is displayed within the collapsible section.
 * @param {boolean} [showTextBesideArrow] - If `true`, displays text beside the collapse/expand arrow button.
 * @param {boolean} [isFileDetails] - If `true`, the collapse component is styled for file details view.
 * @param {() => void} [handleClickFunction] - Optional callback function triggered when the collapse button is clicked.
 * @param {string} [textClassName] - Optional CSS class to apply to the text displayed inside the collapse.
 * @param {boolean} isArabic - If `true`, displays the collapse component in a right-to-left (RTL) layout for Arabic content.
 * @returns {JSX.Element} The rendered collapsible component.
 */

export const CustomCollapse: React.FC<CustomCollapseProps> = ({
  buttonText = "Toggle",
  dateText,
  initialCollapsed = true,
  children,
  collapseLabel,
  showTextBesideArrow,
  isFileDetails,
  handleClickFunction,
  textClassName,
  isArabic,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(initialCollapsed);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div id="custom-collapse">
      <AppInitializerProvider containerId="custom-collapse" preferredLanguage={isArabic ? "ar" : "en"}>
        <div className="rounded-[10px] shadow-custom  p-6">
          <div className="flex items-center justify-between cursor-pointer" onClick={toggleCollapse}>
            <div className="flex items-center gap-3 font-bold text-lg">
              <Text isArabic={isArabic} as={TextType.H5} text={buttonText}  />
              {isFileDetails && handleClickFunction && (
                <ArrowRightSvgIcon
                  alt="arrow"
                  className={`${isArabic ? "" : "rotate-180"} ml-2`}
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleClickFunction();
                  }}
                />
              )}
            </div>

            <div className="flex items-center  justify-center gap-3 text-aegold-600 text-base font-semibold">
              {showTextBesideArrow &&
                (collapseLabel
                  ? collapseLabel
                  : isCollapsed
                  ? i18n.t(`Collapse.SeeMore`)
                  : i18n.t(`Collapse.SeeLess`))}
              <div
                className={`collapse-icon transition-transform duration-300 ease-in-out ${
                  isCollapsed ? "" : "rotate-180"
                }`}
              >
                <ChevronRightSvgIcon className="rotate-90 mt-1" />
              </div>
            </div>
          </div>

          {/* <div
        ref={contentRef}
        className="transition-max-height duration-500 ease-in-out overflow-hidden"
        style={{
          maxHeight: isCollapsed
            ? "0px"
            : contentRef.current?.scrollHeight + "px",
        }}
      > */}
          <div className={`${isCollapsed ? "hidden" : "block border-t border-aeblack-100 mt-4"}`}>{children}</div>
        </div>
      </AppInitializerProvider>
    </div>
  );
};
