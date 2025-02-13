import { Model, DataTypes } from "sequelize";

import sequelize from "../database/database";
import OperationType from "./OperationType";

class OperationRecord extends Model {}

OperationRecord.init(
  {
    amount: { type: DataTypes.FLOAT },
    balance: { type: DataTypes.FLOAT },
  },
  {
    sequelize,
    modelName: "operationRecord",
  }
);
OperationRecord.belongsTo(OperationType, {
  foreignKey: "operationTypeName",
  targetKey: "name",
});

export default OperationRecord;
