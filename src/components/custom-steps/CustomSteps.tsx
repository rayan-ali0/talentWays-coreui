import React, { type FC } from 'react'
import { Text } from '../custom-text/custom-text'
import {
    TextType

} from '../custom-text/custom-text'

export interface StepsData {
    title: string,
    subTitle: string,
    status: "current" | "completed" | "upcoming",
    description?: string
}

export interface CustomStepsProps {
    title: string,
    steps: StepsData[],
    // description: string

}

export const CustomSteps: FC<CustomStepsProps> = ({
    title,
    steps,
}) => {
    return (
        <div className='flex flex-col gap-8'>
            <section>
                <Text as={TextType.H4} text={title} isArabic={true} className='' />
            </section>
            <section>
                <nav aria-label="Progress" className="aegov-step inline-block">
                    <ol role="list">
                        {
                            steps &&
                            steps.map((step, i) => (

                                <li className={`relative step-${step.status} pb-10 flex gap-7`}>
                                    {/* <!-- Completed Step --> */}
                                    <div className={`step-connector-state step-connector-vertical ${step.status === "upcoming" && 'hidden'}`} aria-hidden="true" ></div>
                                    <a href="#" className={step.status === "completed" ? '' : "step-badge"} aria-current={step.status === "current" ? "step" : undefined} >
                                        <span className={step.status === "completed" ? "step-badge" : "hidden"}></span>
                                        {step.status !== 'completed' && i}
                                    </a>
                                    <div className='flex flex-col gap-2'>
                                        <Text as={TextType.H6} text={step.title} isArabic={true} className='' />
                                        <Text as={TextType.SPAN} text={step.subTitle} className='text-aeblack-500' isArabic={true} />
                                        {step.description &&
                                            <Text as={TextType.P} text={step.description} isArabic={true} className='text-aeblack-500' />
                                        }
                                    
                                    </div>

                                </li>
                            ))
                        }
                    </ol>
                </nav>

            </section>


        </div>
    )
}
