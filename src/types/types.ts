import {type CSSProperties } from "react";
// import { IAttachment } from "@moj/common";
import { ICustomSelectItem } from "../components";

export enum CustomInputType {
  TextArea = "TextArea",
  Number = "Number",
  Date = "Date",
  DateAndTime = "DateAndTime",
  Time = "Time",
  Year = "Year",
  Text = "Text",
  TextOnly = "TextOnly",
  Password = "password",
  Email = "email",
  Search = "search",
  Checkbox = "checkbox",
  RadioButton = "radioButton",
  PhoneNumber = "PhoneNumber",
  IBAN = "iban",
  IDENITITY = "identity",
  Dropdown = "Dropdown",
  SearchDropdown = "SearchDropdown",
  Radio = "radio",
  File = "file",
  SearchAsyncDropdown = "AsyncSearchDropdown",
  NumberToText = "NumberToText"
}

export enum Regex {
  Arabic = 1,
  English = 2
}


export interface FormInputData {
  name: string;
  title: string;
  regex?: Regex;
  placeholder: string;
  value: Date | string | number | boolean | undefined | null | ICustomSelectItem[];
  validation: string;
  type: CustomInputType;
  fieldType?: CustomInputType;
  isDisabled: boolean;
  width: string;
  options?: ICustomSelectItem[];
  hidden?: boolean;
  textColor?: string;
  minDate?: Date | string;
  maxDate?: Date | string;
  labelStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  optionStyle?: CSSProperties;
  displayBlock?: boolean;
  noSpace?: string;
  blockMargins?: string;
  labelStyleClassName?: string;
  fetchOptions?: (searchKeyword: any) => Promise<ICustomSelectItem[]>;
  loadMore?: () => Promise<void>;
  design?: string;
  maxNumber?: number;
  minNumber?: number;
  hintFileText?: string;
  customDesign?: string;
  errorMessage?: string;
  selectClassName?: string;
  inputClassName?: string;
  fileOnRead?: IAttachment | undefined;
  maxLength?: number;
  minLength?: number;
  userId?: string;
  isMulti?: boolean;
  step?: number;
  viewMode?: boolean;
  handleRemoveFile?: (aId: string) => Promise<void>;
  handleDownloadFile?: () => Promise<void>;
  accept?: string;
  maxFileSize?: number;
  hintText?: string;
  relatedFieldName?: string;
  isClearable?: boolean;
  maxAllowedCharacters?: number;
  rows?: number;
  isArabic?: boolean
}


export interface ApiError {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;
}

export interface IExtendedApiError extends ApiError {
   customMessage?: { title: string; description: string };
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  NOT_MODIFIED = 304,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,

  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}