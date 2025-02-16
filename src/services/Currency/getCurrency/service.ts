import { NotFoundError } from "../../../errors/NotFoundError";
import Currency from "../../../models/Currency";
import { createWhereFilter } from "../../../utils/createWhereFilter";

interface Parameters {
  id?: number;
  name?: string;
}

export const getCurrency = async ({ id, name }: Parameters) => {
  let currency = await Currency.findOne({
    where: createWhereFilter({ id, name }),
  });
  if (!currency) {
    throw new NotFoundError(`The currency does not exist`);
  }
  return currency;
};
