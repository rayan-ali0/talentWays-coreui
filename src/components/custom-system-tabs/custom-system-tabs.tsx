import React, { FC, ReactNode } from "react";

export interface ITab {
  key: any;
  title: string;
  disabled?: boolean;
  children?: any;
}

export interface ICustomSystemTabsProps {
  tabs: ITab[]; //TabItem[];
  activeTab: number;
  onTabClick(index: number): void;
  noBorder?: boolean;
}

/**
 * CustomSystemTabs Component
 *
 * A tab navigation component that allows users to switch between different tabs.
 * The active tab is highlighted, and users can click on a tab to activate it.
 * Optionally, borders around the tabs can be removed.
 *
 * @component
 * @param {any[]} tabs - An array of tab items to be displayed as tabs. Each tab contains the content or label for the tab.
 * @param {number} activeTab - The index of the currently active tab.
 * @param {(index: number) => void} onTabClick - A callback function that is triggered when a tab is clicked, receiving the index of the clicked tab.
 * @param {ReactNode[]} [children] - Optional child elements to be displayed within the tabs component.
 * @param {boolean} [noBorder] - If `true`, the tabs will be displayed without borders.
 * @returns {JSX.Element} The rendered custom system tabs component.
 */

export const CustomSystemTabs: FC<ICustomSystemTabsProps> = function _CustomSystemTabs({
  tabs,
  activeTab,
  onTabClick,
  noBorder = false,
}) {
  function getTabContents() {
    return tabs.find((x) => x.key == activeTab)?.children || <></>;
  }
  return (
    <>
      {tabs.length > 0 && (
        <>
          <div className={`items-end ${noBorder ? "" : "aegov-tab"} mb-2 mt-2`}>
            <ul className="gap-4 tab-items md:gap-6 lg:gap-7 xl:gap-8 max-xl:overflow-auto" role="tablist">
              {tabs.map((tab, index) => (
                <li role="presentation" key={`${tab.title}_${index}`}>
                  <div
                    onClick={() => onTabClick(tab.key)}
                    className={`whitespace-nowrap mt-2 p-2 font-medium tab-link hover:cursor-pointer ${
                      tab.key == activeTab.toString() ? "border-b-3 border-aegold-500 text-aegold-600" : ""
                    }`}
                  >
                    {tab.title}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10">{getTabContents()}</div>
        </>
      )}
    </>
  );
};
