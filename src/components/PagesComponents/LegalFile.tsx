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


export const LegalFile = () => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const disputeRows: TableCell[] = [
        {
            cells: ["2022/45678", "ملف توجيه اسري", "15/03/2022", "15/03/2022", <span className="text-green-500">متداولة</span>, <ViewSvgIcon />]
        },
        {
            cells: ["2023/11235", "ملف وساطة وتوثيق", "05/09/2023", "05/09/2023", <span className="text-red-500">مفصولة</span>, <ViewSvgIcon />]
        },
        {
            cells: ["2021/77899", "ملف دعوى", "28/11/2021", "28/11/2021", <span className="text-blue-500">في انتظار إجراءك</span>, <ViewSvgIcon />]
        },
        {
            cells: ["2021/77899", "أمر على عريضة", "28/11/2021", "28/11/2021", <span className="text-green-500">متداولة</span>, <ViewSvgIcon />]
        }
    ];


    return (
        <div className='flex flex-col gap-8'>
            {/* <section className='flex justify-between'>
                <Text as={TextType.H4} text="الملفات القضائية (القيود)" isArabic={true} className='' />
                <Button text="إضافة قيد " isLoading={false} type='button' icon={<AddGoldSvgIcon />} className='btn-soft w-[158px] h-[48px]' />
            </section> */}

            {/* <section className='flex justify-end gap-5'>
                <RendererInput
                    type={CustomInputType.Search} 
                    maxAllowedCharacters={30}
                    name="search"
                    placeholder="ابحث بالرقم او بالإسم"
                    value={searchValue}
                    onChange={handleSearchChange}
                    className='w-[496px] h-[48px] control-secondary'
                />
                <Button text="بحث" isLoading={false} type='button' className='btn-outline w-[77px] h-[48px]' />
            </section> */}

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
