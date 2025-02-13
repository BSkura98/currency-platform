import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import Account from "../../models/Account";
import Currency from "../../models/Currency";
import { calculateAmountInCurrency } from "../../utils/calculateAmountInCurrency";
import { performTransaction } from "../../utils/performTransaction";
import { createOperationRecord } from "../createOperationRecord/service";

export const changeCurrency = async (
  sourceAmount: number,
  userId: number,
  sourceCurrencyName: string,
  targetCurrencyName: string
) => {
  if (sourceAmount < 0) {
    throw new BadRequestError("Amount cannot be a negative number");
  }

  const sourceCurrency = await Currency.findOne({
    where: { name: sourceCurrencyName },
  });
  if (!sourceCurrency) {
    throw new NotFoundError(`Currency ${sourceCurrencyName} does not exist`);
  }

  const targetCurrency = await Currency.findOne({
    where: { name: targetCurrencyName },
  });
  if (!targetCurrency) {
    throw new NotFoundError(`Currency ${targetCurrencyName} does not exist`);
  }

  const sourceAccount = await Account.findOne({
    where: { userId, currencyName: sourceCurrency.dataValues.name },
  });
  if (!sourceAccount) {
    throw new NotFoundError(
      "Account for given user and currency has not been found"
    );
  }
  if (sourceAccount.dataValues.balance < sourceAmount) {
    throw new BadRequestError("Amount is larger than the account balance");
  }

  const targetAccount = await Account.findOne({
    where: { userId, currencyName: targetCurrency.dataValues.name },
  });
  if (!targetAccount) {
    throw new NotFoundError(
      "Account for given user and currency has not been found"
    );
  }

  let updatedSourceAccount = await performTransaction(
    sourceAmount,
    "Currency change",
    sourceCurrency,
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
        "Currency change"
      );
      await createOperationRecord(
        amountAfterCommission,
        targetAccount,
        "Currency change"
      );
      return sourceAccountUpdated;
    }
  );

  return updatedSourceAccount;
};
