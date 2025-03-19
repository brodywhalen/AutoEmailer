import type { Node, Edge } from "@xyflow/react"
import axios from "axios"
import { ListSchema } from "../utils/types"
interface FlowObject {
    id: string,
    type?: string | undefined,
    position: {x?:number| undefined, y?:number| undefined} | undefined
    measured?: {height?:number| undefined , width?:number| undefined}| undefined
    data: {
        label?: string | null
        lists?: ListSchema[] // this might be hella bad lol.
        selected_id?: string | null
        time?: string | null
        timezone?: string | null
    }
    [x: string | number | symbol]: unknown;    
}


export const saveState = (nodes: Node[], edges: Edge[]) => {
    console.log(nodes, edges)
    const payload:FlowObject[] = nodes
    const response = axios.post('http://localhost:3000/flow/saveFlow', payload)
    console.log('saved list res: ', response)
} 