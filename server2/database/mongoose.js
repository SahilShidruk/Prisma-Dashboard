const mongoose = require('mongoose');

const connect = async () => {
    mongoose.connect(process.env.mongo);


    mongoose.connection.once("open", () => {
        console.log('Database Connected')
    });
    mongoose.connection.on("error", (error) => {
        console.log(`An error occurred : ${error}`, "error")
    })


    return;
}

module.exports = { connect };