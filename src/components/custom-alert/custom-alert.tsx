import React, { useState } from "react";
import infoClose from "../../assets/images/info-alert-close.svg";
import infoIcon from "../../assets/images/info-alert.svg";
import warningIcon from "../../assets/images/alert-warning-icon.svg";
import errorIcon from "../../assets/images/error-alert-icon.svg";
import successIcon from "../../assets/images/success-alert-icon.svg";
import errorClose from "../../assets/images/error-close.svg";
import successClose from "../../assets/images/success-close.svg";
import warningClose from "../../assets/images/warning-alert-close.svg";
import { cn } from "../../helpers/function-helper";

interface CustomAlertProps {
  text: string;
  type: "info" | "error" | "success" | "warning";
  contentClassName?: string;
  withCancel?: boolean;
  action?: () => void;
  actionLabel?: string;
}

export enum AlertType {
  Info = "info",
  Error = "error",
  Success = "success",
  Warning = "warning",
}

const InfoIconClose = () => <img src={infoClose} />;
const WarningIconClose = () => <img src={warningClose} />;
const ErrorIconClose = () => <img src={errorClose} />;
const SuccessIconClose = () => <img src={successClose} />;
const InfoIcon = () => <img src={infoIcon} />;
const ErrorIcon = () => <img src={errorIcon} />;
const SuccessIcon = () => <img src={successIcon} />;
const WarningIcon = () => <img src={warningIcon} />;
export const icons = [
  {
    type: AlertType.Info,
    component: InfoIcon,
  },
  {
    type: AlertType.Error,
    component: ErrorIcon,
  },
  {
    type: AlertType.Warning,
    component: WarningIcon,
  },
  {
    type: AlertType.Success,
    component: SuccessIcon,
  },
];

export const closeIcons = [
  {
    type: AlertType.Info,
    component: InfoIconClose,
  },
  {
    type: AlertType.Error,
    component: ErrorIconClose,
  },
  {
    type: AlertType.Warning,
    component: WarningIconClose,
  },
  {
    type: AlertType.Success,
    component: SuccessIconClose,
  },
];

/**
 * CustomAlert Component
 *
 * Displays an alert message with customizable text, type, and optional action.
 * Supports various alert types (info, error, success, warning) and an optional cancel button.
 *
 * @param {string} text - The main message text displayed in the alert.
 * @param {"info" | "error" | "success" | "warning"} type - The type of alert, which determines the style and icon.
 * @param {boolean} [withCancel] - If `true`, displays a cancel button alongside the alert message.
 * @param {() => void} [action] - An optional callback function that executes when an action button is clicked.
 * @param {string} [actionLabel] - Label for the action button, describing the specific action.
 * @returns {JSX.Element} The rendered custom alert component.
 */

export const CustomAlert = (props: CustomAlertProps) => {
  const [hidden, setHidden] = useState(false);
  const { text, type,contentClassName, withCancel = true, action, actionLabel } = props;
  const hideAlert = () => {
    setHidden(true);
  };
  return (
    <div
      role="alert"
      id="alert-1"
      className={`aegov-alert alert-${type} flex items-center rounded-lg ${hidden ? "hidden" : ""}`}
    >
      <div className="alert-icon">
        {icons.map((icon, index) => {
          return icon.type == type && <icon.component key={index} />;
        })}
      </div>
      <div className={`alert-content alert-with-link ${cn(contentClassName)}`}>
        <p>{text}</p>
        {actionLabel && (
          <p className="alert-link cursor-pointer pl-[32px] pr-[32px]" onClick={action}>
            {actionLabel}
          </p>
        )}
      </div>

      {withCancel && (
        <div className="alert-dismiss top-3 end-3">
          <button onClick={hideAlert} className="p-0" data-dismiss-target="#alert-1" aria-label="Close">
            {closeIcons.map((icon, index) => {
              return icon.type == type && <icon.component key={index} />;
            })}
          </button>
        </div>
      )}
    </div>
  );
};
