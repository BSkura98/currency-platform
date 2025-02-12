import sequelize from "../../database/database";
import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import Account from "../../models/Account";
import Currency from "../../models/Currency";
import { calculateAmountInCurrency } from "../../utils/calculateAmountInCurrency";

export const changeCurrency = async (
  userId: number,
  sourceCurrencyName: string,
  targetCurrencyName: string,
  sourceAmount: number
) => {
  if (sourceAmount < 0) {
    throw new BadRequestError("Amount cannot be a negative number");
  }

  const sourceCurrency = await Currency.findOne({
    where: { name: sourceCurrencyName },
  });
  if (!sourceCurrency) {
    throw new NotFoundError(`Currency ${sourceCurrencyName} does not exist`);
  }

  const targetCurrency = await Currency.findOne({
    where: { name: targetCurrencyName },
  });
  if (!targetCurrency) {
    throw new NotFoundError(`Currency ${targetCurrencyName} does not exist`);
  }

  const sourceAccount = await Account.findOne({
    where: { userId, currencyId: sourceCurrency.dataValues.id },
  });
  if (!sourceAccount) {
    throw new NotFoundError(
      "Account for given user and currency has not been found"
    );
  }
  if (sourceAccount.dataValues.balance < sourceAmount) {
    throw new BadRequestError("Amount is larger than the account balance");
  }

  const targetAccount = await Account.findOne({
    where: { userId, currencyId: targetCurrency.dataValues.id },
  });
  if (!targetAccount) {
    throw new NotFoundError(
      "Account for given user and currency has not been found"
    );
  }

  const transaction = await sequelize.transaction();
  let sourceAccountUpdated;
  try {
    sourceAccountUpdated = await sourceAccount?.update({
      balance: sourceAccount.dataValues.balance - sourceAmount,
    });
    await targetAccount?.update({
      balance:
        targetAccount.dataValues.balance +
        calculateAmountInCurrency(sourceCurrency, targetCurrency, sourceAmount),
    });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

  return sourceAccountUpdated;
};
