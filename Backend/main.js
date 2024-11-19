const fs = require('fs');
var path = process.cwd();
var buffer = fs.readFileSync(path + "/database_api.txt"); 
const mongo_db_api = buffer.toString()


// Import Express.JS
const express = require("express");
const app = express();

// Import Mongoose for MongoDB
const mongoose = require("mongoose");
mongoose.connect(mongo_db_api);

//Import database_model.js
require("./database_model");

//Import the model from itemModel.js
const database_model = mongoose.model("database_collection");

//Import Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//Import Cross Origin Resource Sharing.
const cors = require("cors");
const corsOptions = {
    origin: "*",
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

//create host
app.get("/", (req, res) => {
    res.send("This is our main end point");
});

//open express server
app.listen(4545, () => {
    console.log("Connected");
});
