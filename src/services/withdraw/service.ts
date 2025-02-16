import { BadRequestError } from "../../errors/BadRequestError";
import { performTransaction } from "../../database/performTransaction";
import { chargeCommission } from "../chargeCommission/service";
import { getAccount } from "../getAccount/service";
import { updateAccountBalance } from "../updateAccountBalance/service";

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

  return await performTransaction(async () => {
    await chargeCommission(amount, "withdrawal", currencyName);
    return updateAccountBalance(account, -amount, "withdrawal");
  });
};
