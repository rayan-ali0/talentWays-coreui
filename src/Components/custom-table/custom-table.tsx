import React, {type ReactNode, useState } from "react";
import { TableSkeleton } from "../skeleton/table-skeleton";
import Empty from "../../assets/images/emtpy-state-table.png";
import { CustomSearch } from "../custom-search/custom-search";
import PlusIcon from "../../assets/images/add-white.svg";

import { CustomPagination } from "../custom-pagination/custom-pagination";
import { TableHeader } from "./headers/table-header";

export interface TableCell {
  cells: any[];
}

export interface ITableProps {
  headers: ReactNode[];
  rows: Array<TableCell>;
  loading?: boolean;
  wrapperClassName?: string;
  classTable?: string;
  classHeader?: string;
  classRow?: string;
  classRowHeader?: string;
  classHeaderData?: string;
  title?: ReactNode;
  titleComponent?: ReactNode;
  subTitle?: ReactNode;
  buttonActionText?: string;
  navigationText?: string;
  withHeaders?: boolean;
  totalPages?: number;
  currentPages?: number;
  searchLabel?: string;
  infoText?: string;
  infoBg?: string;
  infoTextDesign?: string;
  withPagination?: boolean;
  isArabic: boolean;
  searchPlaceholder?: string;
  headerAdditionalActions?: any;
  footer?: any;
  withCustomCard?: boolean;
  navigationAction?: () => void;
  buttonAction?: () => void;
  handleSearch?: (keyword: string) => void;
  onPageChange?: (page: number) => void;
}

/**
 * CustomTable Component
 *
 * Displays a table with configurable headers, rows, and optional pagination.
 * Supports customizable styles for various parts of the table and includes
 * options for displaying loading states, search functionality, and custom actions.
 *
 * @component
 * @param {string[]} headers - An array of strings representing the table headers.
 * @param {TableCell[]} rows - An array of rows where each row contains an array of table cells.
 * @param {boolean} [loading] - If `true`, a loading indicator will be shown while the table content is being loaded.
 * @param {string} [wrapperClassName] - Optional class name for the wrapper of the table.
 * @param {string} [classTable] - Optional class name for the table element.
 * @param {string} [classHeader] - Optional class name for the table header.
 * @param {string} [classRow] - Optional class name for each table row.
 * @param {string} [classRowHeader] - Optional class name for the row header.
 * @param {string} [classHeaderData] - Optional class name for the header data.
 * @param {string} [title] - Optional title for the table.
 * @param {string} [buttonActionText] - Text for the button action (if any).
 * @param {boolean} [withHeaders] - If `true`, the table will display headers.
 * @param {number} [totalPages] - The total number of pages available for pagination.
 * @param {number} [currentPages] - The current page being displayed.
 * @param {string} [searchLabel] - Label for the search input field.
 * @param {boolean} [withPagination] - If `true`, the table will include pagination controls.
 * @param {boolean} isArabic - If `true`, the table will support right-to-left (RTL) text alignment for Arabic languages.
 * @param {string} [searchPlaceholder] - Placeholder text for the search input field.
 * @param {any} [headerAdditionalActions] - Optional additional actions to be displayed in the table header.
 * @param {any} [footer] - Optional footer content to be displayed at the bottom of the table.
 * @param {() => void} [buttonAction] - Callback function to handle button actions.
 * @param {(keyword: string) => void} [handleSearch] - Callback function to handle search input changes.
 * @param {(page: number) => void} [onPageChange] - Callback function to handle pagination page changes.
 * @returns {JSX.Element} The rendered custom table component.
 */

