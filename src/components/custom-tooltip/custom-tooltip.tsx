import React, { ReactNode } from 'react'

interface CustomTooltipProps {
    children: ReactNode | string;
    placement: "top" | "bottom" | "left" | "right";
    bgColor: string;
    isArabic: boolean
    width?: string,
}
/**
* CustomTooltip Component
*
* A reusable tooltip component for displaying additional information when users hover over or focus on an element. 
* Supports customizable placement and background color.
*
* @component
* @param {ReactNode | string} children - The content to display inside the tooltip. Can be plain text or a React node.
* @param {"top" | "bottom" | "left" | "right"} placement - The position of the tooltip relative to the target element.
* @param {string} bgColor - The background color of the tooltip, defined as a CSS color value (e.g., "#ffffff", "red").
* @returns {JSX.Element} A styled tooltip component with the specified properties.
*
* @example
* <div className="relative">
* <div className="peer"></div> // Item to be hovered
*     <CustomTooltip placement="top" bgColor="bg-aeblack-400">
*       Tooltip content here
*     </CustomTooltip>
* <div>
*/



export const CustomTooltip: React.FC<CustomTooltipProps> = ({ children, placement, bgColor, isArabic, width }) => {
    const getPlacement = () => {
        switch (placement) {
            case "bottom":
                return `top-full ${isArabic ? "translate-x-1/2" : "-translate-x-1/2"} mt-2`;
            case "top":
                return `bottom-full ${isArabic ? "translate-x-1/2" : "-translate-x-1/2"} mb-2`;
            case "left":
                return 'right-full -translate-x-1 -top-full';
            case "right":
                return 'left-full translate-x-1 -top-full';
        }
    }

    const arrowPlacement = () => {
        switch (placement) {
            case "bottom":
                return 'start-1/2 top-0 -translate-y-1';
            case "top":
                return 'start-1/2';
            case "left":
                return 'left-full -translate-x-3 top-1/4';
            case "right":
                return 'right-full translate-x-3 top-1/4';
        }
    }

    return (
        <div
            id="tooltip-default"
            data-tooltip-placement={placement}
            role="tooltip"
            className={`z-10 aegov-tooltip absolute ${getPlacement()} ${bgColor} peer-hover:visible peer-hover:opacity-100 hover:visible hover:opacity-100 ${width || "w-60"} m-1`}
        >
            {children}
            <div className={`tooltip-arrow ${arrowPlacement()}`} data-popper-arrow></div>
        </div>
    )
}