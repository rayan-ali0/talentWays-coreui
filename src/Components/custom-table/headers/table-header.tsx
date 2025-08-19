import React, {type FC, type ReactNode } from "react";
import arrow from "../../../assets/images/arrow-right.svg";
import { Text, TextType } from "../../custom-text/custom-text";
interface ITableHeader {
  title: ReactNode;
  titleComponent?: ReactNode;
  isArabic: boolean;
}

/**
 * `TableHeader` is a component that renders the header of a table with a title and optional navigation controls.
 * The layout adjusts based on the `isArabic` prop to support Right-to-Left (RTL) or Left-to-Right (LTR) languages.
 *
 * @param {string} title - The title to display in the table header.
 * @param {string} [navigationText] - Optional text to display for the navigation link/button in the header.
 * @param {Function} [navigationAction] - Optional callback function to execute when the navigation link/button is clicked.
 * @param {boolean} isArabic - A boolean indicating whether the table should be rendered in Arabic (RTL). If `true`, the layout will be right-to-left.
 *
 * @returns {JSX.Element} The rendered table header with an optional navigation section.
 */

export const TableHeader: FC<ITableHeader> = ({
  title,
  titleComponent,
  isArabic,
}) => {
  return (
    <div className="flex gap-3 items-center flex-wrap mb-1">
      <Text as={TextType.H5} text={title as string} isArabic={isArabic} />
      {titleComponent && <>{titleComponent}</>}
    </div>
  );
};
