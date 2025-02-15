import { BadRequestError } from "../../errors/BadRequestError";
import { calculateAmountInCurrency } from "../../utils/calculateAmountInCurrency";
import { performTransaction } from "../../utils/performTransaction";
import { createOperationRecord } from "../createOperationRecord/service";
import { getAccount } from "../getAccount/service";
import { getCurrency } from "../getCurrency/service";

export const changeCurrency = async (
  sourceAmount: number,
  userId: number,
  sourceCurrencyName: string,
  targetCurrencyName: string
) => {
  if (sourceAmount < 0 || isNaN(sourceAmount)) {
    throw new BadRequestError("Amount must be a positive number");
  }

  const sourceCurrency = await getCurrency({ name: sourceCurrencyName });
  const targetCurrency = await getCurrency({ name: targetCurrencyName });

  const sourceAccount = await getAccount({
    userId,
    currencyName: sourceCurrencyName,
  });
  if (sourceAccount.dataValues.balance < sourceAmount) {
    throw new BadRequestError("Amount is larger than the account balance");
  }

  const targetAccount = await getAccount({
    userId,
    currencyName: targetCurrencyName,
  });

  let updatedSourceAccount = await performTransaction(
    sourceAmount,
    "currency change",
    sourceCurrencyName,
    async (amountAfterCommission) => {
      let sourceAccountUpdated = await sourceAccount?.update({
        balance: sourceAccount.dataValues.balance - sourceAmount,
      });
      await targetAccount?.update({
        balance:
          targetAccount.dataValues.balance +
          calculateAmountInCurrency(
            sourceCurrency,
            targetCurrency,
            amountAfterCommission
          ),
      });
      await createOperationRecord(
        -sourceAmount,
        sourceAccount,
        "currency change"
      );
      await createOperationRecord(
        amountAfterCommission,
        targetAccount,
        "currency change"
      );
      return sourceAccountUpdated;
    }
  );

  return updatedSourceAccount;
};
