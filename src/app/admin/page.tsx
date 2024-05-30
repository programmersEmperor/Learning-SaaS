import dynamic from "next/dynamic";
const App = dynamic(()=> import('./app'), {ssr: false}) 
// just some random comment
export default function Admin(){
    return <App/>
}