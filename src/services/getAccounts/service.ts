import { BadRequestError } from "../../errors/BadRequestError";
import Account from "../../models/Account";

export const getAccounts = async (userId: number) => {
  if (isNaN(userId)) {
    throw new BadRequestError("user id must be a valid number");
  }
  return (await Account.findAll({ where: { userId } })).map(
    (account) => account.dataValues
  );
};
