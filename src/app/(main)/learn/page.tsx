import FeedWrapper from "@/components/feedWrapper";
import StickyWrapper from "@/components/stickyWrapper";
import Header from "./header";
import UserProgress from "@/components/userProgress";
import { userProgress } from "@/db/schema";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function Learn(){
    const {getToken} = await auth()
    const responseUserProgress = await fetch("http://localhost:3000/api/userProgress", {headers: { Authorization: `Bearer ${await getToken()}`}})
    const userProgress = await responseUserProgress.json()
    if(!userProgress || !userProgress.activeCourseId){
        redirect('/courses')
    }

    return <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
            <UserProgress 
             activeCourse={{title: 'Spanish', imageSrc:'/assets/es.svg'}}
             hearts={5}
             points={100}
             hasActiveSubscription={false}
            />
        </StickyWrapper>
        <FeedWrapper>
            <Header title="Spanish"/>
            <div className="space-y-4">
                <div className="h-[700px] bg-blue-600 w-full"></div>
                <div className="h-[700px] bg-blue-600 w-full"></div>
                <div className="h-[700px] bg-blue-600 w-full"></div>
            </div>
        </FeedWrapper>
    </div>
}