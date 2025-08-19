import { useState } from 'react'
import { Text } from '../custom-text/custom-text'
import { TextType } from '../custom-text/custom-text'
import { Button } from '../custom-button/custom-button'
import { AddGoldSvgIcon } from '../icons/icons'
import { RendererInput } from '../rendererComponents/renderer-input'
import { CustomInputType } from "../../types/types";
import { CustomTableWithTabs } from '../custom-table/custom-table-with-tabs'
import { type TableCell } from '../custom-table/custom-table'
import { ViewSvgIcon } from '../icons/icons'
import { CustomTag } from '../custom-tag/custom-tag'


export const LegalFile = () => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const disputeRows: TableCell[] = [
        {
            cells: ["2022/45678", "ملف توجيه اسري", "15/03/2022", "15/03/2022", <CustomTag color="text-aegreen-800" bg="bg-aegreen-100" className='w-[111px] h-[32px] flex justify-center items-center font-semibold' text="متداولة" />, <ViewSvgIcon />]
        },
        {
            cells: ["2023/11235", "ملف وساطة وتوثيق", "05/09/2023", "05/09/2023",  <CustomTag color="text-aered-800" bg="bg-aered-100" className='w-[111px] h-[32px] flex justify-center items-center font-semibold' text="مفصولة" />, <ViewSvgIcon />]
        },
        {
            cells: ["2021/77899", "ملف دعوى", "28/11/2021", "28/11/2021",  <CustomTag color="text-techblue-800" bg="bg-techblue-100" className='w-[111px] h-[32px] flex justify-center items-center font-semibold' text="في انتظار اجراءك" />, <ViewSvgIcon />]
        },
        {
            cells: ["2021/77899", "أمر على عريضة", "28/11/2021", "28/11/2021",  <CustomTag color="text-aegreen-800" bg="bg-aegreen-100" className='w-[111px] h-[32px] flex justify-center items-center font-semibold' text="متداولة" />, <ViewSvgIcon />]
        }
    ];


    return (
        <div className='flex flex-col gap-8'>
            <section>
                <CustomTableWithTabs
                    headers={["رقم الملف", "نوع الملف", "تاريخ الإصدار", "تاريخ التحديث", "الحالة", "الإجراءات"]}
                    rows={disputeRows}
                    loading={false}
                    withHeaders={true}
                    title="الملفات القضائية (القيود)"
                    buttonActionText="إضافة قيد"
                    buttonAction={() => console.log("Add row")}
                    handleSearch={(keyword) => console.log("Search", keyword)}
                    isArabic={true}
                    searchPlaceholder="ابحث بالرقم او بالإسم"
                    searchLabel="بحث"
                />

            </section>
            <section className='flex justify-end'>
                <Button text="إلغاء" isLoading={false} type='reset' className='btn-outline w-[82px] h-[48px]' />
            </section>
        </div>

    )
}
