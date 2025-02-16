import Account from "../../../models/Account";
import { createOperationRecord } from "../../OperationRecord/createOperationRecord/service";

export const updateAccountBalance = async (
  account: Account,
  balanceChange: number,
  operationTypeName?: string
) => {
  let updatedAccount = await account.update({
    balance: account.dataValues.balance + balanceChange,
  });
  if (operationTypeName) {
    await createOperationRecord(balanceChange, account, operationTypeName);
  }
  return updatedAccount;
};
