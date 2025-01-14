// This file is to handle all routing to alter list documents

import express from 'express';
//import { List } from '../models/Lists';

export const listRouter = express.Router();

listRouter.post('/createList',( request, _response) => {
    console.log('my request body: ', request.body);
})