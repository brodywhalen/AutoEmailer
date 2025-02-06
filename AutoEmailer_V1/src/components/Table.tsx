// import React from "react"
import { NewList } from "../utils/types"

const Table = ({list}:{list:NewList}) => {
    const contacts = list.contacts;

    return(
        <table>
            <tbody>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>LinkedIn</th>
                </tr>
            {contacts.map(row => {
                return(<tr>
                    {row.name ?
                    <th>{row.name.first}</th>: <th> - </th>}
                    {row.name ?
                    <th>{row.name.last}</th>: <th> - </th>}
                    {row.email ?
                    <th>{row.email}</th>: <th> - </th>}
                    {row.linkedIn ? <th>{row.linkedIn}</th>:<th> - </th>}
                </tr>)
            })}
            </tbody>
        </table>
    )


}

export default Table