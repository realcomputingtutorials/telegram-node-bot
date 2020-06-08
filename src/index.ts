import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import BotController from './bot/controller';

const app = express();

app.listen(5000);

app.get("/", (req, res)=> {
    res.send("hello world")
})

BotController.init();