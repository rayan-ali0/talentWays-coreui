import React, { FC } from "react";

interface ICardDetailsProps {
  title: string;
  value: string | number;
  icon: string;
}

/**
 * CardInnerDetails Component
 *
 * Displays a card with a title, value, and an icon. This component can be used to showcase
 * individual pieces of information such as statistics or key details.
 *
 * @param {string} title - The title displayed at the top of the card, representing the type of data shown.
 * @param {string | number} value - The main value or information to display in the card.
 * @param {string} icon - A string representing the icon's source, such as a URL or icon class name.
 * @returns {JSX.Element} The rendered component displaying the title, value, and icon.
 */

export const CardInnerDetails: FC<ICardDetailsProps> = function ({ value, title, icon }) {
  return (
    <>
      <div className="flex gap-2 mt-2">
        <img className="w-4 h-4 relative top-1" src={icon} />
        <div className="text-[12px] text-aeblack-500">
          <div className="font-normal">{title}</div>
          <div className="font-bold ">{value.toString()}</div>
        </div>
      </div>
    </>
  );
};
