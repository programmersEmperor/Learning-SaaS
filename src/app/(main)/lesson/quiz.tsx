"use client"

import { useState, useTransition } from "react";
import Header from "./header";
import QuestionBubble from "./questionBubble";
import Challenge from "./challenge";
import Footer from "./footer";
import { upsertChallengeProgress } from "@/app/actions";
import { toast } from "sonner";

interface Props{
    initialLessonId: number;
    initialLessonChallenges: any; 
    initialHearts: number;
    initialPercentage: number
    userSubscription: any;
}

export default function Quiz({initialLessonId, initialHearts, initialLessonChallenges, initialPercentage, userSubscription}: Props){
    const [pending, startTransition] = useTransition()
    const [hearts, setHearts] = useState(initialHearts)
    const [percentage, setPercentage] = useState(initialPercentage)
    const [challenges] = useState(initialLessonChallenges)
    const [activeIndex, setActiveIndex] = useState(()=>{
        const uncompletedIndex = challenges.findIndex((challenge: any)=>!challenge.completed)
        return uncompletedIndex === -1? 0: uncompletedIndex;
    }) 
    const challenge = challenges[activeIndex]
    const options = challenge.challengeOptions ?? []
    const title = challenge.type === 'ASSIST' ? "Select the correct meaning" : challenge.question;
    const [selectedOption, setSelectedOption] = useState<Number>()
    const [status, setStatus] = useState<"correct" | "wrong" | 'none'>('none')
    const onSelect = (id: number)=>{
        if(status !== 'none') return ;
        setSelectedOption(id)
    }

    const onNext = ()=>{
        setActiveIndex((current: number)=> current+1)
    }

    const onContinue = ()=>{
        if(!selectedOption) return;
        
        if(status === 'wrong'){
            setStatus("none")
            setSelectedOption(undefined)
            return    
        }

        if(status === 'correct'){
            onNext()
            setStatus("none")
            setSelectedOption(undefined)    
            return
        }
        
        const correctOption = options.find((option: any)=> option.correct)
        if(!correctOption) return;
        if(correctOption && correctOption.id === selectedOption){
            startTransition(()=>{
                upsertChallengeProgress(challenge.id).then((response)=>{
                    if(response?.error === 'hearts'){
                        console.error('missing hearts')
                        return;
                    }

                    setStatus('correct')
                    setPercentage(prev=> prev + 100 / challenges.length) 
                    if(initialPercentage === 1000){
                        setHearts(prev=> Math.min(prev +1, 5))
                    }
                }).catch(()=>{
                    toast.error("something went wrong, please try again")
                })
            })
        }
        else{
            console.error('incorrect option')
        }

    }


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
                        selectedOption={selectedOption}
                        status={status}
                        onSelect={onSelect}
                        disabled={false}
                        type={challenge.type}
                        />
                    </div>
                </div>
            </div>
        </div>
        <Footer disabled={!selectedOption} status={status} onCheck={onContinue}/>
    </>
}