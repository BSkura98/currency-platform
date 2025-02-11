import { Model, DataTypes } from "sequelize";

import sequelize from "../database/database";
import Account from "./Account";
import OperationType from "./OperationType";

class Operation extends Model {}

Operation.init(
  {
    amount: { type: DataTypes.FLOAT },
    balance: { type: DataTypes.FLOAT },
    date: { type: DataTypes.DATE },
  },
  {
    sequelize,
    modelName: "operation",
  }
);
Operation.belongsTo(OperationType);

export default Operation;
