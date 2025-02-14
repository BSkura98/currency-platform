import User from "../../models/Account";

export const getUsers = async (userId: number) => {
  return await User.findAll({ where: { id: userId }, raw: true });
};
