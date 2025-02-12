import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import Account from "../../models/Account";
import Currency from "../../models/Currency";

export const deposit = async (
  userId: number,
  currencyName: string,
  amount: number
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

  const account = await Account.findOne({
    where: { userId, currencyId: currency.dataValues.id },
  });
  if (!account) {
    throw new NotFoundError("Account for given user has not been found");
  }

  return account?.update({ balance: account.dataValues.balance + amount });
};
