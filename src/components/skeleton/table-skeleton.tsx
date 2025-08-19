import React from 'react';
import ContentLoader from 'react-content-loader';

interface ITableSkeletonProps {
    columnNumber: number,
    rowNumber: number,
    isArabic: boolean
}

/**
 * `TableSkeleton` is a skeleton loader component that renders a placeholder table UI with a specified number of rows and columns.
 * It supports RTL (Right-to-Left) or LTR (Left-to-Right) layouts based on the `isArabic` prop.
 * 
 * @param {number} columnNumber - The number of columns in the skeleton table.
 * @param {number} rowNumber - The number of rows in the skeleton table.
 * @param {boolean} isArabic - A boolean indicating whether the layout should be in Arabic (RTL). If `true`, the layout will be right-to-left.
 * 
 * @returns {JSX.Element} The rendered skeleton table component with placeholder rows and columns.
 */

export const TableSkeleton: React.FC<ITableSkeletonProps> = ({ columnNumber, rowNumber, isArabic }) => {

    const columns = Array.from({ length: columnNumber }, (_, i) => i); // Create an array based on columnNumber
    const rows = Array.from({ length: rowNumber }, (_, i) => i); // Create an array based on rowNumber
    return (
        <ContentLoader rtl={isArabic}
            speed={2}
            width={"100%"}
            height={80} // Adjust height based on the number of rows
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            {/* Table Header */}
            {columns.map((col, i) => (
                <rect
                    key={`header-${i}`}
                    x={`${10 + i * (80 / columnNumber)}%`} // Adjust column spacing based on columnNumber
                    y="10"
                    rx="3"
                    ry="3"
                    width={`${70 / columnNumber}%`} // Adjust column width based on columnNumber
                    height="20"
                />
            ))}

            {/* Table Rows */}
            {rows.map((row, rowIndex) => (
                columns.map((col, colIndex) => (
                    <rect
                        key={`row-${rowIndex}-col-${colIndex}`}
                        x={`${10 + colIndex * (80 / columnNumber)}%`} // Adjust column spacing based on columnNumber
                        y={`${50 + rowIndex * 40}`} // Adjust row spacing with additional space
                        rx="3"
                        ry="3"
                        width={`${70 / columnNumber}%`} // Adjust column width based on columnNumber
                        height="20"
                    />
                ))
            ))}
        </ContentLoader>
    );
};
