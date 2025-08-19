import React from "react";
import warningIcon from "../../../assets/images/warning-alert-icon.svg";
import { Button } from "../../custom-button/custom-button";

/**
 * ConfirmationModal Component
 *
 * A modal component that displays a confirmation dialog with a title, message, and action buttons.
 * It provides a customizable description, confirm and cancel actions, and an optional loading state.
 *
 * @component
 * @param {string} title - The title displayed at the top of the modal.
 * @param {ReactNode} description - The content to be displayed inside the modal, which can be a string or a React component.
 * @param {string} confirmLabel - The text for the confirm button.
 * @param {() => void} confirmAction - A callback function triggered when the confirm button is clicked.
 * @param {string} cancelLabel - The text for the cancel button.
 * @param {() => void} cancelAction - A callback function triggered when the cancel button is clicked.
 * @param {boolean} [isLoading] - Optional boolean that disables buttons when set to `true`, indicating a loading state.
 * @returns {JSX.Element} The rendered confirmation modal component.
 */

interface IConfirmationDialogProps {
  title: string;
  description?: React.ReactNode;
  cancelLabel?: string;
  cancelAction?: () => void;
  confirmLabel: string;
  confirmAction: () => void;
  isLoading?: boolean;
}
export const ConfirmationModal: React.FC<IConfirmationDialogProps> = ({
  title,
  description,
  confirmLabel,
  confirmAction,
  cancelAction,
  cancelLabel,
  isLoading = false,
}) => {
  const isDescriptionComponent = React.isValidElement(description);

  const renderDescription = () => {
    return isDescriptionComponent ? (
      <div className="text-base font-normal text-aeblack-500 mb-0">{description}</div>
    ) : (
      <p className="text-base font-normal text-aeblack-500 mb-0">{description}</p>
    );
  };
  return (
    <div
      aria-hidden={false}
      tabIndex={-1}
      className="z-50 flex justify-center min-h-screen bg-opacity-50 items-center aegov-modal bg-aeblack-950"
      role="dialog"
    >
      <div className="relative max-md:w-full lg:w-5/12 md:w-7/12 max-h-full">
        <div className="aegov-modal-wrapper p-4 md:p-5 xl:p-6 w-full">
          <div>
            <div className="sm:flex gap-4">
              <div>
                <div className="bg-primary-100 mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0">
                  <img src={warningIcon} />
                </div>
              </div>
              <div className="mt-2 max-sm:text-center sm:mt-0">
                <h3 className="text-lg font-bold text-aeblack-950 mt-2">{title}</h3>
                <div className="mt-3">{renderDescription()}</div>
              </div>
            </div>
            <div className="mt-6 md:mt-7 xl:mt-8 flex flex-row-reverse gap-3 max-sm:flex-col">
              {confirmLabel && confirmAction && (
                <Button
                  type="button"
                  className="aegov-btn max-sm:w-full min-w-32"
                  onclick={confirmAction}
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  text={confirmLabel}
                />
              )}
              {cancelAction && cancelLabel && (
                <Button
                  text={cancelLabel}
                  type="button"
                  className="aegov-btn btn-soft max-sm:w-full min-w-32"
                  onclick={cancelAction}
                  isDisabled={isLoading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
