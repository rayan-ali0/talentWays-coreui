import React, { ReactNode } from "react";

interface ITab {
    key: any,
    title: string,
    disabled?: boolean,
    children?: any,
    onChangeTab: (key: any) => void;
}

interface ITabsHeader {
    activeTab: any;
    tabs: ITab[];
    action?: ReactNode,
}

/**
* CustomTabs Component
*
* Displays a set of tabs with customizable titles, content, and behavior. Each tab can have its own content
* and an `onChangeTab` function to handle tab switching. The active tab can be controlled and passed down 
* through the `activeTab` prop.
*
* @component
* @param {any} activeTab - The key of the currently active tab.
* @param {ITab[]} tabs - An array of tab objects containing the title, content, and callback for tab changes.
* @param {any} tabs.key - A unique identifier for each tab.
* @param {string} tabs.title - The title of the tab to be displayed.
* @param {boolean} [tabs.disabled] - If `true`, the tab will be disabled and not clickable.
* @param {any} [tabs.children] - The content that will be displayed when the tab is active.
* @param {(key: any) => void} tabs.onChangeTab - Callback function to handle tab change. It is triggered when a tab is clicked.
* @returns {JSX.Element} The rendered custom tabs component with header and content.
*/

export const CustomTabs: React.FC<ITabsHeader> = ({
    tabs,
    activeTab,
    action
}) => {


    function getTabClasses(tab: ITab) {
        let classes = `${action ? "w-max" : "w-full"} text-center leading-[30px] font-semibold text-base tab  h-max py-[5px] px-2 rounded cursor-pointer `;
        if (tab.key == activeTab) {
            classes += "text-aegold-800 bg-aegold-100"
        }
        else if (tab.disabled == true) {
            classes += "bg-aeblack-50 text-aeblack-200"
        }
        return classes;
    }

    function getTabContents() {
        return tabs.find(x => x.key == activeTab)?.children || <></>
    }
    return (
        <div className={`${action ? '' : 'w-full'}  h-max`}>
            <div className="flex items-center justify-between">
                <div className={`${action ? '' : 'min-w-full'} items-center flex  max-md:flex-wrap flex-nowrap max-md:flex-col  p-[5px] gap-2.5 rounded-[7px] border border-desert-50 border-solid bg-whitely-50`}>
                    {tabs.map((tab: ITab, index: number) => {
                        return (
                            <div key={tab.key || index} className={getTabClasses(tab)}
                                onClick={() => { if (!tab.disabled) tab.onChangeTab(tab.key) }}>
                                {tab.title}
                            </div>
                        )
                    })}

                </div>
                <div>{action}</div>
            </div>
            <div className="mt-5">
                {getTabContents()}
            </div>

        </div>
    );
};

