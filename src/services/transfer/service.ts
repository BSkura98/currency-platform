import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import Account from "../../models/Account";
import Currency from "../../models/Currency";
import { performTransaction } from "../../utils/performTransaction";
import { createOperationRecord } from "../createOperationRecord/service";
import { getAccount } from "../getAccount/service";
import { getCurrency } from "../getCurrency/service";

export const transfer = async (
  amount: number,
  sourceUserId: number,
  targetUserId: number,
  currencyName: string
) => {
  if (amount < 0 || isNaN(amount)) {
    throw new BadRequestError("Amount must be a positive number");
  }

  const sourceAccount = await getAccount({
    userId: sourceUserId,
    currencyName,
  });
  if (sourceAccount.dataValues.balance < amount) {
    throw new BadRequestError(
      "Amount to transfer is larger than the source account balance"
    );
  }

  const targetAccount = await getAccount({
    userId: targetUserId,
    currencyName,
  });

  let updatedSourceAccount = await performTransaction(
    amount,
    "transfer",
    currencyName,
    async (amountAfterCommission) => {
      let sourceAccountUpdated = await sourceAccount?.update({
        balance: sourceAccount.dataValues.balance - amount,
      });
      await targetAccount?.update({
        balance: targetAccount.dataValues.balance + amountAfterCommission,
      });
      await createOperationRecord(-amount, sourceAccount, "transfer");
      await createOperationRecord(
        amountAfterCommission,
        targetAccount,
        "transfer"
      );
      return sourceAccountUpdated;
    }
  );

  return updatedSourceAccount;
};
