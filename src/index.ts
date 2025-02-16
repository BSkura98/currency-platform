import dotenv from "dotenv";

import sequelize from "./database/database";
import { readInitialData } from "./userInput/readInitialData";
import { readCommands } from "./userInput/readCommands";

dotenv.config();

sequelize.sync().then(async () => {
  console.log("Database is ready");

  try {
    await readInitialData();
    await readCommands();
  } catch (error: any) {
    console.log(error.message);
  }
});
