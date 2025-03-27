import BackButton from "../components/BackButton"
import { useEffect, useState } from "react"
import axios from "axios"
import { AxiosError } from "axios"
// import { Background } from "@xyflow/react"
import './../component-styles/flowtable.css'

const ManageAutomations = () => {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const [useFlow, setUseFlow] = useState<any[]>([]) 


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
            <table>
                <tbody >
                    <tr>
                        <th> Flow Name </th>
                        <th className="description"> Description </th>
                        <th> Node Count </th>
                        <th> Edge Count </th>
                        <th> Status </th>
                        <th> View </th>
                    </tr>
                    {useFlow.map(flow => {
                        return(        
                        <tr>
                            <td>{flow.flowname} </td> 
                            <td>{flow.description} </td>
                            <td> {flow.nodes.length} </td>
                            <td>{flow.edges.length} </td>
                        </tr>)

                    })}
               
                </tbody>
            </table>

            
            
        </div>
    
    
    
    
    </>)
}

export default ManageAutomations;