import { NotFoundError } from "../../../errors/NotFoundError";
import Account from "../../../models/Account";
import { createWhereFilter } from "../../../utils/createWhereFilter";

interface Parameters {
  userId?: number;
  currencyName?: string;
}

export const getAccount = async ({ userId, currencyName }: Parameters) => {
  let account = await Account.findOne({
    where: createWhereFilter({ userId, currencyName }),
  });
  if (!account) {
    throw new NotFoundError(`The account has not been found`);
  }
  return account;
};
