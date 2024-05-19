interface Props{
    children: any;
}

export default function Footer({children}: Props){
    return <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
        {children}
    </footer>
}