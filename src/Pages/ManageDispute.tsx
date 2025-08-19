import React, { useState } from 'react'
import { CustomBanner } from '../components/custom-banner/custom-banner'
import { DisputeInfoFile } from '../components/PagesComponents/DisputeInfoFile'
import { Button } from '../components/custom-button/custom-button'
import { SideTabs, type ISideTab } from '../components/custom-side-tabs/custom-side-tabs'
import { LegalFile } from '../components/PagesComponents/LegalFile'
import { InfoSvgIcon } from '../components/icons/icons'
import { FileIcon } from '../components/icons/icons'
import { ClockCounterIcon } from '../components/icons/icons'
import  { FileHistory } from '../components/PagesComponents/FileHistory'

export const ManageDispute = () => {
    const [pageTitle, setPageTitle] = useState("ملف منازعة D01/2014")
    const [activeTab, setActiveTab] = useState(0);
    console.log(activeTab)
    const tabs: ISideTab[] = [
        {
            title:
                <div className='flex flex-row-reverse gap-3'>
                    <span>معلومات الملف</span>
                    <InfoSvgIcon />
                </div>
            ,
            component: <DisputeInfoFile />,
        },
        {

            title:
                <div className='flex flex-row-reverse gap-3'>
                    <span>  الملفات القضائية</span>
                    <FileIcon />
                </div>,
            component: <LegalFile />,
        },
        {
            title:
                <div className='flex flex-row-reverse gap-3'>
                    <span>               سجل الملف  </span>
                    <ClockCounterIcon />
                </div>,
            component: <FileHistory/>,
        },
    ];

    return (
        <main className=' flex flex-col gap-8 p-5'>

            <section>
                <CustomBanner title={pageTitle} isArabic={true} />
            </section>
            <section className='flex flex-col gap-4'>
                    <SideTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={(index) => setActiveTab(index)}
                        className='h-auto'
                    />
            </section>

        </main>
    )
}
