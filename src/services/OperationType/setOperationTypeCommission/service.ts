import { BadRequestError } from "../../../errors/BadRequestError";
import { getOperationType } from "../getOperationType/service";

export const setOperationTypeCommissionRate = async (
  operationTypeName: string,
  commissionRate: number
) => {
  if (commissionRate < 0) {
    throw new BadRequestError("Commission rate cannot be a negative number");
  }
  if (isNaN(commissionRate)) {
    throw new BadRequestError("Commission rate is not a proper number");
  }

  const operationType = await getOperationType({ name: operationTypeName });

  return operationType?.update({ commissionRate });
};
