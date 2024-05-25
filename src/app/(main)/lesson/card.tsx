import { challenges } from "@/db/schema";

interface Props{
    id: number;
    imageSrc: string;
    audioSrc: string;
    text: string;
    shortcut: string;
    selected?: boolean;
    onClick: ()=>void;
    disabled?: boolean;
    status: "correct" | "wrong" | "none",
    type: typeof challenges.$inferSelect['type']
}

export default function Card({id, audioSrc, imageSrc, onClick, shortcut, status, text, type, disabled, selected}: Props){
    return <div>card</div>
}