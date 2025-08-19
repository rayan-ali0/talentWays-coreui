import React, { FC } from "react";
import { FormikConsumer } from "formik";
import { CustomInputType, FormInputData } from "../../types/types";
import { CustomRadio } from "../custom-radio-buttons/custom-radio";
import { FormikFileInput } from "../custom-file-input/formik-file-input";
import { CustomSearchSelect } from "../custom-select/search-select";

import { RendererInput } from "./rendererComponents/renderer-input";
import { ReactSelect } from "../custom-select/react-select";
import { CardComponent, ILabelValue } from "../custom-card/card-component";
import i18n from "../../i18n";
import { DarkArrowRightSvgIcon } from "../icons/icons";
import { isArabicLanguage, numberToText, cn } from "../../helpers/function-helper";
import { CustomAsyncSelectWithLoadMore } from "../custom-select/custom-search-load-more-select";
import { ReadOnlyFileInput } from "../custom-file-input/read-only-file";

export interface IDynamicFormRendererProps {
  data: FormInputData[];
  values: object;
  handleChange: (e: React.ChangeEvent<any>) => void;
  isArabic: boolean;
  className?: string;
  customDesign?: string;
  isViewMode?: boolean;
  gridClassName?: string;
  cardWithShadow?: boolean;
}

/**
 * DynamicFormRenderer Component
 *
 * A component that dynamically renders form inputs based on the provided `data` prop, which includes the configuration of the form fields.
 * Each field is rendered according to its `type`, and the `handleChange` function is used to update the form's values.
 * Additionally, fields may support features like removing files or handling validation based on `FormInputData`.
 *
 * @component
 * @param {FormInputData[]} data - An array containing configuration for the form inputs. Each object in the array represents one form field.
 * @param {object} values - The current values of the form fields, used for binding the inputs to the state.
 * @param {(e: React.ChangeEvent<any>) => void} handleChange - Function that handles the change event for form fields, updating the `values` object.
 * @param {(startIndex: number, dividerIndex: number) => void} [handleRemoveFields] - Optional function for removing specific fields from the form.
 * @param {string} [className] - Optional CSS class to style the wrapper of the form.
 * @param {boolean} isArabic - Boolean flag indicating whether the form should be rendered in Arabic (affects layout direction).
 * @returns {JSX.Element} The rendered dynamic form based on the `data` prop and `values` state.
 */

export const DynamicFormRenderer: FC<IDynamicFormRendererProps> = ({
  data,
  values,
  handleChange,
  className,
  customDesign,
  isViewMode,
  isArabic,
  gridClassName,
  cardWithShadow = false,
}) => {
  // If in view mode, convert form fields to card display
  if (isViewMode) {
    return renderCardView(data, values, isArabic, gridClassName, cardWithShadow);
  }

  return (
    <div className={cn(customDesign || "flex flex-wrap p-4 -mx-2", className)}>
      {data?.map(
        (field, index) =>
          !field?.hidden && (
            <React.Fragment key={index}>
              <div key={index} className={cn(field?.width, field?.customDesign || "mb-4 px-2")}>
                <FormikConsumer>
                  {({ errors, touched }) => (
                    <>
                      {field.type === CustomInputType.Radio ? (
                        <CustomRadio
                          label={field.title}
                          value={(values as any)[field.name]}
                          name={field.name}
                          placeholder={field.placeholder}
                          onChange={handleChange}
                          isDisabled={field.isDisabled}
                          required={field.validation === "required"}
                          labelStyles={field.labelStyle}
                          inputStyles={field.inputStyle}
                          optionStyles={field.optionStyle}
                          desgin={field?.design}
                          options={field?.options || []}
                          errorMessage={touched[field.name] ? (errors[field?.name] as string) : ""}
                          className={field?.inputClassName}
                        />
                      ) : field.type === CustomInputType.Dropdown ? (
                        <ReactSelect
                          isArabic={isArabic}
                          label={field.title}
                          value={field?.options?.find((x) => x.value === (values as any)[field.name])}
                          name={field.name}
                          placeholder={field.placeholder}
                          onChange={(newValue) => {
                            handleChange({
                              target: {
                                name: field.name,
                                value: field.isMulti ? newValue : newValue?.value,
                                label: newValue?.label,
                              },
                            } as any);
                          }}
                          disabled={field.isDisabled}
                          required={field.validation === "required"}
                          errorMessage={touched[field.name] ? (errors[field?.name] as string) : ""}
                          labelStyleClassName={field.labelStyleClassName}
                          options={field?.options || []}
                          isClearable={field?.isClearable}
                        />
                      ) : field.type === CustomInputType.SearchDropdown ? (
                        <CustomSearchSelect
                          isArabic={isArabic}
                          label={field.title}
                          value={(values as any)[field.name]}
                          name={field.name}
                          placeholder={field.placeholder}
                          isMulti={field.isMulti}
                          onChange={(newValue) => {
                            handleChange({
                              target: {
                                name: field.name,
                                value: field.isMulti ? newValue : newValue?.value,
                                label: newValue.label,
                              },
                            } as any);
                          }}
                          isDisabled={field.isDisabled}
                          required={field.validation === "required"}
                          labelStyles={field.labelStyle}
                          options={field?.options || []}
                          errorMessage={touched[field.name] ? (errors[field?.name] as string) : ""}
                          labelStyleClassName={field.labelStyleClassName}
                          isClearable={field.isClearable}
                        />
                      ) : field.type === CustomInputType.SearchAsyncDropdown ? (
                        <CustomAsyncSelectWithLoadMore
                          isArabic={isArabic}
                          label={field.title}
                          value={
                            field.isMulti
                              ? (values as any)[field.name]
                              : field?.options?.find((x) => x.value === (values as any)[field.name])
                          }
                          name={field.name}
                          placeholder={field.placeholder}
                          isMulti={field.isMulti}
                          onChange={(newValue) => {
                            handleChange({
                              target: {
                                name: field.name,
                                value: field.isMulti ? newValue : newValue?.value,
                                label: newValue?.label,
                              },
                            } as any);
                          }}
                          disabled={field.isDisabled}
                          required={field.validation === "required"}
                          options={field?.options || []}
                          fetchOptions={field.fetchOptions || (() => Promise.resolve([]))}
                          loadMore={field?.loadMore}
                          errorMessage={touched[field.name] ? (errors[field?.name] as string) : ""}
                          labelStyleClassName={field.labelStyleClassName}
                          isClearable={field.isClearable}
                        />
                      ) : field.type === CustomInputType.File ? (
                        <FormikFileInput
                          key={field.fileOnRead?.fileName}
                          label={field.title}
                          value={(values as any)[field.name]}
                          name={field.name}
                          fileOnRead={field?.fileOnRead || undefined}
                          onChange={handleChange}
                          hintText={field.hintFileText}
                          isDisabled={field.isDisabled}
                          required={field.validation === "required"}
                          labelStyle={field.labelStyle}
                          viewMode={field?.viewMode}
                          handleDownloadFile={field?.handleDownloadFile}
                          handleRemoveFile={field?.handleRemoveFile}
                          accept={field?.accept}
                          errorMessage={touched[field.name] ? (errors[field?.name] as string) : ""}
                          maxFileSize={field?.maxFileSize}
                        />
                      ) : (
                        <RendererInput
                          label={field.title}
                          value={(values as any)[field.name]}
                          name={field.name}
                          type={field.type as CustomInputType}
                          placeholder={field.placeholder}
                          onChange={handleChange}
                          isDisabled={field.isDisabled}
                          required={field.validation === "required"}
                          labelStyle={field.labelStyle}
                          minDate={field?.minDate}
                          maxDate={field?.maxDate}
                          max={field?.maxNumber}
                          min={field?.minNumber}
                          maxLength={field?.maxLength}
                          minLength={field?.minLength}
                          hintText={field?.hintText}
                          className={field.inputClassName}
                          row={field.rows}
                          step={field?.step}
                          maxAllowedCharacters={field.maxAllowedCharacters}
                          errorMessage={touched[field.name] ? (errors[field?.name] as string) : ""}
                          relatedFieldValue={
                            field?.relatedFieldName ? (values as any)[field?.relatedFieldName] : undefined
                          }
                          isArabic={field?.isArabic || isArabic}
                        />
                      )}
                    </>
                  )}
                </FormikConsumer>
              </div>
            </React.Fragment>
          )
      )}
    </div>
  );
};

