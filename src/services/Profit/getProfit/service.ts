import { NotFoundError } from "../../../errors/NotFoundError";
import Profit from "../../../models/Profit";
import { createWhereFilter } from "../../../utils/createWhereFilter";

interface Parameters {
  currencyName?: string;
  operationTypeName?: string;
}

export const getProfit = async ({
  currencyName,
  operationTypeName,
}: Parameters) => {
  let profit = await Profit.findOne({
    where: createWhereFilter({ currencyName, operationTypeName }),
  });
  if (!profit) {
    throw new NotFoundError(`There are no profit information for given data`);
  }
  return profit;
};
