import { Model } from "sequelize";

import sequelize from "../database/database";
import Account from "./Account";

class User extends Model {}

User.init(
  {},
  {
    sequelize,
    modelName: "user",
  }
);
User.hasMany(Account);
Account.belongsTo(User);

export default User;
