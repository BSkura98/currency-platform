import dotenv from "dotenv";

import sequelize from "./database";
import Currency from "../models/Currency";
import Account from "../models/Account";
import Operation from "../models/Operation";
import OperationType from "../models/OperationType";
import Profit from "../models/Profit";
import User from "../models/User";

dotenv.config();

sequelize.sync().then(async () => {
  await Account.sync({ force: true });
  await Currency.sync({ force: true });
  await Operation.sync({ force: true });
  await OperationType.sync({ force: true });
  await Profit.sync({ force: true });
  await User.sync({ force: true });

  let currencies = [
    await Currency.create({ name: "PLN", exchangeRateToPLN: 1 }),
    await Currency.create({ name: "EUR", exchangeRateToPLN: 4.18 }),
    await Currency.create({ name: "USD", exchangeRateToPLN: 4.05 }),
  ];

  OperationType.create({ name: "Deposit", commission: 0.05 });
  OperationType.create({ name: "Withdrawal", commission: 0.002 });
  OperationType.create({ name: "Transfer", commission: 0.03 });
  OperationType.create({ name: "Currency change", commission: 0.1 });
  let users = [];
  for (let i = 0; i < 5; i++) {
    users.push(await User.create());
  }
  users.forEach((user) =>
    currencies.forEach((currency) =>
      Account.create({
        balance: 0,
        currencyId: currency.dataValues.id,
        userId: user.dataValues.id,
      })
    )
  );
});
