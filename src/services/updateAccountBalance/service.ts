import Account from "../../models/Account";
import { createOperationRecord } from "../createOperationRecord/service";

export const updateAccountBalance = async (
  account: Account,
  amount: number,
  operationTypeName?: string
) => {
  let updatedAccount = await account.update({
    balance: account.dataValues.balance + amount,
  });
  if (operationTypeName) {
    await createOperationRecord(amount, account, operationTypeName);
  }
  return updatedAccount;
};
