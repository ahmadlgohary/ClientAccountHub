// Import MongoDB
const mongoose = require("mongoose");

const transaction_schema = new mongoose.Schema({
  // e.g., "purchase", "redeem", "refund"
  transaction_type: {
    type: String,
    required: true,
  },
  transaction_date: {
    type: Date,
    required: true,
  },
  // Amount spent or refunded
  transaction_cost: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  // Points gained or lost
  points_change: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const activity_schema = new mongoose.Schema({
  // e.g., "update"
  activity_type: {
    type: String,
    required: true,
  },
  // e.g., "name", "address"
  activity_field: {
    type: String,
    required: true,
  },
  activity_date: {
    type: Date,
    required: true,
  },
});

const user_schema = new mongoose.Schema({
  // user's email
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Role, e.g., "primary_user"
  role: {
    type: String,
    required: true,
  },
  // Current points balance
  points_balance: {
    type: Number,
    required: true,
  },
  // Map of transaction records by unique ID
  transaction_history: {
    type: Map,
    of: transaction_schema,
    default: {},
  },
  // Array of user activities
  activity_log: {
    type: [activity_schema],
    default: [],
  },
});

// Register the model
const user = mongoose.model('user', user_schema);

// Export the model
module.exports = { user, transaction_schema, activity_schema, user_schema };