// This file is to handle all routing to alter list documents

import express from 'express';
import { ListSchema } from '../types';
import { List } from '../models/Lists';

export const listRouter = express.Router();

listRouter.post('/createList',( request, _response) => {
    const body = request.body as ListSchema
    console.log(body)
    const newList = new List({

        listName: body.listName,
        contacts: body.contacts,
        user: body.user
    })
    
    newList.save().then(savedList => {
        console.log('does it go wrong here')
        _response.json(savedList);
        console.log('List Saved!')
    })
    .catch(error => {
        
        return _response.status(400).json({error: error.message})
    })
    
    
})