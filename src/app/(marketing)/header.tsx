interface Props{
    children: any;
}

export default function Header({children}: Props){
    return <header className="h-20 w-full border-b-2 border-slate-200 px-4">
        {children}
    </header>
}