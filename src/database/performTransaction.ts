import sequelize from "./database";

export const performTransaction = async <T>(databaseOperation: () => T) => {
  const transaction = await sequelize.transaction();
  try {
    const result = databaseOperation();
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
