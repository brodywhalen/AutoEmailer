import React from "react"
import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import BackButton from "../components/BackButton"
import './../component-styles/MainMenu.css'
import {NewList} from '../utils/types'
import Table from "../components/Table"

const ViewList = () =>{
const [lists, setLists] = useState<NewList[]>([])

useEffect(()=> { (async()=>{
    
    try{
        const myLists = await axios.get('http://localhost:3000/list/getData')
        console.log(myLists.data)
        setLists(myLists.data)
    } catch(error) {
        if(error instanceof AxiosError){
            if(!error.response){
                alert('No response from the server')
            }
            console.log(error.response!.data.error)
            alert(error.response!.data.error)
        }

    }
    
})()},[])

return(
<>
    <BackButton/>
    <h1 className="menu-title">My Lists</h1>
    {lists.map(list => {
        return(

            <Table list={list}/>


            // <ul> {list.listName} {list.contacts[0].email}</ul>
        )
    })}


</>
)

}
export default ViewList