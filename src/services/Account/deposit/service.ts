import { BadRequestError } from "../../../errors/BadRequestError";
import { performTransaction } from "../../../database/performTransaction";
import { chargeCommission } from "../../Profit/chargeCommission/service";
import { getAccount } from "../getAccount/service";
import { updateAccountBalance } from "../updateAccountBalance/service";

const operation = "deposit";

export const deposit = async (
  amount: number,
  userId: number,
  currencyName: string
) => {
  if (amount < 0 || isNaN(amount)) {
    throw new BadRequestError("Amount must be a positive number");
  }

  const account = await getAccount({ userId, currencyName });

  return await performTransaction(async () => {
    const amountAfterCommission = await chargeCommission(
      amount,
      operation,
      currencyName
    );
    return updateAccountBalance(account, amountAfterCommission, operation);
  });
};
