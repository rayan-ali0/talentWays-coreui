import i18n from "../i18n";
// import { FormInputData, CustomInputType, ApiError } from "../types/types";
// import { globalFormatDate } from "@moj/common";
// import writtenNumber from "written-number";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function checkNumberInputDigitLength(e: any) {
  if (e.target.value.length > e.target.maxLength) {
    e.stopPropagation();
    e.preventDefault();
    return false;
  }
  return true;
}

export const isArabicLanguage = () => {
  return i18n.language === "ar" ? true : false;
};

export function getCustomDropDownDesign(
  showClearIndicator: boolean = true,
  isArabic: boolean = true,
  withBorder: boolean = true
) {
  const inputBorderColorDisabled = "#C3C6CB";
  const backgroundDisabled = "#E1E3E5";
  const placeholderDisabled = "#E1E3E5";
  const inputBorderColor = "#CBA344";
  //   const textColor = "#F7F7F7";
  const whiteColor = "#FFFFFF";
  const placeholderColor = "#9EA2A9";
  const textDisabled = "#5D3B26";

  return {
    container: (base: any) => ({
      ...base,
      minHeight: "40px",
    }),
    groupHeading: (base: any) => ({
      ...base,
      backgroundColor: "#F8F8FA",
      minHeight: "32px",
      marginBottom: "0px",
      textTransform: "none",
      lineHeight: "32px",
    }),
    control: (base: any, state: any) => ({
      ...base,
      width: "100%",
      minHeight: "40px", // Default minHeight
      "@media (min-width: 768px)": {
        minHeight: "48px", // minHeight for screens above 768px (md breakpoint)
      },
      // border: state.isDisabled ? `2px solid ${inputBorderColorDisabled} !important` : '',
      borderRadius: "6px",
      color: state.isDisabled ? textDisabled : "rgb(50, 49, 48)",
      backgroundColor: whiteColor,
      fontSize: "15px",
      boxShadow: state.isFocused ? `0 0 0 0px #FAD44F` : "", // Apply the desired color for box shadow
      "&:hover": {
        borderColor: inputBorderColor,
      },
      overflowY: "auto",
      scrollbarWidth: "none", // Firefox
      msOverflowStyle: "none", // IE 10+
      "&::-webkit-scrollbar": {
        display: "none", // Chrome, Safari
      },
      borderWidth: 0,
      opacity: 1,
      div: { border: "none" },
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      // minHeight: "40px",
      fontSize: "14px",
      padding: "0 6px",
      div: { display: "flex", alignItems: "center" },
    }),
    placeholder: (provided: any, state: any) => ({
      ...provided,
      top: "48%",
      position: "absolute",
      transform: "translateY(-50%)",
      padding: "12px 10px",
      color: placeholderColor,
      fontSize: "15px", // Default fontSize for smaller screens
      "@media (min-width: 768px)": {
        fontSize: "16px", // Font size for larger screens (md breakpoint)
      },
      fontWeight: "400",
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      width: "100%",
      // height: inputHeight,
      minHeight: "40px",
      position: "absolute",
      top: "48%",
      transform: "translateY(-50%)",
      fontSize: "15px",
      fontWeight: "400", // Make it slightly bolder for better readability
      color: state.isDisabled ? "#5D3B26" : "rgb(50, 49, 48)", // Darker text when disabled
      opacity: state.isDisabled ? 1 : 1, // Ensure full opacity when disabled
      display: "flex",
      backgroundColor: whiteColor,
      marginLeft: "2px",
    }),
    multiValue: (provided: any, state: any) => ({
      ...provided,
      margin: "4px",
      // minHeight: "40px",
      backgroundColor: "#92722A",
      color: whiteColor,
      paddingLeft: "0",
      opacity: 1,
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: whiteColor,
    }),

    multiValueRemove: (provided: any, state: any) =>
      state.isDisabled
        ? {
          ...provided,
          display: "none !important",
        }
        : {
          ...provided,
          fontSize: "10px",
          height: "100%",
        },

    indicatorsContainer: (provided: any, state: any) => ({
      ...provided,
      height: "40px",
      display: state.isDisabled ? "none" : "flex",
      alignItems: "center",
      div: { padding: "0px 4px 0px 8px !important" },
    }),

    clearIndicator: (provided: any, state: any) =>
      !showClearIndicator || state.isDisabled
        ? {
          ...provided,
          display: "none !important",
        }
        : { ...provided },

    dropdownIndicator: (provided: any, state: any) =>
      state.isDisabled
        ? { display: "none" }
        : {
          ...provided,
          padding: "0px 3px !important",
          color: "#B68A36",
          "&:hover": {
            color: "#B68A36", // Ensure the color remains black on hover
          },
        },

    indicatorSeparator: (styles: any) => ({ display: "none" }),
    option: (base: any) => ({
      ...base,
      fontSize: "14px !important",
    }),
    menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
    menu: (base: any) => ({ ...base, direction: isArabic ? "rtl" : "ltr", zIndex: 9999  }),
  };
}

export function calculateAge(birthDate: Date): number {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
}

// export function convertDateToCustomFormat(inputDate: string): string {
//   return globalFormatDate(new Date(inputDate), "DD/MM/YYYY");
// }

// export function convertTimeToCustomFormat24(inputDate: string): string {
//   return globalFormatDate(new Date(inputDate), "HH:mm");
// }

// export const transformValuesToCorrectTypes = (values: any, validationSchema: FormInputData[]) => {
//   const transformedValues: any = {};

//   // Iterate over each key in the values object
//   for (const key in values) {
//     const validation = validationSchema?.find((x) => x?.name === key);
//     const originalValue = values[key];
//     if (
//       validation &&
//       (validation.type === CustomInputType.Number || validation?.fieldType === CustomInputType.Number)
//     ) {
//       const numberValue = Number(originalValue); // Attempt to convert to a number
//       transformedValues[key] = numberValue;
//     } else {
//       transformedValues[key] = originalValue;
//     }
//   }

