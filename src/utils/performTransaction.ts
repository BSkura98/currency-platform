import { Model } from "sequelize";

import { calculateCommission } from "../services/calculateCommission/service";
import sequelize from "../database/database";
import { chargeCommission } from "../services/chargeCommission/service";

export const performTransaction = async <T extends Model>(
  amount: number,
  operationName: string,
  currencyName: string,
  operationFunction: (amountAfterCommission: number) => Promise<T>
) => {
  let commission = await calculateCommission(amount, operationName);
  amount = amount - commission;

  const transaction = await sequelize.transaction();
  try {
    await chargeCommission(commission, operationName, currencyName);

    const result = operationFunction(amount);
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
