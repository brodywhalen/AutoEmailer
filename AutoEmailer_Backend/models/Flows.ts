import mongoose from "mongoose";
// import {List} from './Lists'
import { Schema } from "mongoose";

// no edges saved yet!
const flowSchema = new mongoose.Schema({
    
    flowname: {type: String, required: true, unique: true},
    description: {type: String, required: false, unique: false},
    nodes: [Schema.Types.Mixed],    
    edges: [Schema.Types.Mixed]              
});

flowSchema.set('toJSON',{
    transform: (_document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

export const Flow = mongoose.model('Flow', flowSchema);