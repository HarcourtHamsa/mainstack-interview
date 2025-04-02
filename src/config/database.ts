import mongoose from "mongoose";

const databaseUrl = process.env.MONGO_URI as string;

export const connectDB = async () => {
  await mongoose.connect(databaseUrl, { dbName: "mainstack-interview" });
};

export const db = mongoose.connection;

db.on("connected", () => console.log("Connected to Database"));

db.on("disconnected", () => console.log("Disconnected from Database"));

db.on("close", () => console.log("Database connection closed"));

db.on("error", (error) => console.log("Database connection error:", error));
