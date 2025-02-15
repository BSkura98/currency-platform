import { BadRequestError } from "../../errors/BadRequestError";
import { performTransaction } from "../../utils/performTransaction";
import { createOperationRecord } from "../createOperationRecord/service";
import { getAccount } from "../getAccount/service";

export const withdraw = async (
  amount: number,
  userId: number,
  currencyName: string
) => {
  if (amount < 0 || isNaN(amount)) {
    throw new BadRequestError("Amount must be a positive number");
  }

  const account = await getAccount({ userId, currencyName });

  if (account.dataValues.balance < amount) {
    throw new BadRequestError(
      "Amount to withdraw is larger than the account balance"
    );
  }

  let updatedAccount = await performTransaction(
    amount,
    "withdrawal",
    currencyName,
    async () => {
      let updatedAccount = await account?.update({
        balance: account.dataValues.balance - amount,
      });
      await createOperationRecord(-amount, account, "withdrawal");
      return updatedAccount;
    }
  );
  return updatedAccount;
};
