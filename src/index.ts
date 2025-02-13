import dotenv from "dotenv";

import sequelize from "./database/database";
import { readInitialData } from "./userInput/readInitialData";

dotenv.config();

sequelize.sync().then(async () => {
  console.log("Database is ready");

  await readInitialData();
});
