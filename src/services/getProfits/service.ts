import Profit from "../../models/Profit";
import { createWhereFilter } from "../../utils/createWhereFilter";

interface Parameters {
  currencyName?: string;
  operationTypeName?: string;
}

export const getProfits = ({ currencyName, operationTypeName }: Parameters) => {
  const where: any = createWhereFilter({
    currencyName,
    operationTypeName,
  });
  return Profit.findAll({
    raw: true,
    where,
  });
};
