import "dotenv/config";
import { connectDB } from "./config/database";
import { runSeed } from "./auto/seed";
import { app } from "./app";

const PORT = process.env.PORT || 80;

async function initialize() {
  try {
    await connectDB();
    await runSeed();

    return true;
  } catch (error) {
    console.error("Failed to initialize application:", error);
    return false;
  }
}

async function startServer() {
  const initialized = await initialize();

  if (!initialized) {
    console.error("Server initialization failed, exiting");
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Start the server
startServer();
