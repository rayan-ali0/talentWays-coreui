import React, { FC, ReactNode } from "react";

interface ButtonProps {
    text: string;
    onclick?: () => void;
    isDisabled?: boolean;
    className?: string;
    isLoading?: boolean;
    type?: "button" | "submit" | "reset";
    icon?: ReactNode;
    formName?: string;
    isArabic?: boolean;
    positionIcon?: "left" | "right";
}

/**
 * Button Component
 *
 * Renders a button with customizable text, style, and optional icon.
 * Supports various types (button, submit, reset), an optional outline style, and a disabled state.
 *
 * @param {string} text - The text displayed on the button.
 * @param {boolean} [isLoading=false] - If `true`, displays a loading indicator on the button.
 * @param {() => void} [onClick] - An optional callback function triggered when the button is clicked.
 * @param {boolean} [isDisabled=false] - If `true`, disables the button, preventing clicks and styling it as disabled.
 * @param {string} [className] - Additional CSS classes for custom styling of the button.
 * @param {"button" | "submit" | "reset"} [type="button"] - Specifies the button's type attribute.
 * @param {ReactNode} [icon] - Icon element displayed next to the button text, if provided.
 * @param {"left" | "right"} [positionIcon="left"] - Position of the icon relative to the text.
 * @returns {JSX.Element} The rendered button component.
 */

export const Button: FC<ButtonProps> = ({
    text,
    onclick,
    className,
    isDisabled = false,
    type = "button",
    isLoading = false,
    icon,
    formName,
    positionIcon = "left",
}) => {
    return (
        <button
            disabled={isDisabled || isLoading}
            className={`aegov-btn min-w-32 flex items-center  ${className}`}
            type={type}
            form={formName}
            onClick={onclick}
        >
            {positionIcon === "left" && icon && !isLoading && (
                <span className="me-2">{icon}</span>
            )}
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                text
            )}
            {positionIcon === "right" && icon && !isLoading && (
                <span className="ms-2">{icon}</span>
            )}
        </button>
    );
};
