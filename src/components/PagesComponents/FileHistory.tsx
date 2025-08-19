import React from 'react'
import { CustomSteps, type StepsData } from '../custom-steps/CustomSteps'
import { Button } from '../custom-button/custom-button'

export const FileHistory = () => {

  const steps: StepsData[] = [
    { title: "قيد المراجعة", subTitle: "12/8/2023", status: "completed", },
    { title: "في انتظار اجراءك", subTitle: "12/8/2023", status: "current" },
    {
      title: "في انتظار اجراءك", subTitle: "12/8/2023", status: "upcoming", description: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي'
    },
  ];
  return (
    <div>
      <CustomSteps
        steps={steps}
        title="سجل الملف"
      />
      <section className='flex justify-end'>
        <Button text="إلغاء" isLoading={false} type='reset' className='btn-outline w-[82px] h-[48px]' />
      </section>
    </div>
  )
}
