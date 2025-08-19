import React, { FC } from "react";

interface ICustomStatusProps {
    text: string | JSX.Element,
    status: IStatus
}

export enum IStatus {
    Active = 1,
    InActive = 2
}

/**
 * CustomStatus Component
 *
 * Displays a status message with a customizable text and a status type. 
 * The status type determines the style and appearance of the status message.
 *
 * @component
 * @param {string | JSX.Element} text - The text to be displayed within the status component.
 * @param {IStatus} status - The status type that determines the style and appearance of the message.
 * @returns {JSX.Element} The rendered custom status component.
 */

export const CustomStatus: FC<ICustomStatusProps>
    = ({ status, text }) => {

        function getRequestStatusClassName() {
            if (status == IStatus.Active)
                return "bg-aegreen-50 text-aegreen-500";
            if (status == IStatus.InActive)
                return "bg-aered-50 text-aered-500"
        }

        return (
            <span className={`block py-1 px-2.5 h-fit w-max rounded-md ${getRequestStatusClassName()} `}>
                {text}
            </span>

        )
    }