import React from "react";

/**
 * PopupHeader Component
 *
 * A simple header component that displays a title at the top of a popup.
 *
 * @component
 * @param {string} title - The title to display in the page header.
 * @returns {JSX.Element} The rendered page header component.
 */
export const PopupHeader = (props: { title: string }) => {

    return <h2 className={`text-xl md:text-[32px] font-semibold text-aeblack-900 leading-[48px] text-center`}>{props.title}</h2>
}