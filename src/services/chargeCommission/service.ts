import Currency from "../../models/Currency";
import OperationType from "../../models/OperationType";
import Profit from "../../models/Profit";

export const chargeCommission = async (
  amount: number,
  operationName: string,
  currency: Currency
) => {
  let profit = await Profit.findOne({
    where: {
      currencyName: currency.dataValues.name,
      operationTypeName: operationName,
    },
  });
  return await profit?.update({ amount: profit.dataValues.amount + amount });
};
