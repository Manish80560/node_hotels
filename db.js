// const mongoose = require("mongoose")

// // const mongoURL = "mongodb://localhost:27017/hotels";

// async function db() {
//     await mongoose.connect("mongodb://localhost:27017/hotels");  // if database db_name is not present then it will be created automatically
//     console.log("Successfully connected to the database");
//     }


// const db = mongoose.connection;

// db.on('connected', () =>{
// console.log("Successfully Connected To Database")
// });

// db.on('error',(err) => {
// console.error("Some error occured : ",err)
// });

// db.on('disconnected' , () => {
//     console.log("Successfully disconnected to database")
// });

// module.exports = db;


/* 
    DbOperation     HTTP Method
C -    Create -     Post
R -    Read -       Get 
U -    Update -     Put / Patch 
D -    Delete -     delete
*/



const mongoose = require("mongoose");

const mongoURL = "mongodb://127.0.0.1:27017/hotels";

async function connectDB() {
    try {
        await mongoose.connect(mongoURL);
        console.log("Successfully connected to the database");
    } catch (err) {
        console.error("Connection error:", err);
    }
}

connectDB(); // ✅ important

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connecting to Database server");
});

db.on('error', (err) => {
    console.error("Some error occurred:", err);
});

db.on('disconnected', () => {
    console.log("Mongoose disconnected");
});

module.exports = db;