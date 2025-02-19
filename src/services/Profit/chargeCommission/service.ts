import { calculateCommission } from "../../OperationType/calculateCommission/service";
import { getProfit } from "../getProfit/service";

export const chargeCommission = async (
  amount: number,
  operationTypeName: string,
  currencyName: string
) => {
  let commission = await calculateCommission(amount, operationTypeName);
  let profit = await getProfit({ currencyName, operationTypeName });
  await profit?.update({ amount: profit.dataValues.amount + commission });
  return amount - commission;
};
