import React from "react";

export const TextType = {
  H1: "h1",
  H2: "h2",
  H3: "h3",
  H4: "h4",
  H5: "h5",
  H6: "h6",
  P: "p",
  SPAN: "span",
  TITLE: "Title"
} as const;

export type TextType = typeof TextType[keyof typeof TextType];

interface TextProps {
  as: TextType;
  text: string;
  className?: string;
  isArabic: boolean
}

/**
 * Text Component
 *
 * A versatile component for rendering text elements of various HTML types (e.g., headings, paragraphs, spans).
 * The `as` prop determines the HTML tag, allowing for flexible and semantically appropriate text rendering.
 *
 * @component
 * @param {TextType} as - The type of HTML element to render (e.g., 'h1', 'h2', 'p', 'span', etc.).
 * @param {string} text - The content to display inside the text element.
 * @param {string} [className] - Optional additional CSS class names to apply to the text element.
 * @param {boolean} isArabic - If `true`, adjusts text styling for right-to-left (RTL) languages.
 * @returns {JSX.Element} The rendered text element, as specified by the `as` prop.
 */

export const Text: React.FC<TextProps> = ({ as, text, className, isArabic }) => {
  const renderText = () => {
    switch (as) {
      case TextType.H1:
        return (
          <h1 className={`${isArabic ? "font-alexandria" : "font-inter"} max-sm:text-2xl ${className || ""}`}>
            {text}
          </h1>
        );
      case TextType.H2:
        return (
          <h2 className={`${isArabic ? "font-alexandria" : "font-inter"} max-sm:text-2xl ${className || ""}`}>{text}</h2>
        );
      case TextType.H3:
        return (
          <h3 className={`${isArabic ? "font-alexandria" : "font-inter"} max-sm:text-2xl ${className || ""}`}>{text}</h3>
        );
      case TextType.H4:
        return (
          <h4 className={`${isArabic ? "font-alexandria" : "font-inter"} font-semibold max-sm:text-xl ${className || ""}`}>{text}</h4>
        );
      case TextType.H5:
        return (
          <h5 className={`${isArabic ? "font-alexandria" : "font-inter"} font-semibold  max-sm:text-lg ${className || ""}`}>
            {text}
          </h5>
        );
      case TextType.H6:
        return (
          <h6 className={`${isArabic ? "font-alexandria" : "font-inter"}  max-sm:text-lg ${className || ""}`}>
            {text}
          </h6>
        );
      case TextType.P:
        return <p className={className}>{text}</p>;
      case TextType.SPAN:
        return <span className={className}>{text}</span>;

      case TextType.TITLE:
        return <h2 className="text-xl font-semibold text-aeblack-900 leading-[22px]">{text}</h2>

      default:
        return null;
    }
  };

  return <>{renderText()}</>;
};