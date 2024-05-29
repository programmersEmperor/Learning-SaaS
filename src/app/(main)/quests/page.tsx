import FeedWrapper from "@/components/feedWrapper";
import StickyWrapper from "@/components/stickyWrapper";
import { AvatarImage } from "@/components/ui/avatar";
import UserProgress from "@/components/userProgress";
import { auth } from "@clerk/nextjs/server";
import { Avatar } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Quests(){
    const {getToken} = await auth()
    const responseUserProgress = await fetch("http://localhost:3000/api/userProgress", {headers: { Authorization: `Bearer ${await getToken()}`}})
    const json = await responseUserProgress.json()
    const userProgress = json.result
    if(!userProgress || !userProgress.activeCourseId){
        redirect('/courses')
    }

    const responseUserSubscription = await fetch("http://localhost:3000/api/userSubscription", {headers: { Authorization: `Bearer ${await getToken()}`}})
    const userSubscriptionJson = await responseUserSubscription.json()
    const userSubscriptionData = userSubscriptionJson.result
    const isPro = !!userSubscriptionData?.isActive;    

    // const responseTopLearners = await fetch("http://localhost:3000/api/topLearners", {headers: { Authorization: `Bearer ${await getToken()}`}})
    // const topLearnersJson = await responseTopLearners.json()
    // const topLearnersData = topLearnersJson.result
    // if(topLearnersData){
    //     redirect('/courses')
    // }

    return <div className="flex flex-row-reverse gaq-[48px] px-6">
        <StickyWrapper>
            <UserProgress activeCourse={userProgress.activeCourse}  hearts={userProgress.hearts} points={userProgress.points} hasActiveSubscription={isPro} />
        </StickyWrapper>
        <FeedWrapper>
            <div className="w-full flex flex-col items-center">
                <Image src={'/assets/leaderboard.svg'}  alt="Leaderboard" width={90} height={90}/>
            </div>
            <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                Leaderboard
            </h1>
            <p className="text-muted-foreground text-center text-lg mb-6">
                See where you stand among other learners in the community.
            </p>
            <Separator className="mb-4 h-0.5 rounded-full" />
            {topLearnersData.map((userProgress: any, index: number)=> 
            <div key={userProgress.userId} className="flex items-center w-full p-2  px-4 rounded-xl hover:bg-gray-200/50">
                <p className="font-bold text-lime-700 mr-4">{index + 1}</p>
                <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
                    <AvatarImage className="object-cover" src={userProgress.userImageSrc}/>
                </Avatar>
                <p className="font-bold text-neutral-800 flex-1">{userProgress.userName}</p>
                <p className="text-muted-foreground">{userProgress.points} XP</p>
            </div>)}
        </FeedWrapper>
    </div>
}