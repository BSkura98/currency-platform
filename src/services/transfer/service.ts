import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import Account from "../../models/Account";
import Currency from "../../models/Currency";
import { performTransaction } from "../../utils/performTransaction";
import { createOperationRecord } from "../createOperationRecord/service";

export const transfer = async (
  amount: number,
  sourceUserId: number,
  targetUserId: number,
  currencyName: string
) => {
  if (amount < 0 || isNaN(amount)) {
    throw new BadRequestError("Amount must be a positive number");
  }

  const currency = await Currency.findOne({
    where: { name: currencyName },
  });
  if (!currency) {
    throw new NotFoundError("Currency with such name does not exist");
  }

  const sourceAccount = await Account.findOne({
    where: { userId: sourceUserId, currencyName },
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
    where: { userId: targetUserId, currencyName },
  });
  if (!targetAccount) {
    throw new NotFoundError(
      "Account for given target user id has not been found"
    );
  }

  let updatedSourceAccount = await performTransaction(
    amount,
    "Transfer",
    currency,
    async (amountAfterCommission) => {
      let sourceAccountUpdated = await sourceAccount?.update({
        balance: sourceAccount.dataValues.balance - amount,
      });
      await targetAccount?.update({
        balance: targetAccount.dataValues.balance + amountAfterCommission,
      });
      await createOperationRecord(-amount, sourceAccount, "Transfer");
      await createOperationRecord(
        amountAfterCommission,
        targetAccount,
        "Transfer"
      );
      return sourceAccountUpdated;
    }
  );

  return updatedSourceAccount;
};
