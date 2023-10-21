import express from 'express';
import dotenv from 'dotenv';
import { config } from './config/config'; // Assuming this should be 'connection' function
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

const app = express();

dotenv.config();

config(); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));
app.use(cors());

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
