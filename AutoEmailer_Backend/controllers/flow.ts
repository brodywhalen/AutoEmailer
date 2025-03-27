import express from "express";
import { Flow } from "../models/Flows";
// import { FlowSchema } from "../types";

export const flowRouter = express.Router();

flowRouter.post('/saveFlow',( request, _response) => {
    const body = request.body
    console.log(body)
    const newFlow = new Flow({
        flowname: body.flowname,
        description: body.description,
        nodes: body.nodes,
        edges: body.edges,
});
    // console.log('empytytyty: ', newFlow.nodes)
    console.log('newFlow: ', newFlow)
    
    newFlow.save().then(savedFlow => {
        console.log('does it go wrong here')
        _response.json(savedFlow);
        console.log('Flow Saved!')
    })
    .catch(error => {

        return _response.status(400).json({error: error.message})
    })
})
flowRouter.get('/getFlows', async (_request, response) => {
        try{
             const myFlows = await Flow.find({})
             response.status(200).send(myFlows)
        }
        catch {
            console.log('error getting Flows')
        }
})