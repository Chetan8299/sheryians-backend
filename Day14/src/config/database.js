const mongoose = require("mongoose");

async function connectDb() {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to MongoDB")
}

module.exports = connectDb;