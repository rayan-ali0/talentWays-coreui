import React from "react";
import { Text, TextType } from "../custom-text/custom-text";

interface BannerProps {
  title: string;
  className?: string;
  isArabic: boolean;
}
/**
 * Banner Component
 *
 * Displays a customizable banner with optional label, styling, and direction based on the user's language.
 * The banner supports different user types and Arabic text direction.
 *
 * @param {string} title - The text title to be displayed on the banner.
 * @param {string} className - Optional custom class name to apply additional styles to the banner container.
 * @returns {JSX.Element} The rendered banner component.
 */

export const CustomBanner: React.FC<BannerProps> = ({ className, title, isArabic }) => {
  return (
    <div className={`bg-aegold-50 sm:p-12 p- rounded-lg flex items-center justify-center w-full ${className}`}>
      <Text as={TextType.H2} isArabic={isArabic} text={title} className="text-aegold-900"/>
    </div>
  );
};
