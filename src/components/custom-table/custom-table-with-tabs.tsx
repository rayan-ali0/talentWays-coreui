import React, { useState } from "react";
import { TableSkeleton } from "../skeleton/table-skeleton";
import Empty from "../../assets/images/emtpy-state-table.png";
import { CustomSearch } from "../custom-search/custom-search";
import PlusIcon from "../../assets/images/add-white.svg";
import ArrowIcon from "../../assets/images/arrow.svg";

import { CustomPagination } from "../custom-pagination/custom-pagination";
import { TableHeader } from "./headers/table-header";
import { CustomSystemTabs } from "../custom-system-tabs/custom-system-tabs";
import {type TableCell } from "./custom-table";

export interface ICustomTableWithTabsProps {
  headers: string[];
  rows: Array<TableCell>;
  loading?: boolean;
  wrapperClassName?: string;
  classTable?: string;
  classHeader?: string;
  classRow?: string;
  classRowHeader?: string;
  classHeaderData?: string;
  title?: string;
  buttonActionText?: string;
  navigationText?: string;
  navigationAction?: () => void;
  buttonAction?: () => void;
  handleSearch?: (keyword: string) => void;
  withHeaders?: boolean;
  totalPages?: number;
  currentPages?: number;
  onPageChange?: (page: number) => void;
  searchLabel?: string;
  withPagination?: boolean;
  isArabic: boolean;
  searchPlaceholder?: string;
  activeTab?: number;
  setActiveTab?: (key: number) => void;
  tabs?: any[];
  noBorder?: boolean;
}

/**
 * CustomTableWithTabs Component
 *
 * Displays a table with configurable headers, rows, and optional pagination,
 * along with tabs functionality to toggle between different views or content.
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
 * @param {string} [navigationText] - Text to be displayed for navigation (if any).
 * @param {() => void} [navigationAction] - Callback function to handle navigation actions.
 * @param {() => void} [buttonAction] - Callback function to handle button actions.
 * @param {(keyword: string) => void} [handleSearch] - Callback function to handle search input changes.
 * @param {boolean} [withHeaders] - If `true`, the table will display headers.
 * @param {number} [totalPages] - The total number of pages available for pagination.
 * @param {number} [currentPages] - The current page being displayed.
 * @param {(page: number) => void} [onPageChange] - Callback function to handle pagination page changes.
 * @param {string} [searchLabel] - Label for the search input field.
 * @param {boolean} [withPagination] - If `true`, the table will include pagination controls.
 * @param {boolean} isArabic - If `true`, the table will support right-to-left (RTL) text alignment for Arabic languages.
 * @param {string} [searchPlaceholder] - Placeholder text for the search input field.
 * @param {number} [activeTab] - The index of the currently active tab.
 * @param {(key: number) => void} [setActiveTab] - Callback function to set the active tab when a tab is clicked.
 * @param {any[]} [tabs] - An array of tabs that will be displayed, each with its own content.
 * @param {boolean} [noBorder] - If `true`, the table will not have borders around the cells.
 * @returns {JSX.Element} The rendered custom table with tabs component.
 */

