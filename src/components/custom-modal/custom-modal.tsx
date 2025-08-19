import React, { ReactNode, useEffect } from "react";
import closeIcon from "../../assets/images/close.svg";
import { PageHeader } from "../custom-headers/page-header";
import { cn, lockBodyScroll, unlockBodyScroll } from "../../helpers/function-helper";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  title: string;
  footer?: ReactNode;
  header?: ReactNode;
  isArabic?: boolean;
  removeCloseIcon?: boolean;
}

/**
 * CustomModal Component
 *
 * A modal component that displays a dialog with a title, optional footer, and customizable content.
 * It can be opened or closed based on the `open` prop and triggers a callback when closed.
 *
 * @component
 * @param {boolean} open - A boolean that determines whether the modal is visible or hidden.
 * @param {() => void} onClose - A callback function triggered when the modal is closed.
 * @param {ReactNode} children - The content to be displayed inside the modal.
 * @param {string} [className] - Optional CSS class applied to the modal for custom styling.
 *  @param {string} [headerClassName] - Optional CSS class applied to the modal header to know it's position (start or center).
 * @param {string} title - The title displayed at the top of the modal.
 * @param {ReactNode} [footer] - Optional footer content displayed at the bottom of the modal (e.g., action buttons).
 * @param {ReactNode} [header] - Optional header content displayed at the header of the modal.
 * @returns {JSX.Element} The rendered modal component.
 */

export const CustomModal = ({
  open,
  onClose,
  children,
  className,
  title,
  footer,
  header,
  headerClassName,
  removeCloseIcon = false,
  isArabic
}: ModalProps) => {
  
  useEffect(() => {
    if (open) {
      lockBodyScroll(); 
    } else {
      unlockBodyScroll();
    }
    
    return () => {
      if (open) {
        unlockBodyScroll();
      }
    };
  }, [open]);

  useEffect(() => {
    return () => {
      unlockBodyScroll();
    };
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-opacity-50 aegov-modal overflow-y-hidden bg-aeblack-950"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "bg-whitely-100 rounded-xl shadow sm:p-4 p-2 transition-all mt-6 max-h-full flex flex-col",
          className || "w-full",
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        )}
      >
        <div
          className={cn(
            "flex items-center w-full p-4 max-sm:mt-4",
            headerClassName || "justify-center"
          )}
        >
          {!removeCloseIcon && (
            <button onClick={onClose} className="absolute p-6 top-2 left-2 sm:p-5">
              <img src={closeIcon} alt="close modal" />
            </button>
          )}
          <div>
            {header ? header : (
              <h2 className={cn("text-[32px] max-md:text-xl", isArabic ? "font-alexandria" : "font-inter")}>
                {title}
              </h2>
            )}
          </div>
        </div>

        <div className="flex-grow py-4 px-2 overflow-y-auto">{children}</div>

        {footer ? <div className="mt-10 mb-5">{footer}</div> : null}
      </div>
    </div>
  );
};
