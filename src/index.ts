import dotenv from "dotenv";

import sequelize from "./database/database";
import { readInitialData } from "./userInput/readInitialData";
import { readCommands } from "./userInput/readCommands";
import Account from "./models/Account";

dotenv.config();

sequelize.sync().then(async () => {
  console.log("Database is ready");

  await readInitialData();
  await readCommands();
});
