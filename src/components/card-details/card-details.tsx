
import React, { FC } from "react";
import arrow from "../../assets/images/arrow.svg";


interface ICardDetailsProps {
  title?: string;
  subTitle?: string | undefined;
  children?: any;
  cardAction?: () => void;
  isArabic?:boolean
}

/**
 * A card is a sheet of material that serves as an entry point to more detailed information.
 *
 * @param {string} title - The main title displayed at the top of the card.
 * @param {string} subTitle - The subtitle displayed under the main title.
 * @param {React.ReactNode} children - The main content or children elements to display in the card.
 * @param {() => void} cardAction - An optional callback function triggered when the card is clicked.
 * @param {boolean} isArabic - Controls the text direction (RTL if `true`, LTR if `false`).
 * @returns {JSX.Element} The rendered card component.
 */

export const CardDetails: FC<ICardDetailsProps> = function ({ children, title, subTitle, cardAction,isArabic }) {
  const tag = React.Children.toArray(children)[0];
  const info = React.Children.toArray(children).slice(1);

  return (
    <div className="border-solid border border-aegold-200 rounded-lg mt-6 p-4 w-full">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold">{title}</div>
        {tag}
      </div>
      <div className="text-techblue-400 text-[12px]">{subTitle}</div>

      <div className="flex flex-col lg:flex-row">
        {info.map((item, index) => (
          <div key={index} className="w-full md:w-1/3">
            {item}
          </div>
        ))}
      </div>

      <div className="flex justify-end action-btn cursor-pointer">
        <button onClick={cardAction}>
          <img src={arrow} alt="" className={`${isArabic ? "" : "rotate-180"}`} />
        </button>
      </div>
    </div>
  );
};
