import { Model, DataTypes } from "sequelize";

import sequelize from "../database/database";
import Currency from "./Currency";
import OperationType from "./OperationType";

class Profit extends Model {}

Profit.init(
  {
    amount: { type: DataTypes.FLOAT },
  },
  {
    sequelize,
    modelName: "profit",
  }
);
Profit.belongsTo(Currency);
Profit.belongsTo(OperationType);

export default Profit;
