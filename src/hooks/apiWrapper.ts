import { EnvironmentType } from "@moj/common";
import { useError } from "../context/error-context";
import { isApiException } from "../helpers/function-helper";
import { HttpStatusCode } from "../types/types";
import i18n from "../i18n";

export interface ApiCallOptions {
  showError?: boolean;
  customErrorMessage?: { title: string; description: string };
}

/**
 * A simplified wrapper for API calls that handles errors and returns data directly
 * @param apiFunction The API function to execute
 * @param options Error handling options
 * @param args Function arguments
 * @returns Promise with the API result or null if there's an error
 */
export const useApiWrapper = () => {
  const { setError, hasError, enironmentName } = useError();

  const createErrorPayload = (error: any, customErrorMessage?: { title: string; description: string }) => ({
    message: error?.message || i18n.t("Error.Unknown.Message"),
    status: error?.status || 500,
    response: error?.response || "",
    headers: error?.headers || {},
    result: error?.result || null,
    customMessage: customErrorMessage,
  });

  const handleError = (error: any, showError: boolean, customErrorMessage?: { title: string; description: string }) => {
    if (enironmentName === EnvironmentType.Development) {
      console.error("[useApiWrapper] API Error:", error);
    }

    if (!showError) return;

    // Ignore 204 No Content responses
    if (isApiException(error) && error?.status === HttpStatusCode.NO_CONTENT) {
      return;
    }

    const errorPayload = isApiException(error) || error instanceof Error 
      ? createErrorPayload(error, customErrorMessage)
      : createErrorPayload({ message: i18n.t("Error.Unknown.Message"), status: 500 }, customErrorMessage);

    setError(errorPayload, showError);
  };

  const apiWrapper = async <T extends (...args: any[]) => Promise<any>>(
    apiFunction: T,
    options: ApiCallOptions = {},
    ...args: Parameters<T>
  ): Promise<Awaited<ReturnType<T>> | null> => {
    const { showError = true, customErrorMessage } = options;

    // Don't proceed if there's already an error and we're showing errors
    if (showError && hasError()) {
      return null;
    }

    try {
      return await apiFunction(...args);
    } catch (error) {
      handleError(error, showError, customErrorMessage);
      return null;
    }
  };

  return apiWrapper;
};