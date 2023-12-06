const { config } = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables
config();

exports.connectWithDb = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("DB connection successful");

  } catch (error) {
    console.error("DB connection has some issue:", error);
  }
};
