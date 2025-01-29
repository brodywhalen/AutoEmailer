import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { requestLogger } from './middleware/logger'
import { listRouter } from './controllers/list'

dotenv.config();
const app = express();
const url = process.env.MONGODB_URI!;
const PORT = process.env.PORT;


mongoose.connect(url).then(_result => {
    console.log('connected to MongoDB');
}).catch(error => {
    console.log('error connecting to MongoDB: ', error.message);
});

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/list',listRouter)



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});