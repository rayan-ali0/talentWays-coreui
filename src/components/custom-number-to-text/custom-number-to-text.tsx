import React from "react";
import i18n from "../../i18n";
import writtenNumber from 'written-number';

export interface INumberToTextProps {
  inputNumber: number;
  language: string;
  currency?: string;
  className?: string;
}

/**
 * CustomModal Component
 *
 * A modal component that displays a dialog with a title, optional footer, and customizable content.
 * It can be opened or closed based on the `open` prop and triggers a callback when closed.
 *
 * @component
 * @param {string} currency - The currency that will be shown already transalted
 * @param {number} inputNumber - The input number that will be written in the selected language
 * @param {number} className - The className to identify the style needed
 * @param {number} language - The default language to be selected for translations
 * @returns {JSX.Element} The rendered modal component.
 */

export const CustomNumberToText = ({
  inputNumber,
  language,
  currency,
  className,
}: INumberToTextProps) => {

  writtenNumber.defaults.lang = language;

  const getWrittenNumber = () => {
    if (inputNumber) {
      const num = parseInt(inputNumber?.toString(), 10);
      if (isNaN(num)) {
        return '';
      }
      return writtenNumber(num);
    }
    return ''
  };

  return (
    <label className={`capitalize ${className ? className : ''}`}>
      {getWrittenNumber()} {currency ? `${currency} ${i18n.t("WrittenNumber.Only")}` : ''}
    </label>
  );
};
