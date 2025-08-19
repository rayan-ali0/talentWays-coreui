import React from "react";

import successIcon from "../../../assets/images/success-dialog-icon.svg";
import errorIcon from "../../../assets/images/error-dialog-icon.svg";

/**
 * SuccessDialog Component
 *
 * A modal component that displays a confirmation dialog with a title, message, and action buttons.
 * It provides a customizable description, confirm and cancel actions, and an optional loading state.
 *
 * @component
 * @param {string} title - The title displayed at the top of the modal.
 * @param {ReactNode} description - The content to be displayed inside the modal, which can be a string or a React component.
 * @param {string} continueLabel - The text for the success button.
 * @param {() => void} continueAction - A callback function triggered when the success button is clicked.
 * @param {string} cancelLabel - The text for the cancel button.
 * @param {() => void} cancelAction - A callback function triggered when the cancel button is clicked.
 * @param {boolean} [isLoading] - Optional boolean that disables buttons when set to `true`, indicating a loading state.
 * @returns {JSX.Element} The rendered confirmation modal component.
 */

interface IDialogProps {
  title: string;
  description?: React.ReactNode;
  cancelLabel?: string;
  cancelAction?: () => void;
  continueLabel: string;
  continueAction: () => void;
  type: "error" | "success";
  icon?: React.ReactNode;
  isLoading?: boolean;
}
export const Dialog: React.FC<IDialogProps> = ({
  title,
  description,
  cancelAction,
  cancelLabel,
  continueAction,
  continueLabel,
  isLoading,
  icon,
  type,
}) => {
  const isDescriptionComponent = React.isValidElement(description);

  const renderDescription = () => {
    return isDescriptionComponent ? (
      <div className="text-base font-normal text-aeblack-500">{description}</div>
    ) : (
      <p className="text-base font-normal text-aeblack-500 mb-0">{description}</p>
    );
  };

  const renderIcon = () => {
    if (icon) return icon;

    return type === "error" ? <img src={errorIcon} alt="error" /> : <img src={successIcon} alt="success" />;
  };
  return (
    <div
      aria-hidden={false}
      tabIndex={-1}
      className="z-50 flex justify-center min-h-screen bg-opacity-50 items-center aegov-modal bg-aeblack-950"
      role="dialog"
    >
      <div className="relative max-md:w-full lg:w-5/12 md:w-7/12 max-h-full">
        <div className="aegov-modal-wrapper w-full p-4 md:p-5 xl:p-6">
          <div>
            <div>
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                 {renderIcon()}
              </div>
              <div className="mt-3 text-center sm:mt-6">
                <h3 className="text-lg font-bold text-aeblack-900">{title}</h3>
                <div className="mt-4">{description && renderDescription()}</div>
              </div>
            </div>
            <div className="mt-6 md:mt-7 xl:mt-8 flex flex-row-reverse gap-3 justify-center max-sm:flex-col">
              {continueLabel && continueAction && (
                <button
                  type="button"
                  className="aegov-btn max-sm:w-full min-w-32"
                  onClick={continueAction}
                  disabled={isLoading}
                >
                  {continueLabel}
                </button>
              )}
              {cancelAction && cancelLabel && (
                <button
                  type="button"
                  className="aegov-btn btn-soft max-sm:w-full min-w-32"
                  onClick={cancelAction}
                  disabled={isLoading}
                >
                  {cancelLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
