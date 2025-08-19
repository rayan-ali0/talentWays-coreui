import React, { useEffect, useState } from "react";
import { AppInitializerProvider } from "../../context/initializer-context";
import { cn, lockBodyScroll, unlockBodyScroll } from "../../helpers/function-helper";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  besideTitleComponent?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  isArabic: boolean;
}

interface SidebarFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface SidebarMainContentProps {
  children: React.ReactNode;
  className?: string;
  isArabic?: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ children, className }) => {
  return (
    <div className="px-4 sm:px-6">
      <hr className="border-aeblack-300" />
      <div className={cn("p-4", className)}>{children}</div>
    </div>
  );
};

// Main Content component
const SidebarMainContent: React.FC<SidebarMainContentProps> = ({ children, className , isArabic }) => {
  return (
    <div className={cn("relative flex-1 px-4 sm:px-6 overflow-y-auto", isArabic ? "rtl" : "ltr")}>
      <div className={cn("py-4", className)}>{children}</div>
    </div>
  );
};

// Main Sidebar component
const SidebarComponent: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  title,
  children,
  besideTitleComponent,
  className,
  isArabic = false,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      lockBodyScroll(); // Lock body scroll when sidebar opens
    } else if (isVisible) {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        unlockBodyScroll(); // Unlock body scroll when sidebar closes
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Cleanup: unlock body scroll on component unmount
  useEffect(() => {
    return () => {
      if (isVisible || isOpen) {
        unlockBodyScroll();
      }
    };
  }, []);

  if (!isVisible && !isOpen) return null;

  return (
    <AppInitializerProvider containerId="side-bar-id" preferredLanguage={isArabic ? "ar" : "en"}>
      <div className="relative z-30" aria-labelledby="sidebar-title" role="dialog" aria-modal="true">
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-aeblack-500/75 transition-opacity duration-500 ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className={`pointer-events-none fixed inset-y-0 inset-x-0 flex ${"justify-start"}`}>
              <div
                className={`pointer-events-auto ${
                  className ? className : "w-3/4 max-md:w-full"
                } transform transition-transform duration-500 ease-in-out ${
                  isAnimating ? "translate-x-0" : isArabic ? "translate-x-full" : "-translate-x-full"
                }`}
              >
                <div className="flex h-full flex-col overflow-hidden bg-whitely-50 shadow-xl rounded-sm">
                  {/* Header with title and close button */}
                  <div
                    className={`px-4 sm:px-6 py-6 flex justify-between items-center 
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-semibold text-aeblack-900" id="sidebar-title">
                        {title}
                      </h2>
                      {besideTitleComponent && besideTitleComponent}
                    </div>
                    <button
                      type="button"
                      className="rounded-md text-aeblack-400 hover:text-aeblack-500 focus:outline-none focus:ring-2 focus:ring-aeblack-500"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close panel</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="px-4 sm:px-6">
                    <hr className="border-aeblack-300" />
                  </div>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppInitializerProvider>
  );
};

export const Sidebar = Object.assign(SidebarComponent, {
  MainContent: SidebarMainContent,
  Footer: SidebarFooter,
}) as typeof SidebarComponent & {
  MainContent: typeof SidebarMainContent;
  Footer: typeof SidebarFooter;
};
