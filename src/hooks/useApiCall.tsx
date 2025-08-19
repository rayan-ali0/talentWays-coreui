import { useState } from "react";
import { useError } from "../context/error-context";
import { isApiException } from "../helpers/function-helper";

interface ApiCallOptions {
  showError?: boolean;
  customErrorMessage?: { title: string; description: string };
}

export const useApiCall = <T extends (...args: any[]) => Promise<any>>(
  apiFunction: T,
  options: ApiCallOptions = {}
) => {
  const {
    showError = true,
    customErrorMessage
  } = options;

  const { setError, hasError } = useError();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Awaited<ReturnType<T>> | null>(null);

  const execute = async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>> | null> => {
    // Don't proceed if there's already an error and we're showing errors
    if (showError && hasError()) {
      return null;
    }

    setLoading(true);

    try {
      const result = await apiFunction(...args);
      setLoading(false);

      if (result) {
        setData(result);
      }

      return result;
    } catch (error) {
      setLoading(false);

      if (showError) {
        if (isApiException(error)) {
          setError(
            {
              message: error?.message,
              status: error?.status,
              response: error?.response,
              headers: error?.headers,
              result: error?.result,
              customMessage: customErrorMessage
            },
            showError
          );
        } else if (error instanceof Error) {
          setError(
            {
              message: customErrorMessage?.title || error.message,
              status: 0,
              response: "",
              headers: {},
              result: null,
            },
            showError
          );
        } else {
          setError(
            {
              message: customErrorMessage?.title || "An unexpected error occurred",
              status: 500,
              response: "",
              headers: {},
              result: null,
            },
            showError
          );
        }
      }

      return null;
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
  };

  return {
    execute,
    loading,
    data,
    reset,
  };
};