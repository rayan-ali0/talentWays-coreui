import React from 'react'

interface CustomTagProps {
  color?: string;
  bg?: string;
  text?: string | number;
  value?: string | number;
  className?: string;
  icon?: string;
  
}

/**
 * CustomTag Component
 *
 * Displays a tag with customizable color, background, text, and optional icon. 
 * It is often used for labeling or tagging elements in a UI with visual emphasis.
 *
 * @component
 * @param {string} [color] - The color of the tag text.
 * @param {string} [bg] - The background color of the tag.
 * @param {string | number} [text] - The main text or number displayed inside the tag.
 * @param {string | number} [value] - An optional value that could represent additional data related to the tag.
 * @param {string} [className] - Additional CSS class names to apply to the tag element.
 * @param {string} [icon] - An optional icon to display alongside the text inside the tag.
 * @returns {JSX.Element} The rendered custom tag component.
 */

export const CustomTag: React.FC<CustomTagProps> = ({ text,bg,className,icon,color,value }) => {

  return (
    <div className={"rounded-md p-1 px-2 w-fit " + (bg ? bg : "bg-aeblack-50")}>
    <div className="flex items-center gap-2">
      {icon ? (
        <div className="flex gap-1 items-center">
          <img src={icon} />
          <div className={(color || "") + " text-[14px] " + (className || "")}>{text}</div>
        </div>
      ) : (
        <>
          <div className={(color || "") + " text-[14px] " + (className || "")}>{text}</div>
          {value && <div className={"text-[14px] " + (color || "")}>{value}</div>}
        </>
      )}
    </div>
  </div>
    
  )
}
