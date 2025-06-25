import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vishal4panwar:aq1w450xegkyyn5H@cluster0.pq1rvq5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Database connection error:", err.message);
  }
};

export default connectDB;
