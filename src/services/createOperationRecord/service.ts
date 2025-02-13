import Account from "../../models/Account";
import OperationRecord from "../../models/OperationRecord";

export const createOperationRecord = async (
  amount: number,
  account: Account,
  operationTypeName: string
) => {
  return OperationRecord.create({
    amount,
    balance: account.dataValues.balance,
    operationTypeName,
    accountId: account.dataValues.id,
  });
};
