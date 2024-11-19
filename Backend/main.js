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
const { transaction_schema, activity_schema, user_schema } = require('./database_model');


//Import Body Parser
const body_parser = require("body-parser");
app.use(body_parser.json());

//Import Cross Origin Resource Sharing.
const cors = require("cors");
const cors_options = {
    origin: "*",
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(cors_options));

//create host
app.get("/", (req, res) => {
    res.send("This is our main end point");
});

//open express server
app.listen(4545, () => {
    console.log("Connected");
});


const user_model = mongoose.model('user', user_schema);

app.post("/create_new_data", async (req, res) => {
    const sample_data = {
      "email": "Group5@torontomu.ca",
      "role": "primary_user",
      "points_balance": 100,
      "transaction_history": {
          "abc123": {
              "transaction_type": "purchase",
              "transaction_date": "2024-05-05",
              "transaction_cost": 500,
              "productName": "AlphaBiz CRM Software",
              "points_change": 50,
              "description": "Purchased product XYZ"
          },
          "123abc": {
              "transaction_type": "redeem",
              "transaction_date": "2024-05-05",
              "transaction_cost": 500,
              "productName": "AlphaBiz CRM Software",
              "points_change": -50,
              "description": "Purchased product XYZ"
          },
          "refund_abc123": {
              "transaction_type": "refund",
              "transaction_date": "2024-05-05",
              "transaction_cost": -500,
              "productName": "AlphaBiz CRM Software",
              "points_change": 50,
              "description": "Refunded product XYZ"
          }
      },
      "activity_log": [
          {
              "activity_type": "update",
              "activity_field": "name",
              "activity_date": "2024-05-05"
          },
          {
              "activity_type": "update",
              "activity_field": "address",
              "activity_date": "2024-05-05"
          }
      ]
  };

  try {
    // Save the sample data to MongoDB using the User model
    const saved_user = await (new user_model(sample_data)).save();
    // Respond with the created user
    res.status(201).json({
      message: "Sample data created successfully",
      user: saved_user,
    });
  } catch (err) {
    console.error("Error creating sample data:", err);
    res.status(500).json({ error: "Failed to create sample data" });
  }
});