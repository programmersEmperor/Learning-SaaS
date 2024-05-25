"use client"

import { useState } from "react";
import Header from "./header";
import QuestionBubble from "./questionBubble";
import Challenge from "./challenge";

interface Props{
    initialLessonId: number;
    initialLessonChallenges: any; 
    initialHearts: number;
    initialPercentage: number
    userSubscription: any;
}

export default function Quiz({initialLessonId, initialHearts, initialLessonChallenges, initialPercentage, userSubscription}: Props){
    const [hearts, setHearts] = useState(initialHearts)
    const [percentage, setPercentage] = useState(initialPercentage)
    const [challenges] = useState(initialLessonChallenges)
    const [activeIndex, setActiveIndex] = useState(()=>{
        const uncompletedIndex = challenges.findIndex((challenge: any)=>!challenge.completed)
        return uncompletedIndex === -1? 0: uncompletedIndex;
    }) 
    const challenge = challenges[activeIndex]
    const options = challenge.options ?? []
    const title = challenge.type === 'ASSIST' ? "Select the correct meaning" : challenge.question;
    console.log("options length: " + options.length)


    return <>
        <Header hearts={hearts} percentage={percentage} hasActiveSubscription={false} />
        <div className="flex-1">
            <div className="h-full flex items-center justify-center">
                <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                    <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                        {title}
                    </h1>
                    <div className="">
                        {challenge.type === 'ASSIST' && <QuestionBubble question={challenge.question}/>}
                        <Challenge 
                        options={options}
                        selectedOption={null}
                        status={'correct'}
                        onSelect={(id)=>{}}
                        disabled={false}
                        type={challenge.type}
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
}