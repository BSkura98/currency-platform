import Profit from "../../models/Profit";
import { getProfit } from "../getProfit/service";

export const chargeCommission = async (
  amount: number,
  operationTypeName: string,
  currencyName: string
) => {
  let profit = await getProfit({ currencyName, operationTypeName });
  return await profit?.update({ amount: profit.dataValues.amount + amount });
};
