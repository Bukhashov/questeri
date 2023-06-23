require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Router = require('./src/routes/index');
const app = express()

// Сервер қабылдайтын запростар методтарын описовать етеді [get, post, delete, update]
app.use(cors());
app.use(express.json())
// Сервер қабылдайтын роутерлер тізімін қабылдайды
app.use('/', Router)

// Серверді қосады
const start = async () => {
    try{
        mongoose.set("strictQuery", false);
        // db мен қосады
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2dgujel.mongodb.net/${process.env.DB_NAME}`).then(() => console.log("DATABASE CONNECTED |> MONGODB") )
        // Сервердін порты
        app.listen(process.env.APP_PORT, ()=> {
            console.log(`SERVER STARTED localhost host: ${process.env.APP_PORT}`)   
        })
    }
    catch(e){
        console.log(e);
    }
}

start()