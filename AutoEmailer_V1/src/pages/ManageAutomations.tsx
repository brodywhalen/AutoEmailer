import BackButton from "../components/BackButton"
import { useEffect } from "react"
import axios from "axios"
const ManageAutomations = () => {
 
    useEffect(()=>{
        const myFlows = axios.get('')

    })

    return(
    <>
        <BackButton/>
        <input></input>
        <div>

        </div>
    
    
    
    
    </>)
}

export default ManageAutomations;