import dotenv from "dotenv";

import sequelize from "./database/database";
import { setExchangeRateToPLN } from "./services/setExchangeRateToPLN/service";
import { setOperationTypeCommission } from "./services/setOperationTypeCommission/service";
import { deposit } from "./services/deposit/service";

dotenv.config();

sequelize.sync().then(async () => {
  console.log("Database is ready");

  setExchangeRateToPLN(3, 4.06);
  setOperationTypeCommission(3, 0.04);
  deposit(1, "EUR", 5.3);
});
