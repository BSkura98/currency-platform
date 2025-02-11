import { Model, DataTypes } from "sequelize";

import sequelize from "../database/database";

class Currency extends Model {}

Currency.init(
  {
    name: { type: DataTypes.STRING, unique: true },
    exchangeRateToPLN: { type: DataTypes.FLOAT },
  },
  {
    sequelize,
    modelName: "currency",
  }
);
export default Currency;