//   return transformedValues;
// };

export function convertDateToISO(dateStr: string | Date | undefined): string {
  if (!dateStr) return "";

  let date: Date;

  if (typeof dateStr === "string") {
    // Assuming the string format is "DD/MM/YYYY"
    const [day, month, year] = dateStr.split("/").map(Number);
    date = new Date(year, month - 1, day);
  } else {
    date = dateStr;
  }

  // Check if the date is valid
  return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
}
export const isFileReadable = (file: File): Promise<boolean> => {
  return new Promise(async (resolve) => {
    if (!file || file.size < 100) {
      console.warn("❌ File is empty or too small to be valid");
      return resolve(false);
    }

    try {
      const headerChunk = file.slice(0, 512);
      const buffer = await headerChunk.arrayBuffer();
      const byteArray = new Uint8Array(buffer);

      const hex = (bytes: number[]) =>
        bytes.map((b) => b.toString(16).padStart(2, "0")).join(" ").toLowerCase();

      const headerHex = hex(Array.from(byteArray.slice(0, 8)));

      // Format magic number detection
      const isPDF = headerHex.startsWith("25 50 44 46"); // %PDF
      const isDOC = headerHex.startsWith("d0 cf 11 e0 a1 b1 1a e1"); // Legacy DOC, XLS, PPT
      const isDOCX = headerHex.startsWith("50 4b 03 04"); // DOCX/XLSX/PPTX are all ZIP files
      const isRTF = headerHex.startsWith("7b 5c 72 74 66"); // {\rtf
      const isODT = headerHex.startsWith("50 4b 03 04"); // ODT is also ZIP-based

      if (isPDF || isDOC || isDOCX || isRTF || isODT) {
        return resolve(true);
      }

      console.warn("❌ Unknown or corrupted file header:", headerHex);
      return resolve(false);
    } catch (err) {
      console.error("❌ Exception during document validation:", err);
      return resolve(false);
    }
  });
};

/**
 * Converts a number to its written form with language support
 * 
 * @param {number | string} value - The number to convert to written form
 * @param {string} [language] - The language code (defaults to current i18n language or 'en')
 * @param {object} [options] - Additional options for written-number library
 * @returns {string} The number in written form
 * 
 * @example
 * convertNumberToText(123) // "one hundred and twenty-three"
 * convertNumberToText(123, 'ar') // Arabic equivalent
 * convertNumberToText('456', 'en') // "four hundred and fifty-six"
 */
// export const convertNumberToText = (
//   value: number | string, 
//   language?: string, 
//   options?: object
// ): string => {
//   try {
//     // Get the language - priority: parameter > current i18n language > default 'en'
//     const lang = language || i18n.language || 'en';
    
//     // Convert string to number if needed
//     const numValue = typeof value === 'string' ? parseInt(value, 10) : value;
    
//     // Return empty string for invalid numbers
//     if (isNaN(numValue) || !isFinite(numValue)) {
//       return '';
//     }
    
//     // Set the language for written-number
//     const originalLang = writtenNumber.defaults.lang;
//     writtenNumber.defaults.lang = lang;
    
//     // Convert number to text
//     const result = writtenNumber(numValue, options);
    
//     // Restore original language setting
//     writtenNumber.defaults.lang = originalLang;
    
//     return result || '';
//   } catch (error) {
//     console.error('Error converting number to text:', error);
//     return '';
//   }
// };

/**
 * Converts a number to its written form using the current application language
 * This is a convenience function that uses the current i18n language
 * 
 * @param {number | string} value - The number to convert to written form
 * @param {object} [options] - Additional options for written-number library
 * @returns {string} The number in written form using current app language
 * 
 * @example
 * numberToText(123) // Uses current app language (en/ar)
 * numberToText('456') // "four hundred and fifty-six" or Arabic equivalent
 */
// export const numberToText = (value: number | string, options?: object): string => {
//   return convertNumberToText(value, undefined, options);
// };

/**
 * Utility function that combines clsx and tailwind-merge
 * Handles conditional classes and resolves Tailwind CSS conflicts
 * 
 * @param inputs - Class values (strings, objects, arrays, etc.)
 * @returns Merged and conflict-resolved class string
 * 
 * @example
 * cn("px-2 py-1", isActive && "bg-blue-500", "px-4") // "py-1 bg-blue-500 px-4"
 * cn("text-red-500", undefined, "text-blue-500") // "text-blue-500"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}


export const lockBodyScroll = (): void => {
  // Store original overflow and scrollbar width
  const scrollY = window.scrollY;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  
  document.body.setAttribute('data-scroll-y', scrollY.toString());
  document.body.setAttribute('data-original-overflow', document.body.style.overflow || '');
  document.body.setAttribute('data-original-padding-right', document.body.style.paddingRight || '');
  
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollbarWidth}px`;
};


export const unlockBodyScroll = (): void => {
  // Restore original styles
  const originalOverflow = document.body.getAttribute('data-original-overflow') || '';
  const originalPaddingRight = document.body.getAttribute('data-original-padding-right') || '';
  
  document.body.style.overflow = originalOverflow;
  document.body.style.paddingRight = originalPaddingRight;
  
  document.body.removeAttribute('data-scroll-y');
  document.body.removeAttribute('data-original-overflow');
  document.body.removeAttribute('data-original-padding-right');
};


// export const isApiException = (error: any): error is ApiError => {
//   return error && 
//          typeof error.message === 'string' &&
//          typeof error.status === 'number' &&
//          typeof error.response === 'string' &&
//          typeof error.headers === 'object'
//       };