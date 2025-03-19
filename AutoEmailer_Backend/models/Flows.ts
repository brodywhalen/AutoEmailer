import mongoose from "mongoose";
import {List} from './Lists'

// no edges saved yet!
const flowSchema = new mongoose.Schema({
    nodes: [{
        
        id: String,
        type: String, 
        position: {x: Number, y: Number}, 
        measured:
        {
            height: Number,
            width: Number,
        },
        data: {
            label: String,
            lists: [List],
            selected_id: String,
            time: String,
            timezone: String
        }
    }]
});

flowSchema.set('toJSON',{
    transform: (_document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

export const Flow = mongoose.model('Flow', flowSchema);