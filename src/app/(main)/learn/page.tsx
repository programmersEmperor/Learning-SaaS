import FeedWrapper from "@/components/feedWrapper";
import StickyWrapper from "@/components/stickyWrapper";
import Header from "./header";
import UserProgress from "@/components/userProgress";
import { userProgress } from "@/db/schema";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Unit from "./unit";

export default async function Learn(){
    const {getToken} = await auth()
    const responseUserProgress = await fetch("http://localhost:3000/api/userProgress", {headers: { Authorization: `Bearer ${await getToken()}`}})
    const json = await responseUserProgress.json()
    const userProgress = json.result
    if(!userProgress || !userProgress.activeCourseId){
        redirect('/courses')
    }

    const responesUnits = await fetch('http://localhost:3000/api/units', {headers: { Authorization: `Bearer ${await getToken()}`}})
    const unitJson = await responesUnits.json();
    const units = unitJson.result    

    const responseCourseProgress = await fetch('http://localhost:3000/api/courseProgress', {headers: { Authorization: `Bearer ${await getToken()}`}})
    const courseProgressJson = await responseCourseProgress.json(); 
    const courseProgress: {activeLesson: any; activeLessonId: any;} = courseProgressJson.result
    if(!courseProgress){
        redirect('/courses')
    }


    const responseLessonPercentage = await fetch('http://localhost:3000/api/lessonPercentage', {headers: { Authorization: `Bearer ${await getToken()}`}})
    const lessonPercentageJson = await responseLessonPercentage.json();
    let lessonPercentage: {percentage: number} = lessonPercentageJson.result
    if(!lessonPercentage){
        lessonPercentage = {
            percentage: 0
        };
    }

    const responseUserSubscription = await fetch("http://localhost:3000/api/userSubscription", {headers: { Authorization: `Bearer ${await getToken()}`}})
    const userSubscriptionJson = await responseUserSubscription.json()
    const userSubscriptionData = userSubscriptionJson.result
    const isPro = !!userSubscriptionData?.isActive;

    return <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
            <UserProgress 
             activeCourse={userProgress.activeCourse}
             hearts={userProgress.hearts}
             points={userProgress.points}
             hasActiveSubscription={isPro}
            />
        </StickyWrapper>
        <FeedWrapper>
            <Header title={userProgress.activeCourse.title}/>
            {units.map((unit: any)=><div key={unit.id} className="mb-10">
                <Unit
                 id={unit.id}
                 order={unit.order}
                 description={unit.description}
                 title={unit.title}
                 lessons={unit.lessons}
                 activeLesson={courseProgress.activeLesson}
                 activeLessonPercentage={lessonPercentage.percentage}
                />
            </div>)}
        </FeedWrapper>
    </div>
}