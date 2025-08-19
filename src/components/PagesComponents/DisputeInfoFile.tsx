import React from 'react'
import { Text } from '../custom-text/custom-text'
import { TextType } from '../custom-text/custom-text'
import { Button } from '../../components/custom-button/custom-button'
import { CardComponent } from '../custom-card/card-component'
import { CustomTag } from '../custom-tag/custom-tag'
export const DisputeInfoFile = () => {

  return (
    <div className='flex flex-col gap-5'>
      <section>
        <CardComponent
          mainTitle="معلومات ملف المنازعة"
          withHeaders={true}
          withBorder={true}
          data={[
            { label: "رقم الملف", value: "D01/2014" },
            { label: "حالة الملف", value: <CustomTag color="text-aegreen-800" bg="bg-aegreen-100" className='w-[111px] h-[32px] flex justify-center items-center font-semibold' text="قيد التداول" /> },
            { label: "تاريخ الإنشاء", value: "25/12/2023" },
            { label: "تاريخ التحديث", value: "25/12/2023" },
          ]}
          gridClassName="grid-cols-2"
          isArabic={false}
          containerClassName="shadow-card [&>*:first-child]:border-b-0"

        />
      </section>
      <section className='flex justify-end'>
        <Button text="إلغاء" isLoading={false} type='reset' className='btn-outline w-[82px] h-[48px]' />
      </section>
    </div>
  )
}
