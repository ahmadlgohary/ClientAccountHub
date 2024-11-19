// Import MongoDB
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
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

const activitySchema = new mongoose.Schema({
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

const userSchema = new mongoose.Schema({
  // User's email
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
    of: transactionSchema,
    default: {},
  },
  // Array of user activities
  activity_log: {
    type: [activitySchema],
    default: [],
  },
});

// Register the model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = { User, transactionSchema, activitySchema, userSchema };