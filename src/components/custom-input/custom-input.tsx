
import React, { FC } from "react";


export interface ICustomInputProps {
    label?: string;
    name?: string;
    register?: any;
    error?: any;
    [prop: string]: any;
    classNameLabel?: string;
    inputClassName?: string;
    placeholder?: string;
}

/**
 * CustomInput Component
 *
 * A customizable input component that supports a label, placeholder, and optional error handling.
 * It also supports a dynamic set of additional props passed via `[prop: string]: any`.
 *
 * @component
 * @param {string} [label] - Optional label displayed alongside the input field.
 * @param {string} [name] - The name attribute for the input element, used for form submissions and registration.
 * @param {any} [register] - Optional method for registering the input with a form handling library (e.g., React Hook Form).
 * @param {any} [error] - Optional error message or object displayed when the input is invalid.
 * @param {string} [classNameLabel] - Optional CSS class applied to the label element.
 * @param {string} [inputClassName] - Optional CSS class applied to the input element itself.
 * @param {string} [placeholder] - Optional placeholder text displayed inside the input when it is empty.
 * @param {Object} [prop] - A catch-all for any additional props passed to the input element (e.g., `type`, `value`, etc.).
 * @returns {JSX.Element} The rendered input component.
 */

export const CustomInput: FC<ICustomInputProps> = function _CustomInput({
    label, name, placeholder, register, error, classNameLabel, inputClassName = '', ...props }) {

    return (
        <div className={error ? "aegov-form-control max-md:control-sm control-error" : "max-md:control-sm aegov-form-control"}>
            {label && <label className={`font-semibold ${props.required ? "required" : ""} ${classNameLabel ? classNameLabel : ""}`} >{label}</label>}

            <div className={`form-control-input`}>
                {register ? <input className={`rounded-md ${inputClassName} disabled:bg-aeblack-100 disabled:border-aeblack-200 disabled:placeholder:text-aeblack-300`} type={props.type || "text"} {...register(name)} {...props} placeholder={placeholder} />
                    : <input className={`rounded-md ${inputClassName} disabled:bg-aeblack-100 disabled:border-aeblack-200 disabled:border disabled:placeholder:text-aeblack-300`} type={props.type || "text"}   {...props} placeholder={placeholder} />
                }
                {props.suffix && <span className="text-aeblack-400 p-2 m-0.5">{props.suffix}</span>}
            </div>
            {error && <div className="text-aered-600">{error}</div>}

            {/* {error && <>
                <button data-tooltip-target="tooltip-animation" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{error}</button>

                <div id="tooltip-animation" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    {error}
                    <div data-popper-arrow></div>
                </div>
            </>} */}
        </div>
    )
}