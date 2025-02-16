import { BadRequestError } from "../../errors/BadRequestError";
import { performTransaction } from "../../database/performTransaction";
import { chargeCommission } from "../chargeCommission/service";
import { getAccount } from "../getAccount/service";
import { updateAccountBalance } from "../updateAccountBalance/service";

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

  return performTransaction(async () => {
    const amountAfterCommission = await chargeCommission(
      amount,
      "transfer",
      currencyName
    );
    await updateAccountBalance(
      targetAccount,
      amountAfterCommission,
      "transfer"
    );
    return updateAccountBalance(sourceAccount, -amount, "transfer");
  });
};
