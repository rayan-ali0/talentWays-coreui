import React, { FC } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomInputType, FormInputData, Regex } from "../../types/types";
import { EMIRAT_PHONE_NUMBER_VALIDATION, IBAN_VALIDATION, IDENTITY_VALIDATION } from "../../helpers/data-helper";
import { globalFormatDate } from "@moj/common";
import i18n from "../../i18n";
import { AppInitializerProvider } from "../../context/initializer-context";

export interface IDynamicFormWrapperProps {
  data: FormInputData[];
  children?: any;
  handleOnSubmitValues: (items: object) => any;
  enableReinitialize?: boolean;
  preferredLanguage: string;
  formName?: string;
}

export const DynamicFormWrapper: FC<IDynamicFormWrapperProps> = ({
  data,
  children,
  handleOnSubmitValues,
  enableReinitialize = true,
  preferredLanguage,
  formName,
}) => {
  return (
    <div id="dynamic-form-renderer">
      <AppInitializerProvider containerId="dynamic-form-renderer" preferredLanguage={preferredLanguage}>
        <DynamicFormContent
          data={data}
          children={children}
          formName={formName}
          handleOnSubmitValues={handleOnSubmitValues}
          enableReinitialize={enableReinitialize}
        />
      </AppInitializerProvider>
    </div>
  );
};

