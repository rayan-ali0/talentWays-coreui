import React, { FC } from "react";
import InfoIcon from "../../assets/images/info-tooltip-icon.svg";
import { Text, TextType } from "../custom-text/custom-text";

interface ITooltipOption {
    title: string,
    description: string
}

export interface ICheckBoxOptionItem {
    name: string,
    value: string,
    checked: boolean
}

interface ICustomCheckBoxesProps {
    tooltipData?: ITooltipOption[],
    isArabic: boolean,
    options: ICheckBoxOptionItem[],
    disabled?: boolean,
    onSelectOption?: (option: ICheckBoxOptionItem) => any,
    label?: string,
    required?: boolean
    className?: string
}

interface IToolTipParagraphProps {
    option: ITooltipOption;
    isArabic: boolean
}

const ToolTipParagraph: FC<IToolTipParagraphProps> = ({ option, isArabic }) => {
    return <div>
        <Text className="text-xs font-bold text-aeblack-900" as={TextType.SPAN} text={option.title} isArabic={isArabic} />
        <p className="mb-0 text-xs text-aeblack-900">{option.description}</p>
    </div>
}

/**
 * CustomCheckBoxes Component
 *
 * Renders a customizable set of checkboxes with optional tooltips for each option, RTL layout support, and a selection callback.
 * This component can be disabled, has a configurable label, and optionally indicates required fields.
 *
 * 
 * @param {ITooltipOption[]} [tooltipData] - Optional array of tooltip data for each checkbox, providing additional information on hover.
 * @param {boolean} isArabic - If `true`, displays the checkboxes in a right-to-left (RTL) layout for Arabic content.
 * @param {ICheckBoxOptionItem[]} options - Array of checkbox options to display, each containing a label and value.
 * @param {boolean} [disabled] - If `true`, disables all checkboxes in the component.
 * @param {(option: ICheckBoxOptionItem) => void} [onSelectOption] - Callback function triggered when a checkbox is selected, with the selected option as an argument.
 * @param {string} [label] - Optional label displayed above the checkbox group to describe its purpose.
 * @param {boolean} [required] - If `true`, displays a required indicator (e.g., an asterisk) next to the label.
 * @returns {JSX.Element} The rendered custom checkboxes component.
 */

export const CustomCheckBoxes: FC<ICustomCheckBoxesProps> = function _CustomInput({ tooltipData, options, isArabic, label, onSelectOption, disabled = false, required = false, className = "" }) {

    return (
        <div className="aegov-form-control">
            <div className="relative flex gap-2">
                {tooltipData && tooltipData?.length > 0 && <>
                    <button data-tooltip-target="tooltip-top" data-tooltip-placement="top" type="button" className="peer"><img src={InfoIcon} /></button>

                    <div id="tooltip-top" role="tooltip" className="absolute bottom-full z-[100] aegov-tooltip peer-hover:visible peer-hover:opacity-100  translate-x-2 !bg-techblue-50 grid grid-cols-2  gap-3 hover:visible hover:opacity-100">
                        {tooltipData.map((parag: ITooltipOption, index: number) => { return <ToolTipParagraph key={index} isArabic={isArabic} option={parag} /> })}
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </>}

                {label && <label className={`font-semibold ${required ? " required" : ""}`} >{label}</label>}

            </div>
            <div className={`${className ? className : "flex justify-between gap-4 mt-2"}`}>
                {options.map((action: ICheckBoxOptionItem, index: number) => {
                    return (
                        <div className="input-checkBox-item" key={index}>
                            <div className="flex items-center gap-2">
                                <input
                                    className={disabled && action.checked ? "bg-aeblack-200" : ""}
                                    disabled={disabled}
                                    checked={action.checked}
                                    onClick={onSelectOption ? () => {
                                        onSelectOption(action)
                                    } : undefined}
                                    onChange={() => { }}
                                    id={index + ""} type="checkbox" value="" />
                                <label className="input-checkBox-item-label" htmlFor={action.value}>{action.name}</label>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}