import { Model, DataTypes } from "sequelize";

import sequelize from "../database/database";
import Currency from "./Currency";
import OperationRecord from "./OperationRecord";

class Account extends Model {}

Account.init(
  {
    balance: { type: DataTypes.FLOAT },
  },
  {
    sequelize,
    modelName: "account",
  }
);
Account.belongsTo(Currency, {
  foreignKey: "currencyName",
  targetKey: "name",
});
Account.hasMany(OperationRecord);
OperationRecord.belongsTo(Account);

export default Account;
