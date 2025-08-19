import React, { FC, ReactNode, useEffect, useMemo, useRef } from "react";

export interface ISideTab {
  title: ReactNode;
  component: ReactNode;
  disabled?: boolean;
}

export interface ISideTabsProps {
  tabs: ISideTab[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
  tabsClassName?: string;
  className?: string;
  contentClassName?: string;
}

export const SideTabs: FC<ISideTabsProps> = ({
  tabs,
  activeTab = 0,
  onTabChange,
  tabsClassName = "min-w-64",
  className = "h-screen",
  contentClassName = "",
}) => {
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);
  // Memoize active content to prevent unnecessary re-renders
  const activeContent = useMemo(() => {
    return tabs[activeTab]?.component || null;
  }, [tabs, activeTab]);

  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length);
  }, [tabs.length]);

  const handleTabClick = (index: number, element?: HTMLElement) => {
    if (tabs[index]?.disabled) return;
    onTabChange?.(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleTabClick(index);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < tabs.length) {
        const nextEnabledIndex = tabs.findIndex((tab, i) => i >= nextIndex && !tab.disabled);
        if (nextEnabledIndex !== -1) {
          handleTabClick(nextEnabledIndex);
          const nextElement = event.currentTarget.parentElement?.nextElementSibling?.querySelector(
            '[role="tab"]'
          ) as HTMLElement;
          nextElement?.focus();
        }
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prevIndex = index - 1;
      if (prevIndex >= 0) {
        const prevEnabledIndex = [...tabs].reverse().findIndex((tab, i) => {
          const actualIndex = tabs.length - 1 - i;
          return actualIndex <= prevIndex && !tab.disabled;
        });
        if (prevEnabledIndex !== -1) {
          const actualPrevIndex = tabs.length - 1 - prevEnabledIndex;
          handleTabClick(actualPrevIndex);
          const prevElement = event.currentTarget.parentElement?.previousElementSibling?.querySelector(
            '[role="tab"]'
          ) as HTMLElement;
          prevElement?.focus();
        }
      }
    }
  };

  if (!tabs.length) {
    return null;
  }

  const tabsList = (
    <div className={`aegov-tab tab-pills ${tabsClassName}`}>
      <ul
        role="tablist"
        className={`tab-items flex md:flex-col justify-start border-aeblack-200 md:border-e-2 h-full w-full max-md:flex-wrap `}
      >
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`p-2 cursor-pointer  ${activeTab === index ? `border-aegold-500 md:border-e-2` : ""} ${
              tab.disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            role="presentation"
          >
            <li
              ref={(el) => (tabRefs.current[index] = el)}
              role="tab"
              tabIndex={tab.disabled ? -1 : 0}
              aria-selected={activeTab === index}
              aria-disabled={tab.disabled}
              onClick={(e) => handleTabClick(index, e.currentTarget)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`tab-link p-3 w-full h-full transition-colors duration-200 ${
                activeTab === index ? "bg-aegold-100 text-aegold-500" : "hover:bg-gray-50"
              } ${tab.disabled ? "pointer-events-none" : ""}`}
            >
              <div className="flex gap-4 items-center">
                <span className="md:overflow-hidden md:whitespace-nowrap md:text-ellipsis text-wrap">{tab.title}</span>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );

  const content = (
    <div className={`tab-content flex-1 ${contentClassName}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
      {activeContent}
    </div>
  );

  return (
    <div className={`flex md:flex-row flex-col h-full ${className}`}>
      {tabsList}
      {content}
    </div>
  );
};
