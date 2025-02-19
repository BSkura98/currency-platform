import { Model, DataTypes } from "sequelize";

import sequelize from "../database/database";

class OperationType extends Model {}

OperationType.init(
  {
    name: { type: DataTypes.STRING, unique: true },
    commissionRate: { type: DataTypes.FLOAT },
  },
  {
    sequelize,
    modelName: "operationType",
  }
);
export default OperationType;
