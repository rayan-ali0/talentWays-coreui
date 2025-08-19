import React, { FC } from "react";
import arrow from '../../assets/images/arrow-right.svg';
import { PlusSvgIcon } from "../icons/icons";

export interface ICustomHeader {
    title:string; 
    isArabic: boolean;
    navigationText?:string;
    navigationAction?: any;
    subTitleLabel?:string;
    subTitleSubLabel?:string;
    subTitleSubLabelColor?:string;
    addIcon?:boolean;
    iconAction?:any;

}

/**
 * CardHeader Component
 *
 * A customizable header component that displays a title, optional subtitle, navigation text, and action icons.
 * It supports both left-to-right and right-to-left layouts and can include various optional icons and actions.
 *
 * @param {string} title - The main title to display in the header.
 * @param {boolean} isArabic - If `true`, the layout is adjusted for right-to-left (RTL) reading.
 * @param {string} [navigationText] - Optional text displayed for navigation, typically used for links or breadcrumbs.
 * @param {any} [navigationAction] - Optional action or callback triggered when the navigation text is clicked.
 * @param {string} [subTitleLabel] - Optional label displayed as a subtitle under the main title.
 * @param {string} [subTitleSubLabel] - Optional additional subtitle text that provides further details or context.
 * @param {string} [subTitleSubLabelColor] - Optional color for the subtitle’s sub-label text (used for customization).
 * @param {boolean} [addIcon] - If `true`, an icon is added to the header, usually for actions or indicators.
 * @param {any} [iconAction] - Optional action or callback triggered when the icon is clicked.
 * @returns {JSX.Element} The rendered card header component.
 */

export const CardHeader:FC<ICustomHeader> = (props) => {

    const { title, navigationText, navigationAction, subTitleLabel,subTitleSubLabel,subTitleSubLabelColor,addIcon,iconAction} = props;
    return (
        <div className="flex justify-between">
          <div>
        <h2 className={`text-xl font-semibold text-aeblack-900 leading-[22px]`}>
        {title}
    </h2>
     { subTitleLabel && <p>{subTitleLabel} <span className={subTitleSubLabelColor}>{subTitleSubLabel}</span></p>}
    </div>
    {navigationAction && navigationText && <div
                className="flex items-center text-[#B68A36] text-sm gap-1 cursor-pointer relative top-2"
                onClick={navigationAction}
              >
                <div>{navigationText}</div>
                <div>
                  <img src={arrow} alt="" className={`${props.isArabic ? "" : "rotate-180"}`} />
                </div>
              </div>}
              {iconAction && addIcon && <div
                className="flex items-center text-[#B68A36] text-sm gap-1 cursor-pointer relative top-2"
                onClick={iconAction}
              >
                <div>
                 <PlusSvgIcon></PlusSvgIcon>
                </div>
              </div>}
    </div>
    )
    

}
