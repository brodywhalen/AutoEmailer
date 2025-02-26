// import React from "react"
import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import BackButton from "../components/BackButton"
import './../component-styles/MainMenu.css'
import {NewList} from '../utils/types'
import Table from "../components/Table"
import Toogle from "../components/Toogle"

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
    <div className="list-box">
    <h1 className="menu-title">My Lists</h1>
    {lists.map(list => {
        return(

            <Toogle listName = {list.listName}><div className="table-container"><Table list={list}/></div></Toogle>

            // 


            // <ul> {list.listName} {list.contacts[0].email}</ul>
        )
    })}
    </div>
    

</>
)

}
export default ViewList