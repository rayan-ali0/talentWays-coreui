import React, { FC } from "react";
import warningIcon from "../../assets/images/warning.svg";
import SuccessIcon from "../../assets/images/green-tick.svg";



export interface IConfirmationDialogProps {
  title: string;
  description?: any;
  confirmLabel?: string;
  rejectLabel?: string;
  continueLabel?: string,
  successConfirmation?: boolean,
  onContinue?: () => void,
  onConfirm?: () => void;
  onReject?: () => void;
  onClose?: () => void
}

/**
 * ConfirmationDialog Component
 *
 * Renders a confirmation dialog with customizable labels, description, and actions.
 * This component can display different options based on the context, such as confirming,
 * rejecting, or continuing an action. It also supports an optional success confirmation state.
 *
 * @param {string} title - The title of the dialog displayed prominently at the top.
 * @param {any} description - An optional description or message providing additional details.
 * @param {string} confirmLabel - Label for the confirm button; defaults to a standard label if not provided.
 * @param {string} rejectLabel - Label for the reject button; defaults to a standard label if not provided.
 * @param {string} continueLabel - Label for the continue button; can be customized for specific actions.
 * @param {boolean} successConfirmation - If `true`, indicates that the dialog represents a successful action.
 * @param {() => void} onContinue - Callback function executed when the continue button is clicked.
 * @param {() => void} onConfirm - Callback function executed when the confirm button is clicked.
 * @param {() => void} onReject - Callback function executed when the reject button is clicked.
 * @param {() => void} onClose - Callback function executed when the X close button is clicked.
 * @returns {JSX.Element} The rendered confirmation dialog component.
 */

export const ConfirmationDialog: FC<IConfirmationDialogProps> = ({ title, description, confirmLabel, rejectLabel, continueLabel, successConfirmation, onContinue, onConfirm, onReject, onClose }) => {
  return (
    <div className="z-50 flex items-center justify-center min-h-screen bg-opacity-50 aegov-modal bg-aeblack-950" role="dialog">
      <div className="relative flex justify-center w-10/12 max-h-full max-md:w-full">
        <div className="w-3/4 px-4 py-4 overflow-y-auto aegov-modal-wrapper min-w-1/2 bg-whitely-100 md:py-5 xl:py-12 xl:px-6 ">

          {onClose &&
            <button type="button" className="aegov-modal-close top-2 xl:top-6 end-3 " onClick={onClose}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.40898 7.99915L15.7044 1.71303C15.8926 1.52485 15.9983 1.26961 15.9983 1.00347C15.9983 0.737334 15.8926 0.482097 15.7044 0.29391C15.5162 0.105723 15.261 0 14.9949 0C14.7288 0 14.4736 0.105723 14.2854 0.29391L8 6.59002L1.71456 0.29391C1.52639 0.105723 1.27118 2.36288e-07 1.00507 2.38271e-07C0.738961 2.40254e-07 0.483751 0.105723 0.295584 0.29391C0.107417 0.482097 0.0017056 0.737334 0.0017056 1.00347C0.0017056 1.26961 0.107417 1.52485 0.295584 1.71303L6.59102 7.99915L0.295584 14.2853C0.201924 14.3782 0.127583 14.4887 0.0768515 14.6105C0.0261196 14.7323 0 14.8629 0 14.9948C0 15.1268 0.0261196 15.2574 0.0768515 15.3792C0.127583 15.5009 0.201924 15.6115 0.295584 15.7044C0.38848 15.7981 0.499001 15.8724 0.620772 15.9231C0.742543 15.9739 0.873154 16 1.00507 16C1.13699 16 1.2676 15.9739 1.38937 15.9231C1.51114 15.8724 1.62166 15.7981 1.71456 15.7044L8 9.40828L14.2854 15.7044C14.3783 15.7981 14.4889 15.8724 14.6106 15.9231C14.7324 15.9739 14.863 16 14.9949 16C15.1268 16 15.2575 15.9739 15.3792 15.9231C15.501 15.8724 15.6115 15.7981 15.7044 15.7044C15.7981 15.6115 15.8724 15.5009 15.9232 15.3792C15.9739 15.2574 16 15.1268 16 14.9948C16 14.8629 15.9739 14.7323 15.9232 14.6105C15.8724 14.4887 15.7981 14.3782 15.7044 14.2853L9.40898 7.99915Z" fill="#AF8C45" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          }
          <div>
            <div className={`flex ${description ? 'items-start' :'items-center'}  gap-4 mt-6`}>
              <img src={successConfirmation ? SuccessIcon : warningIcon} alt="Warning icon" />
              <div className="sm:mt-0">
                <div className="text-lg font-bold md:text-3xl text-aeblack-950" id="modal-title">
                  {title}
                </div>
                {description && (
                  <div className="mt-4">
                    <div className="mb-0 text-base font-normal break-all text-aeblack-500" id="modal-description">
                      {description}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={`lg:mt-12 sm:mt-6 mt-4 flex flex-wrap sm:flex-row gap-4 justify-center items-center md:justify-end`}>
              {confirmLabel && onConfirm && (
                <button type="button" className="font-normal rounded aegov-btn min-w-36 btn-xs md:btn-base" onClick={onConfirm}>
                  {confirmLabel}
                </button>
              )}
              {rejectLabel && onReject && (
                <button data-modal-hide="modal-simple-alert" type="button" className="font-normal rounded aegov-btn min-w-36 btn-xs md:btn-base btn-outline " onClick={onReject}>
                  {rejectLabel}
                </button>
              )}

              {continueLabel && onContinue && (
                <button data-modal-hide="modal-simple-alert" type="button" className="font-normal rounded aegov-btn min-w-36 btn-xs md:btn-base btn-outline " onClick={onContinue}>
                  {continueLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
