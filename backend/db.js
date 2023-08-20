const mongoose = require("mongoose");

const mongoURI = "";

const connectToMongo = () => {
  mongoose.connect(mongoURI);
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB successfully...");
  });
  mongoose.connection.on("error", (e) => {
    console.log("MongoDB connection error: " + e);
  });
};

module.exports = connectToMongo;
