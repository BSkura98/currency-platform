import dotenv from "dotenv";

import sequelize from "./database";
import Currency from "../models/Currency";
import Account from "../models/Account";
import OperationRecord from "../models/OperationRecord";
import OperationType from "../models/OperationType";
import Profit from "../models/Profit";
import User from "../models/User";

dotenv.config();

sequelize.sync().then(async () => {
  await Account.sync({ force: true });
  await Currency.sync({ force: true });
  await OperationRecord.sync({ force: true });
  await OperationType.sync({ force: true });
  await Profit.sync({ force: true });
  await User.sync({ force: true });

  let currencies = await Currency.bulkCreate([
    { name: "PLN", exchangeRateToPLN: 1 },
    { name: "EUR", exchangeRateToPLN: 4.18 },
    { name: "USD", exchangeRateToPLN: 4.05 },
  ]);

  let operationTypes = await OperationType.bulkCreate([
    {
      name: "deposit",
      commissionRate: 0.05,
    },
    { name: "withdrawal", commissionRate: 0.002 },
    { name: "transfer", commissionRate: 0.03 },
    { name: "currency change", commissionRate: 0.1 },
  ]);

  currencies.forEach((currency) =>
    operationTypes.forEach(async (operationType) => {
      await Profit.create({
        currencyName: currency.dataValues.name,
        operationTypeName: operationType.dataValues.name,
        amount: 0,
      });
    })
  );

  let users = [];
  for (let i = 0; i < 5; i++) {
    users.push(await User.create());
  }
  users.forEach((user) =>
    currencies.forEach((currency) =>
      Account.create({
        balance: 0,
        currencyName: currency.dataValues.name,
        userId: user.dataValues.id,
      })
    )
  );
});
