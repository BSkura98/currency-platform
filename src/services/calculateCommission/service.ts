import { getOperationType } from "../getOperationType/service";

export const calculateCommission = async (
  amount: number,
  operationTypeName: string
) => {
  let operationType = await getOperationType({ name: operationTypeName });
  return amount * operationType?.dataValues.commission;
};