/**
 * Renders form data in view mode using CardComponent
 *
 * @param data Form field definitions
 * @param values Form values
 * @param isArabic RTL support flag
 * @returns Card component with values displayed in a clean layout
 */

const renderCardView = (
  data: any[],
  values: any,
  isArabic: boolean,
  gridClassName: string | undefined,
  withShadow?: boolean
) => {
  // Filter out hidden fields before mapping to card data
  const visibleFields = data.filter(field => !field?.hidden);
  
  const cardData: ILabelValue[] = visibleFields.map((field) => {
    // Get display value based on field type
    let displayValue = getDisplayValue(field, values);

    return {
      label: field.title || "",
      value: displayValue,
    };
  });
  
  return (
    <CardComponent
      data={cardData}
      withHeaders={false}
      withBorder={true}
      gridClassName={gridClassName ? gridClassName : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}
      containerClassName={withShadow ? "" : "shadow-none"}
      isArabic={isArabic}
    />
  );
};

/**
 * Gets the formatted display value for a field based on its type
 *
 * @param field Field definition
 * @param values Form values
 * @returns Formatted display value
 */
const getDisplayValue = (field: FormInputData, values: any): string | React.ReactNode => {
  const rawValue = values[field.name];

  if (field.type !== CustomInputType.File && (rawValue === null || rawValue === undefined || rawValue === "")) {
    return i18n.t("NotFound");
  }

  switch (field.type) {
    case CustomInputType.Radio:
      const selectedRadioOption = field.options?.find((opt: any) => opt.value === rawValue);
      return selectedRadioOption?.label || rawValue;

    case CustomInputType.Dropdown:
    case CustomInputType.SearchDropdown:
      if (typeof rawValue === "object" && rawValue !== null) {
        return rawValue.label || JSON.stringify(rawValue);
      }

      const selectedOption = field.options?.find((opt: any) => opt.value === rawValue);
      return selectedOption?.label || rawValue;

    case CustomInputType.File:
      if (field.fileOnRead) {
        return <ReadOnlyFileInput attachment={field.fileOnRead} onDownload={field?.handleDownloadFile} />;
      }
      return i18n.t("NotFound");

    case CustomInputType.Date:
      try {
        return new Date(rawValue).toLocaleDateString();
      } catch (e) {
        return rawValue;
      }

    case CustomInputType.NumberToText:
      // Get the related field value for number to text conversion
      const relatedValue = field?.relatedFieldName ? values[field.relatedFieldName] : rawValue;
      if (relatedValue === null || relatedValue === undefined || relatedValue === "") {
        return i18n.t("NotFound");
      }
      return numberToText(relatedValue);

    default:
      return rawValue;
  }
};