// Internal component that contains the original logic
const DynamicFormContent: FC<Omit<IDynamicFormWrapperProps, "preferredLanguage">> = ({
  data,
  children,
  handleOnSubmitValues,
  enableReinitialize = true,
  formName,
}) => {
  const initialValues = data.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {});
  const validationSchema = data.reduce((schema: any, field) => {
    let yupType;

    const getValidationMessage = (defaultMessage: string) => {
      return field.errorMessage || defaultMessage;
    };

    switch (field.type) {
      case CustomInputType.Email:
        yupType = Yup.string().email(getValidationMessage(i18n.t("Form.Validation.InvalidEmail")));
        break;
      case CustomInputType.Number:
        yupType = Yup.number();
  
        if (field.minNumber !== undefined && field.minNumber !== null) {
          yupType = yupType.min(
            field.minNumber,
            getValidationMessage(i18n.t("Form.Validation.MinNumber", { minNumber: field.minNumber }))
          );
        }

        if (field.maxNumber !== undefined && field.maxNumber !== null) {
          yupType = yupType.max(
            field.maxNumber,
            getValidationMessage(i18n.t("Form.Validation.MaxNumber", { maxNumber: field.maxNumber }))
          );
        }
        break;
      case CustomInputType.Date:
      case CustomInputType.DateAndTime:
        yupType = Yup.date();
        if (field.minDate) {
          yupType = yupType.min(
            field.minDate,
            getValidationMessage(i18n.t("Form.Validation.MinDate", {
              minDate: globalFormatDate(field.minDate as Date, "DD/MM/YYYY"),
            }))
          );
        }

        if (field.maxDate) {
          yupType = yupType.max(
            field.maxDate,
            getValidationMessage(i18n.t("Form.Validation.MaxDate", {
              maxDate: globalFormatDate(field.maxDate as Date, "DD/MM/YYYY"),
            }))
          );
        }
        break;
      case CustomInputType.Checkbox:
        yupType = Yup.boolean();
        break;
      case CustomInputType.Dropdown:
        if (field?.fieldType === CustomInputType.Number) {
          yupType = Yup.number();
        } else {
          yupType = Yup.string();
        }
        break;
      case CustomInputType.PhoneNumber:
        yupType = Yup.string().test(
          "is-valid-phone",
          getValidationMessage(i18n.t("Form.Validation.Invalid")),
          (value) => !value || EMIRAT_PHONE_NUMBER_VALIDATION.test(value)
        );
        break;
      case CustomInputType.IBAN:
        yupType = Yup.string()
          .required(getValidationMessage(i18n.t("Form.Validation.Required")))
          .test(
            "is-valid-iban",
            getValidationMessage(i18n.t("Form.Validation.InvalidIban")),
            (value) => !value || IBAN_VALIDATION.test(value)
          );
        break;
      case CustomInputType.IDENITITY:
        yupType = Yup.string()
          .required(getValidationMessage(i18n.t("Form.Validation.Required")))
          .test(
            "is-valid-identity",
            getValidationMessage(i18n.t("Form.Validation.InvalidIdentity")),
            (value) => !value || IDENTITY_VALIDATION.test(value)
          );
        break;
      case CustomInputType.TextOnly:
        const textOnlyRegexType = field.regex || undefined;

        if (textOnlyRegexType === Regex.Arabic) {
          yupType = Yup.string().test(
            "is-valid-arabic-text-only",
            getValidationMessage(i18n.t("Form.Validation.ArabicLettersOnly")),
            (value): boolean => {
              if (!value) return true;
              if (value.trim().length === 0) return false;

              const arabicLettersOnlyRegex = /^[\u0600-\u06FF\s]+$/;
              return arabicLettersOnlyRegex.test(value);
            }
          );
        } else if (textOnlyRegexType === Regex.English) {
          yupType = Yup.string().test(
            "is-valid-english-text-only",
            getValidationMessage(i18n.t("Form.Validation.EnglishLettersOnly")),
            (value): boolean => {
              if (!value) return true;
              if (value.trim().length === 0) return false;

              const englishLettersOnlyRegex = /^[a-zA-Z\s]+$/;
              return englishLettersOnlyRegex.test(value);
            }
          );
        } else {
          yupType = Yup.string().test(
            "is-not-blank",
            getValidationMessage(i18n.t("Form.Validation.EmptyField")),
            (value): boolean => {
              if (field.validation === "optional" || !field.validation) return true;

              return value !== undefined && value !== null && value.trim().length > 0;
            }
          );
        }
        break;

      case CustomInputType.Text:
      case CustomInputType.TextArea:
        const regexType = field.regex || undefined;

        if (regexType === Regex.Arabic) {
          yupType = Yup.string().test(
            "is-valid-arabic",
            getValidationMessage(i18n.t("Form.Validation.ArabicOnly")),
            (value): boolean => {
              if (!value) return true;
              if (value.trim().length === 0) return false;

              const noEnglishRegex = /^[^\u0000-\u007F]*$|^[^a-zA-Z]*$/;
              return noEnglishRegex.test(value);
            }
          );
        } else if (regexType === Regex.English) {
          yupType = Yup.string().test(
            "is-valid-english",
            getValidationMessage(i18n.t("Form.Validation.EnglishOnly")),
            (value): boolean => {
              if (!value) return true;
              if (value.trim().length === 0) return false;

              const noArabicRegex = /^[^\u0600-\u06FF]*$/;
              return noArabicRegex.test(value);
            }
          );
        } else {
          yupType = Yup.string().test(
            "is-not-blank",
            getValidationMessage(i18n.t("Form.Validation.EmptyField")),
            (value): boolean => {
              if (field.validation === "optional" || !field.validation) return true;

              return value !== undefined && value !== null && value.trim().length > 0;
            }
          );
        }
        break;
      case CustomInputType.SearchDropdown:
        if (field.isMulti)
          yupType = Yup.array()
            .of(
              Yup.object().shape({
                label: Yup.string().required(),
                value: Yup.string().required(),
              })
            )
            .min(1, getValidationMessage("At least one party is required"));
        else yupType = Yup.string();
        break;

      case CustomInputType.File:
        yupType = Yup.array().of(
          Yup.object().shape({
            data: Yup.mixed().required(getValidationMessage("File data is required")),
            fileName: Yup.string().required(getValidationMessage("File name is required")),
          })
        );
        break;
      default:
        yupType = Yup.string();
        break;
    }

    if (field.validation === "optional" || !field.validation) {
      schema[field.name] = yupType.optional().nullable();
    } else {
      schema[field.name] = yupType.required(
        getValidationMessage(`${field.title} ${i18n.t("Form.Validation.Required")}`)
      );
    }

    return schema;
  }, {});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object(validationSchema)}
      onSubmit={(values) => {
        handleOnSubmitValues(values);
      }}
      enableReinitialize={enableReinitialize}
    >
      {(formikProps) => (
        <Form id={formName} name={formName}>
          {children && children(formikProps)}
        </Form>
      )}
    </Formik>
  );
};
