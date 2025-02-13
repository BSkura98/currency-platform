import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import Account from "../../models/Account";
import Currency from "../../models/Currency";
import { performTransaction } from "../../utils/performTransaction";

export const withdraw = async (
  amount: number,
  userId: number,
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

  const account = await Account.findOne({
    where: { userId, currencyId: currency.dataValues.id },
  });
  if (!account) {
    throw new NotFoundError("Account for given user has not been found");
  }

  if (account.dataValues.balance < amount) {
    throw new BadRequestError(
      "Amount to withdraw is larger than the account balance"
    );
  }

  let updatedAccount = await performTransaction(
    amount,
    "Withdrawal",
    currency,
    () =>
      account?.update({
        balance: account.dataValues.balance - amount,
      })
  );
  return updatedAccount;
};
