import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from "react"
import '../component-styles/MainMenu.css'





// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const Toogle = (props: { listName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {
const [toggle, setToggle] = useState<boolean>(false);
 
return(
    <>
    <div className="list-item">
        <h2>{props.listName}</h2>
        <button onClick={() => setToggle(!toggle)}> {toggle ? 'hide' : 'show' } </button>
    </div>
    
    <div> {toggle ? props.children : <></>}</div>
    </>
    

 )
}
export default Toogle