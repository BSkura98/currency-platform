import { BadRequestError } from "../../../errors/BadRequestError";
import { calculateAmountInCurrency } from "../../../utils/calculateAmountInCurrency";
import { performTransaction } from "../../../database/performTransaction";
import { chargeCommission } from "../../Profit/chargeCommission/service";
import { getAccount } from "../getAccount/service";
import { getCurrency } from "../../Currency/getCurrency/service";
import { updateAccountBalance } from "../updateAccountBalance/service";

const operation = "currency change";

export const changeCurrency = async (
  sourceCurrencyAmount: number,
  userId: number,
  sourceCurrencyName: string,
  targetCurrencyName: string
) => {
  if (sourceCurrencyAmount < 0 || isNaN(sourceCurrencyAmount)) {
    throw new BadRequestError("Amount must be a positive number");
  }

  const sourceCurrency = await getCurrency({ name: sourceCurrencyName });
  const targetCurrency = await getCurrency({ name: targetCurrencyName });

  const sourceAccount = await getAccount({
    userId,
    currencyName: sourceCurrencyName,
  });
  if (sourceAccount.dataValues.balance < sourceCurrencyAmount) {
    throw new BadRequestError("Amount is larger than the account balance");
  }

  const targetAccount = await getAccount({
    userId,
    currencyName: targetCurrencyName,
  });

  return performTransaction(async () => {
    const amountAfterCommission = await chargeCommission(
      sourceCurrencyAmount,
      operation,
      sourceCurrencyName
    );
    await updateAccountBalance(
      targetAccount,
      calculateAmountInCurrency(
        sourceCurrency,
        targetCurrency,
        amountAfterCommission
      ),
      operation
    );
    return await updateAccountBalance(
      sourceAccount,
      -sourceCurrencyAmount,
      operation
    );
  });
};
