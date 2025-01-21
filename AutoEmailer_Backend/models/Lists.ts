import mongoose from "mongoose";
const listSchema = new mongoose.Schema({
    listName: {type: String, required: true, unique: true},
    contacts: [{
        name: {first: String, last: String},
        email: {type: String, required: true, unique: true},
        linkedIn: String,
        addedParams: [{param: String, value: String}],
        userID: String
        }]
    // Add user param after user authentication
});

listSchema.set('toJSON',{
    transform: (_document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

export const List = mongoose.model('List', listSchema);