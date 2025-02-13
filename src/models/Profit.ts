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
Profit.belongsTo(Currency, {
  foreignKey: "currencyName",
  targetKey: "name",
});
Profit.belongsTo(OperationType, {
  foreignKey: "operationTypeName",
  targetKey: "name",
});

export default Profit;
