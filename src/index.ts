import dotenv from "dotenv";

import sequelize from "./database/database";

dotenv.config();

sequelize.sync().then(async () => {
  console.log("Database is ready");
});
