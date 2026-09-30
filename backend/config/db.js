const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoURI = process.env.MONGOURL;
  if (!mongoURI) {
    console.error("❌ MONGOURL is not defined in environment variables");
    return;
  }

  try {
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
