import React from "react";


/**
 * PageHeader Component
 *
 * A simple header component that displays a title at the top of a page.
 *
 * @component
 * @param {string} title - The title to display in the page header.
 * @returns {JSX.Element} The rendered page header component.
 */
export const PageHeader = (props: { title: string , isArabic?: boolean }) => {

    return <h1 className={`${props?.isArabic && "font-alexandria"} max-md:text-xl  text-[36px] font-semibold text-aeblack-900 leading-[70px]`}>{props.title}</h1>

}