export const CustomTableWithTabs: React.FC<ICustomTableWithTabsProps> = ({
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
  buttonActionText,
  buttonAction,
  navigationText,
  navigationAction,
  handleSearch,
  withHeaders,
  totalPages,
  currentPages,
  onPageChange,
  searchLabel,
  withPagination = false,
  isArabic,
  searchPlaceholder,
  activeTab,
  tabs,
  setActiveTab,
  noBorder,
}) => {
  const [keyword, setkeyword] = useState<string>("");

  const headerClass = () => {
    return isArabic ? "text-right" : "text-left";
  };
  const withHeaderStyles = !buttonAction && !navigationAction && handleSearch ? "flex-wrap gap-2" : "";

  return (
    <div className="block" dir={isArabic ? "rtl" : "ltr"}>
      <div className="w-full">
        {withHeaders && (
          <div className={`flex  ${title ? 'flex-col-reverse' : 'max-md:flex-col justify-between'}`}>
            <div className="w-full">
              {tabs && (
                <CustomSystemTabs noBorder={noBorder} tabs={tabs!} activeTab={activeTab!} onTabClick={setActiveTab!} />
              )}
            </div>

            <div className={`flex max-md:flex-col gap-4  justify-between items-center max-md:items-start  ${withHeaderStyles}`}>
              {title && (
                <div className="md:flex-row">
                  <TableHeader title={title} isArabic={isArabic} />
                </div>
              )}
              <div className="flex max-md:flex-col gap-4 items-center max-md:items-start max-md:w-full">
                {buttonAction && buttonActionText && (
                  <button className="aegov-btn btn-sm w-full md:w-auto" type="button" onClick={buttonAction}>
                    <img src={PlusIcon} />
                    {buttonActionText}
                  </button>
                )}
                {navigationText && navigationAction && (
                  <div
                    className="flex text-[#B68A36] text-sm gap-1 cursor-pointer relative items-center w-full md:w-auto"
                    onClick={navigationAction}
                  >
                    <div>{navigationText}</div>
                    <div>
                      <img src={ArrowIcon} alt="" className={`${isArabic ? "" : "rotate-180"}`} />
                    </div>
                  </div>
                )}
                {handleSearch && (
                  <div className="flex max-md:flex-col gap-4 w-full md:w-auto">
                    <CustomSearch
                      disabled={loading}
                      value={keyword}
                      onChange={(value) => {
                        setkeyword(value || "");
                      }}
                      placeholder={searchPlaceholder || searchLabel}
                      className="w-full md:w-auto"
                    />

                    <button
                      disabled={loading}
                      className="aegov-btn btn-sm btn-outline max-md:w-full"
                      type="button"
                      onClick={() => handleSearch(keyword)}
                    >
                      {searchLabel}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div
          className={`overflow-x-auto max-h-[300px] overflow-y-auto mt-2 border rounded-[10px] border-secondary-100 whitespace-nowrap ${wrapperClassName || ""}`}
        >
          <table className={`w-full table-auto border-collapse  ${classTable ? classTable : ""}`}>
            <thead className={`bg-aeblack-50 gap-4 border-collapse rounded-[10px] ${classHeader ? classHeader : ""}`}>
              <tr
                className={`text-sm font-normal text-aeblack-400  ${classRowHeader ? classRowHeader : ""} ${headerClass()} `}
              >
                {headers.map((header, index) => {
                  const width = `${100 / headers.length}%`;
                  return (
                    <th
                      key={index}
                      className={`p-3 font-normal border-0 text-start text-aeblack-700 ${classHeaderData}`}
                      style={{ width: width }}
                    >
                      {header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {loading == true ? (
                <tr>
                  <td colSpan={6}>
                    <TableSkeleton columnNumber={headers.length} rowNumber={1} isArabic={isArabic} />
                  </td>
                </tr>
              ) : !loading && rows.length > 0 ? (
                rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`text-sm ${rows.length - 1 == rowIndex ? "" : "border-b"} border-secondary-100 ${classRow ? classRow : ""}`}
                  >
                    {row?.cells?.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`p-3 font-normal border-0 text-start text-aeblack-700 ${cell?.length > 40 && "max-w-[40ch]"}  sm:text-wrap`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={headers.length} className="text-center">
                    <img src={Empty} alt="empty" className="inline-block m-auto" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {withPagination && (
          <div className="flex justify-end mt-3">
            <CustomPagination
              itemsLength={rows.length || 0}
              currentPage={currentPages!}
              totalPages={totalPages || 1}
              handlePageChange={onPageChange!}
              isArabic={isArabic}
            />
          </div>
        )}
      </div>
    </div>
  );
};
