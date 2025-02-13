import Currency from "../../models/Currency";
import OperationType from "../../models/OperationType";
import Profit from "../../models/Profit";

export const chargeCommission = async (
  amount: number,
  operationName: string,
  currency: Currency
) => {
  let operationType = await OperationType.findOne({
    where: { name: operationName },
  });
  let profit = await Profit.findOne({
    where: {
      currencyId: currency.dataValues.id,
      operationTypeId: operationType?.dataValues.id,
    },
  });
  return await profit?.update({ amount: profit.dataValues.amount + amount });
};
