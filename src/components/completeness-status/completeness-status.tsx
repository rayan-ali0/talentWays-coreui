import React, { FC } from "react";
import { observer } from "mobx-react";
import infoIcon from "../../assets/images/tooltipInfo.svg";
import { CustomStatus, IStatus } from "../custom-status/custom-status";
import { CustomTooltip } from "../custom-tooltip/custom-tooltip";

export interface IActivationErrorWithTranslation {
    isComplete: boolean;
    text: string;
    tooltipData: string[]
}

interface ICompletenessStatusComponentWithTooltipProps {
    activationError: IActivationErrorWithTranslation
    isArabic: boolean
}

/**
 * CompletenessStatusComponentWithTooltip Component
 *
 * Renders a status label for a request with a tooltip providing additional details about incomplete statuses.
 * The component uses a tooltip to display error messages related to request activation errors.
 *
 * @param {IActivationErrorWithTranslation} activationError - Object containing error status flags, error descriptions, and completion texts.
 * 
 * @interface IActivationErrorWithTranslation
 * @property {boolean} isComplete - Indicates if the status is completed.
  * @property {string} text - Text to be displayed.
 * @property {string[]} tooltipData - String array to be displayed in the tooltip. 
 * 
 * @returns {JSX.Element} The rendered CompletenessStatusComponentWithTooltip component.
 */

export const CompletenessStatusComponentWithTooltip: FC<ICompletenessStatusComponentWithTooltipProps>
    = observer(({ activationError, isArabic }) => {

        function getRequestStatusLabel() {
            if (activationError.isComplete == true)
                return activationError.text;
            else {
                return <div className="flex gap-2 pr-2 pl-2 relative">
                    <div data-tooltip-target="tooltip-top" data-tooltip-placement="top" className="peer"><img src={infoIcon} /></div>
                    <CustomTooltip isArabic={isArabic} placement={"top"} bgColor={"bg-techblue-50"}>
                        <div className="mb-0 text-base font-normal break-all text-aeblack-900" id="modal-description">
                            {
                                <ul className="text-start ps-2 list-disc">
                                    {activationError.tooltipData.map((text: string, index: number) => { return <li key={index}>{text} </li> }
                                    )
                                    }
                                </ul>
                            }
                        </div></CustomTooltip>

                    <span>{activationError.text
                    }</span>
                </div>
            };
        }

        return (
            <div className="flex gap-4 relative">
                <CustomStatus text={getRequestStatusLabel() || ""}
                    status={activationError.isComplete == true ? IStatus.Active : IStatus.InActive} />
            </div>

        )
    })


interface ICompletenessStatusComponentProps {
    isComplete: boolean,
    text: string,
}

/**
 * CompletenessStatusComponent
 *
 * Displays the status of a request as complete or incomplete with corresponding text labels.
 * Uses a `CustomStatus` component to visually represent the status.
 *
 * @param {boolean} isComplete - Flag indicating whether the request is complete.
 * @param {string} text - Text to display.
  *
 * @interface ICompletenessStatusComponentProps
 * @property {boolean} isComplete - Indicates if the request is complete.
 * @property {string} text - Text for the status.
 *
 * @returns {JSX.Element} The rendered CompletenessStatusComponent.
 */


export const CompletenessStatusComponent: FC<ICompletenessStatusComponentProps>
    = observer(({ isComplete, text }) => {

        return (
            <div className="flex gap-4 relative">
                <CustomStatus text={text || ""}
                    status={isComplete == true ? IStatus.Active : IStatus.InActive} />
            </div>

        )
    })