export const CustomTable: React.FC<ITableProps> = (props) => {
  const {
    headers,
    rows,
    loading,
    wrapperClassName,
    classHeader,
    classRow,
    classTable,
    classRowHeader,
    classHeaderData,
    title,
    subTitle,
    buttonActionText,
    withHeaders,
    totalPages,
    currentPages,
    searchLabel,
    withPagination = false,
    isArabic,
    searchPlaceholder,
    headerAdditionalActions,
    footer,
    onPageChange,
    handleSearch,
    buttonAction,
    titleComponent,
    withCustomCard,
  } = props;

  const [keyword, setkeyword] = useState<string>("");
  const headerClass = isArabic ? "text-right" : "text-left";
  const withHeaderStyles = (buttonAction || title) && handleSearch ? "mt-8" : "";

  // Render header section
  const renderHeader = () => {
    if (!withHeaders) return null;

    return (
      <>
        <div className="flex md:items-center max-md:flex-col justify-between">
          <div className={`${subTitle ? "flex flex-col gap-2" : ""}`}>
            {title && <TableHeader title={title} titleComponent={titleComponent} isArabic={isArabic} />}
            {subTitle && <div>{subTitle}</div>}
          </div>
          <div className="flex items-center max-md:flex-col gap-4 max-md:mt-5">
            {buttonAction && buttonActionText && (
              <button className="aegov-btn btn-sm max-md:w-full" type="button" onClick={buttonAction}>
                <img src={PlusIcon} />
                {buttonActionText}
              </button>
            )}
            {headerAdditionalActions}
          </div>
        </div>
        <div className={`flex flex-wrap max-md:flex-col gap-4 md:items-center justify-end ${withHeaderStyles}`}>
          {handleSearch && (
            <>
              <CustomSearch
                disabled={loading}
                value={keyword}
                onChange={(value) => setkeyword(value || "")}
                placeholder={searchPlaceholder || searchLabel}
              />
              <button
                disabled={loading}
                className="aegov-btn btn-sm btn-outline"
                type="button"
                onClick={() => handleSearch(keyword)}
              >
                {searchLabel}
              </button>
            </>
          )}
        </div>
      </>
    );
  };

  // Render table body content
  const renderTableContent = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={headers.length}>
            <TableSkeleton columnNumber={headers.length} rowNumber={1} isArabic={isArabic} />
          </td>
        </tr>
      );
    }

    if (rows.length === 0) {
      return (
        <tr>
          <td colSpan={headers.length} className="text-center">
            <img src={Empty} alt="empty" className="inline-block m-auto max-w-56" />
          </td>
        </tr>
      );
    }

    return rows.map((row, rowIndex) => (
      <tr
        key={rowIndex}
        className={`text-sm ${rowIndex < rows.length - 1 ? "border-b" : ""} border-secondary-100 `}
      >
        {row?.cells?.map((cell, cellIndex) => (
          <td
            key={cellIndex}
            className={`p-4 font-normal border-0 text-start text-aeblack-700 ${classRow || ""}  ${
              cell?.length > 40 ? "max-w-[40ch]" : ""
            } sm:text-wrap`}
          >
            {cell}
          </td>
        ))}
      </tr>
    ));
  };

  // Render pagination
  const renderPagination = () => {
    if (!withPagination || totalPages! <= 1) return null;

    return (
      <div className="flex justify-end mt-3">
        <CustomPagination
          itemsLength={rows.length || 0}
          currentPage={currentPages!}
          totalPages={totalPages || 1}
          handlePageChange={onPageChange!}
          isArabic={isArabic}
        />
      </div>
    );
  };

  // Main table component
  const tableContent = (
    <div className="block">
      <div className="w-full">
        {renderHeader()}
        <div
          className={`overflow-x-auto ${
            withPagination ? "" : "max-h-[300px] overflow-y-auto"
          } mt-4 border rounded-[10px] border-secondary-100 whitespace-nowrap table-scroll-container ${wrapperClassName || ""}`}
        >
          <table className={`w-full table-auto border-collapse ${classTable || ""}`}>
            <thead
              className={`bg-aeblack-50 gap-4 border-collapse rounded-[10px] sticky top-0 z-20 ${classHeader || ""}`}
            >
              <tr className={`text-sm font-normal text-aeblack-400 ${classRowHeader || ""} ${headerClass}`}>
                {headers.map((header, index) => {
                  const width = `${100 / headers.length}%`;
                  return (
                    <th
                      key={index}
                      className={`p-4 font-normal border-0 text-start text-aeblack-700 sticky top-0 bg-aeblack-50 ${classHeaderData}`}
                      style={{ width }}
                    >
                      {header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>{renderTableContent()}</tbody>
          </table>
          {footer}
        </div>
        {renderPagination()}
      </div>
    </div>
  );

  return withCustomCard ? (
    <div className="shadow-card p-5 rounded-lg border border-slate-100">{tableContent}</div>
  ) : (
    tableContent
  );
};
