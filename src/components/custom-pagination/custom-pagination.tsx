import React, { FC } from 'react';
import arrow from "../../assets/images/paginated-arrow.svg";

interface IPaginationProps {
    totalPages: number;
    currentPage: number;
    handlePageChange: (pageNumber: number) => void;
    itemsLength: number;
    isArabic: boolean;
}

/**
 * CustomPagination Component
 *
 * A pagination component that allows users to navigate through pages of content.
 * It displays page numbers and provides controls for switching between pages.
 *
 * @component
 * @param {number} totalPages - The total number of pages available for pagination.
 * @param {number} currentPage - The current page number that is being viewed.
 * @param {(pageNumber: number) => void} handlePageChange - A callback function that handles page number changes.
 * @param {number} itemsLength - The total number of items to be paginated.
 * @param {boolean} isArabic - If `true`, the pagination layout is adjusted for right-to-left (RTL) reading.
 * @returns {JSX.Element} The rendered pagination component.
 */

export const CustomPagination: FC<IPaginationProps> = ({ totalPages = 0, itemsLength, currentPage, handlePageChange, isArabic }) => {

    // if (totalPages <= 1 || items?.length === 0) {
    //     return null;
    // }

    if (itemsLength === 0) {
        return null;
    }

    const handlePrevClick = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const getDisplayedPages = () => {
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, currentPage + 1);

        if (currentPage === 1) {
            endPage = Math.min(totalPages, 3); // First 3 pages
        } else if (currentPage === totalPages) {
            startPage = Math.max(1, totalPages - 2); // Last 3 pages
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const displayedPages = getDisplayedPages();

    return (<>
        {/* {displayedPages.length > 1 && */}
        <div className='flex justify-end mt-4'>
            <div className="aegov-pagination" role="navigation">
                {/* Previous Arrow */}
                {/* {currentPage > 1 && totalPages > 3 && ( */}
                <div
                    className={`flex items-center ml-2 mr-2 justify-center border rounded-sm cursor-pointer aegov-pagination-previous border-whitely-500 max-sm:w-10 ${!isArabic ? "rotate-180" : ""}`}
                    rel="prev" aria-label="Previous Page" onClick={handlePrevClick}>
                    <img src={arrow} alt="prev" width={20} />
                </div>
                {/* )} */}

                {/* <span className="sm:hidden">
                    {i18n.t("Pagination.PageNumber")} {currentPage} {i18n.t("Pagination.From")} {totalPages}
                </span> */}

                {/* Page Numbers */}
                <div className='flex flex-wrap justify-center gap-2 m-0 '>
                    {displayedPages.map((pageNumber) => (
                        pageNumber === currentPage ? (
                            <span
                                key={pageNumber}
                                aria-current="page"
                                className="cursor-pointer aegov-pagination-current bg-aegold-100 text-aegold-600 max-sm:w-[px32]"
                            >
                                {pageNumber}
                            </span>
                        ) : (
                            <span
                                key={pageNumber}
                                className="cursor-pointer aegov-pagination-page aegov-pagination-smaller max-sm:w-[32px]"
                                title={`Page ${pageNumber}`}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </span>
                        )
                    ))}
                </div>


                {/* Next Arrow */}
                {/* {currentPage < totalPages - 1 && totalPages > 3 && ( */}
                <div
                    className={`flex items-center justify-center ml-2 mr-2 border rounded-sm cursor-pointer aegov-pagination-next border-whitely-500 max-sm:w-10 ${isArabic ? "rotate-180" : ""}`}
                    rel="next"
                    aria-label="Next Page"
                    onClick={handleNextClick}
                >
                    <img src={arrow} alt="next" width={20} />
                </div>
                {/* )} */}
            </div>
        </div>
        {/* } */}
    </>
    );
};
