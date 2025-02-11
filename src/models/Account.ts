import { Model, DataTypes } from "sequelize";

import sequelize from "../database/database";
import Currency from "./Currency";
import Operation from "./Operation";

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
Account.belongsTo(Currency);
Account.hasMany(Operation);
Operation.belongsTo(Account);

export default Account;
