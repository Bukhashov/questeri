require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Router = require('./src/routes/index');
const app = express()

app.use(cors());
app.use(express.json())
app.use('/', Router)

const start = async () => {
    try{
        mongoose.set("strictQuery", false);
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2dgujel.mongodb.net/${process.env.DB_NAME}`).then(() => console.log("DATABASE CONNECTED |> MONGODB") )
        app.listen(process.env.APP_PORT, ()=> {
            console.log(`SERVER STARTED localhost host: ${process.env.APP_PORT}`)   
        })
    }
    catch(e){
        console.log(e)
    }
}

start()