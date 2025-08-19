import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { HttpStatusCode, IExtendedApiError } from "../types/types";
import i18n from "../i18n";
import { Dialog } from "../components";
import { EnvironmentType } from "@moj/common";

interface ErrorContextType {
  error: IExtendedApiError | null;
  isModalOpen: boolean;
  setError: (error: IExtendedApiError, showModal?: boolean) => void;
  clearError: () => void;
  closeModal: () => void;
  getErrorMessageByStatus: (status: number) => { title: string; description: string };
  enironmentName: EnvironmentType;
  hasError: () => boolean;
}

const ErrorContext = createContext<ErrorContextType | null>(null);

interface ErrorProviderProps {
  children: ReactNode;
  preferredLanguage: string;
  enironmentName: EnvironmentType;
  navigateToLogin: () => void;
}

const getDefaultErrorMessage = (status: number): { title: string; description: string } => {
  switch (status) {
    case HttpStatusCode.BAD_REQUEST:
      return {
        title: i18n.t("Error.BadRequest.Title"),
        description: i18n.t("Error.BadRequest.Description"),
      };
    case HttpStatusCode.UNAUTHORIZED:
      return {
        title: i18n.t("Error.Unauthorized.Title"),
        description: i18n.t("Error.Unauthorized.Description"),
      };
    case HttpStatusCode.FORBIDDEN:
      return {
        title: i18n.t("Error.Forbidden.Title"),
        description: i18n.t("Error.Forbidden.Description"),
      };
    case HttpStatusCode.NOT_FOUND:
      return {
        title: i18n.t("Error.NotFound.Title"),
        description: i18n.t("Error.NotFound.Description"),
      };
    case HttpStatusCode.INTERNAL_SERVER_ERROR:
      return {
        title: i18n.t("Error.ServerError.Title"),
        description: i18n.t("Error.ServerError.Description"),
      };
    default:
      return {
        title: i18n.t("Error.Unknown.Title"),
        description: i18n.t("Error.Unknown.Description"),
      };
  }
};

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children, preferredLanguage,enironmentName, navigateToLogin }) => {
  const [error, setErrorState] = useState<IExtendedApiError | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setError = (error: IExtendedApiError, showModal = true) => {
    if (!hasError()) {
      setErrorState(error);
      if (showModal) {
        setIsModalOpen(true);
      }
    }
  };

  const clearError = () => {
    setErrorState(null);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    if (error?.status === HttpStatusCode.UNAUTHORIZED) {
      navigateToLogin();
    }
    setIsModalOpen(false);
    clearError();
  };

  const getErrorMessageByStatus = (status: number): { title: string; description: string } => {
    return getDefaultErrorMessage(status);
  };

  const hasError = (): boolean => {
    return error !== null;
  };

  useEffect(() => {
    if (preferredLanguage) {
      i18n.changeLanguage(preferredLanguage);
    }
  }, [preferredLanguage]);

  const errorMessage = error?.customMessage || getErrorMessageByStatus(error?.status || 500);

  return (
    <ErrorContext.Provider
      value={{
        error,
        isModalOpen,
        setError,
        clearError,
        closeModal,
        getErrorMessageByStatus,
        hasError,
        enironmentName,
      }}
    >
      {children}
      {isModalOpen && (
        <Dialog
          title={errorMessage.title}
          description={errorMessage.description}
          continueLabel={i18n.t("Error.Continue")}
          continueAction={closeModal}
          type="error"
        />
      )}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};
