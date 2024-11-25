const mongoose = require('mongoose');
// const logger = require('../logger/api.logger');
require('dotenv').config();

const connectDB = () => {

    // const url = "mongodb+srv://patelharsh397:0AKPfrwRqCbWqTVg@rentspot.m8zyrhs.mongodb.net/?retryWrites=true&w=majority"
    // const url = "mongodb://localhost:27017/test"
    const url= process.env.MONGODB_URL;
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    mongoose.connection.once("open", async () => {
        console.log("Connected to database");
    });

    mongoose.connection.on("error", (err) => {
        console.log("Error connecting to database  ", err);
    });
}

module.exports = {
    connectDB
}