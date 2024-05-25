import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Quiz from "../quiz";

interface Props {
    params: {id?: number[]}
}

export default async function lesson({params}: Props){
    const {getToken} = await auth()

    const lessonId = params.id ? params.id[0] : '';    
    const responesLesson = await fetch(`http://localhost:3000/api/lesson/${lessonId}`, {headers: { Authorization: `Bearer ${await getToken()}`}})
    const LessonJson = await responesLesson.json();
    const lesson = LessonJson.result.lesson  
    if(!lesson){
        redirect('/learn')
    }

    const responseUserProgress  = await fetch("http://localhost:3000/api/userProgress", {headers: { Authorization: `Bearer ${await getToken()}` }})
    const userProgressJson = await responseUserProgress.json();
    const userProgress = userProgressJson.result  
    if(!userProgress){
        redirect('/learn')
    }
    
    const initialPercentage = lesson.challenges.filter((challenge: any)=> challenge.completed).length / lesson.challenges.length * 100;

    return <Quiz
        initialLessonId={lesson.id}
        initialLessonChallenges={lesson.challenges}
        initialHearts={50 || userProgress.hearts}
        initialPercentage={initialPercentage}
        userSubscription={null}
    />
}