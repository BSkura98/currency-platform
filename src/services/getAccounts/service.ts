import Account from "../../models/Account";

export const getAccounts = async (userId: number) => {
  return (await Account.findAll({ where: { userId } })).map(
    (account) => account.dataValues
  );
};
