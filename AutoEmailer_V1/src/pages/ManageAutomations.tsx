import BackButton from "../components/BackButton"
import { useEffect, useState } from "react"
import axios from "axios"
import { AxiosError } from "axios"
// import { Background } from "@xyflow/react"
import './../component-styles/flowtable.css'
import { useNavigate } from "react-router-dom"

const ManageAutomations = () => {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const [useFlow, setUseFlow] = useState<any[]>([]) 
    const navigate = useNavigate();

    useEffect(()=>{
   
        axios.get('http://localhost:3000/flow/getFlows').then( (response) => {
            console.log(response)
            setUseFlow(response.data)
        }
        ).catch(error => {
            if(error instanceof AxiosError){
                if(!error.response){
                    alert('No response from the server')
                }
                console.log(error.response!.data.error)
                alert(error.response!.data.error)
            }
        })
        

    },[])
    // console.log(useFlow[0].id)
    return(
    <>
        <BackButton/>
        <div style={{display: 'block', alignItems: 'center'}}>
            <input></input>
            <table className= 'flow'>
                <tbody className= 'flow' >
                    <tr className= 'flow'>
                        <th className= 'flow'> Flow Name </th>
                        <th className= 'flow2 flow'> Description </th>
                        <th className= 'flow'> Node Count </th>
                        <th className= 'flow'> Edge Count </th>
                        <th className= 'flow'> Status </th>
                        <th className= 'flow'> View </th>
                    </tr>
                    {useFlow.map(flow => {
                        return(        
                        <tr className= 'flow'>
                            <td className= 'flow'>{flow.flowname} </td> 
                            <td className= 'flow'>{flow.description} </td>
                            <td className= 'flow'> {flow.nodes.length} </td>
                            <td className= 'flow'>{flow.edges.length} </td>
                            <td className="flow"> PLACEHOLDER </td>
                            <td className="flow"> <button onClick={()=> navigate('/CreateAutomation', {state: flow})}> Open </button> </td>

                        </tr>)

                    })}
               
                </tbody>
            </table>

            
            
        </div>
    
    
    
    
    </>)
}

export default ManageAutomations;