import FeedWrapper from "@/components/feedWrapper";
import StickyWrapper from "@/components/stickyWrapper";
import Header from "./header";
import UserProgress from "@/components/userProgress";

export default function Learn(){
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