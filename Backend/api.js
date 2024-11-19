const mongoose = require('mongoose');
const fs = require('fs');
var path = process.cwd();
const express = require('express');
const router = express.Router();
const { transactionSchema, activitySchema, userSchema } = require('./database_model');
var buffer = fs.readFileSync(path + "/database_api.txt"); 
const mongo_db_api = buffer.toString();

const app = express();
app.use(express.json());

mongoose.connect(
  mongo_db_api,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to Ahmad's database successfully!");
});

// Create the User model from the userSchema
const User = mongoose.model('User', userSchema);

app.post("/create_new_data", async (req, res) => {
  try {
    const sampleData = {
      email: "Group5@torontomu.ca",
      role: "primary_user",
      points_balance: 100,
      transaction_history: {
        abc123: {
          transaction_type: "purchase",
          transaction_date: new Date("2024-05-05"),
          transaction_cost: 500,
          productName: "AlphaBiz CRM Software",
          points_change: 50,
          description: "Purchased product XYZ",
        },
        "123abc": {
          transaction_type: "redeem",
          transaction_date: new Date("2024-05-05"),
          transaction_cost: 500,
          productName: "AlphaBiz CRM Software",
          points_change: -50,
          description: "Redeemed product XYZ",
        },
        refund_abc123: {
          transaction_type: "refund",
          transaction_date: new Date("2024-05-05"),
          transaction_cost: -500,
          productName: "AlphaBiz CRM Software",
          points_change: 50,
          description: "Refunded product XYZ",
        },
      },
      activity_log: [
        {
          activity_type: "update",
          activity_field: "name",
          activity_date: new Date("2024-05-05"),
        },
        {
          activity_type: "update",
          activity_field: "address",
          activity_date: new Date("2024-05-05"),
        },
      ],
    };

    // Save the sample data to MongoDB using the User model
    const user = new User(sampleData);
    const savedUser = await user.save();

    // Respond with the created user
    res.status(201).json({
      message: "Sample data created successfully",
      user: savedUser,
    });
  } catch (err) {
    console.error("Error creating sample data:", err);
    res.status(500).json({ error: "Failed to create sample data" });
  }
});

const PORT = 4545;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
