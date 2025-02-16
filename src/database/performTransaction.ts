import sequelize from "./database";

export const performTransaction = async <T>(callback: () => T) => {
  const transaction = await sequelize.transaction();
  try {
    const result = callback();
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
