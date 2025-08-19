import React, { useState } from 'react'
import { CustomBanner } from '../components/custom-banner/custom-banner'

export const ManageDispute = () => {
    const [pageTitle,setPageTitle]=useState("ملف منازعة D01/2014")
    return (
        <main className='p-5'>
            
            <section>
                <CustomBanner title={pageTitle} isArabic={true} />
            </section>

        </main>
    )
}
