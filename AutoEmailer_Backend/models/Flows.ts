import mongoose from "mongoose";
// import {List} from './Lists'
import { Schema } from "mongoose";

// no edges saved yet!
const flowSchema = new mongoose.Schema({
    
    flowname: String,
    description: String,
    nodes: [Schema.Types.Mixed],    
    edges: [Schema.Types.Mixed]           
        // {
        
        // id: String,
        // type: String, 
        // ponpm run desition: {x: Number, y: Number}, 
        // measured:
        // {
        //     height: Number,
        //     width: Number,
        // },
        // data: {
        //     label: String,
        //     lists: Schema.Types.Mixed ,
        //     selected_id: String,
        //     time: String,
        //     timezone: String
        // },
        // selected: Boolean,
        // dragging:Boolean

    
});

flowSchema.set('toJSON',{
    transform: (_document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

export const Flow = mongoose.model('Flow', flowSchema);