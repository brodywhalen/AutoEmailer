import express from "express";
import { Flow } from "../models/Flows";
import { FlowSchema } from "../types";

export const flowRouter = express.Router();

flowRouter.post('/saveFlow',( request, _response) => {
    const body = request.body as FlowSchema[]
    console.log("body: ", body)
    console.log(body[0].id)
    const newFlow = new Flow( 
        {nodes: body}
        
        // {

        //     id: body.id,
        //     type: body.type,
        //     position: {x: body.position.x, y: body.position.y},
        //     measured: {height:body.measured.height, width:body.measured.width},
        //     data: {
        //         label: body.data.label,
        //         lists: body.data.lists, // this might be hella bad lol.
        //         selected_id: body.data.selected_id,
        //         time: body.data.time,
        //         timezone: body.data.timezone,
        //     }
        // }
    )
    
    newFlow.save().then(savedFlow => {
        console.log('does it go wrong here')
        _response.json(savedFlow);
        console.log('Flow Saved!')
    })
    .catch(error => {

        return _response.status(400).json({error: error.message})
    })
})