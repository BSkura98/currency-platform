import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import Account from "../../models/Account";
import Currency from "../../models/Currency";
import { performTransaction } from "../../utils/performTransaction";
import { createOperationRecord } from "../createOperationRecord/service";

export const deposit = async (
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

  let updatedAccount = await performTransaction(
    amount,
    "Deposit",
    currency,
    async (amountAfterCommission: number) => {
      let updatedAccount = account?.update({
        balance: account.dataValues.balance + amountAfterCommission,
      });
      await createOperationRecord(amount, account, "Deposit");
      return updatedAccount;
    }
  );
  return updatedAccount;
};
