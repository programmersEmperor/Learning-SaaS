'use server'

import db from "@/db/drizzle"
import { userProgress } from "@/db/schema"
import { auth, currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function upsertUserProgess(courseId: number) {
    const {userId, getToken} = await auth()
    const user = await currentUser()

    if(!userId || !user){
        throw new Error("Unauthenticated")
    }

    const responseCourse = await fetch('http://localhost:3000/api/courses', {headers: { Authorization: `Bearer ${await getToken()}` }});
    const courses = await responseCourse.json()

    // throw new Error("something")
    if(!courses){
        throw new Error('Courses not found')
    }

    // if(!courses.unit.length || !courses.unit[0].length){
    //     throw new Error('the course is empty')
    // }

    const responseUserProgress = await fetch("http://localhost:3000/api/userProgress", {headers: { Authorization: `Bearer ${await getToken()}`}})
    const userProgressJson = await responseUserProgress.json();
    if(userProgressJson && userProgressJson.activeCourseId){
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || 'User',
            userImageSrc: user.imageUrl || '/assets/mascot.svg'
        })
    }
    else{
        console.log("add new")
        await db.insert(userProgress).values({
            userId: userId,
            activeCourseId: courseId,
            userName: user.firstName || 'User',
            userImageSrc: user.imageUrl || '/assets/mascot.svg'
        })
    }

    revalidatePath('/learn')
    revalidatePath('/courses')
    revalidatePath('/api/userProgress')
    redirect('/learn')

}