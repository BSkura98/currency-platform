import { BadRequestError } from "../../errors/BadRequestError";
import { performTransaction } from "../../utils/performTransaction";
import { createOperationRecord } from "../createOperationRecord/service";
import { getAccount } from "../getAccount/service";

export const deposit = async (
  amount: number,
  userId: number,
  currencyName: string
) => {
  if (amount < 0 || isNaN(amount)) {
    throw new BadRequestError("Amount must be a positive number");
  }

  const account = await getAccount({ userId, currencyName });

  return await performTransaction(
    amount,
    "deposit",
    currencyName,
    async (amountAfterCommission: number) => {
      let updatedAccount = account?.update({
        balance: account.dataValues.balance + amountAfterCommission,
      });
      await createOperationRecord(amount, account, "deposit");
      return updatedAccount;
    }
  );
};
