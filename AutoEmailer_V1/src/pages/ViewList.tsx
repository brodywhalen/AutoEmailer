// import React from "react"
import {  useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import BackButton from "../components/BackButton"
import './../component-styles/MainMenu.css'
import {NewList} from '../utils/types'
import Table from "../components/Table"
import Toogle from "../components/Toogle"

const ViewList = () =>{
const [lists, setLists] = useState<NewList[]>([])
const [filter,setFilter] = useState<string>('')

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

const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setFilter(event.target.value)
}

return(
<>
    <BackButton/>
    <div className="list-box">
    <h1 className="menu-title">My Lists</h1>
    <div style={{display: 'flex'}}><div style={{marginRight: '4px'}}>Search</div><input value = {filter} onChange = {handleFilterChange}/></div>
    {lists.filter(item => item.listName.toLowerCase().includes(filter.toLowerCase()) ).map((list) => {
        return(

            <Toogle key={list.id} listName = {list.listName}><div className="table-container"><Table list={list}/></div></Toogle>

            // 


            // <ul> {list.listName} {list.contacts[0].email}</ul>
        )
    })}
    </div>
    

</>
)

}
export default ViewList