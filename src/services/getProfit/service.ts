import Profit from "../../models/Profit";

export const getProfit = (currencyName: string, operationTypeName: string) => {
  return Profit.findAll({
    raw: true,
    where: { currencyName, operationTypeName },
  });
};
