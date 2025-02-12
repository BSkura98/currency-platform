import sequelize from "../../database/database";
import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import Account from "../../models/Account";
import Currency from "../../models/Currency";

export const transfer = async (
  sourceUserId: number,
  targetUserId: number,
  amount: number,
  currencyName: string
) => {
  if (amount < 0) {
    throw new BadRequestError("Amount cannot be a negative number");
  }

  const currency = await Currency.findOne({
    where: { name: currencyName },
  });
  if (!currency) {
    throw new NotFoundError("Currency with such name does not exist");
  }

  const sourceAccount = await Account.findOne({
    where: { userId: sourceUserId, currencyId: currency.dataValues.id },
  });
  if (!sourceAccount) {
    throw new NotFoundError(
      "Account for given source user id has not been found"
    );
  }
  if (sourceAccount.dataValues.balance < amount) {
    throw new BadRequestError(
      "Amount to transfer is larger than the source account balance"
    );
  }

  const targetAccount = await Account.findOne({
    where: { userId: targetUserId, currencyId: currency.dataValues.id },
  });
  if (!targetAccount) {
    throw new NotFoundError(
      "Account for given target user id has not been found"
    );
  }

  const transaction = await sequelize.transaction();
  let sourceAccountUpdated;
  try {
    sourceAccountUpdated = await sourceAccount?.update({
      balance: sourceAccount.dataValues.balance - amount,
    });
    await targetAccount?.update({
      balance: targetAccount.dataValues.balance + amount,
    });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

  return sourceAccountUpdated;
};
