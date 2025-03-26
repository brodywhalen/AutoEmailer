import type { Node, Edge } from "@xyflow/react"
import axios, { AxiosError } from "axios"
import { Dispatch, SetStateAction } from "react"
// import { ListSchema } from "../utils/types"
// interface FlowObject {
//     id: string,
//     type?: string | undefined,
//     position: {x?:number| undefined, y?:number| undefined} | undefined
//     measured?: {height?:number| undefined , width?:number| undefined}| undefined
//     data: {
//         label?: string | null
//         lists?: ListSchema[] // this might be hella bad lol.
//         selected_id?: string | null
//         time?: string | null
//         timezone?: string | null
//     }
//     [x: string | number | symbol]: unknown;    
// }


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const  saveState = async (nodes: Node[], _edges: Edge[], flowname: string, description: string, setIsLoading: Dispatch<SetStateAction<boolean>>, setIsOpen: Dispatch<SetStateAction<boolean>>) => {
    // console.log(nodes)
    const payload = {
        flowname: flowname,
        description: description,
        nodes: nodes,
        edges: _edges
    }

    try{
        setIsLoading(true)
        const response = await axios.post('http://localhost:3000/flow/saveFlow', payload).then()
        console.log('saved list res: ', response)
        alert('Flow Saved!')
        setIsOpen(false)
        

    } catch (err){
        if(err instanceof AxiosError){
            if(!err.response){
                alert('No response from the server')
            }
            
            console.log(err.response!.data.error)
            alert(err.response!.data.error)
        }
    } finally {
        setIsLoading(false)
    } 

} 