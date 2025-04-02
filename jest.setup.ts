import dotenv from "dotenv";

dotenv.config({
  path: ".env.test",
  override: true,
});

// import { connectDB } from "./src/config/database";
// import { runSeed } from "./src/auto/seed";

export default async () => {
  // await connectDB();
  // await runSeed();

  console.log("Test environment is ready");
};
