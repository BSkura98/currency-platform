import { BadRequestError } from "../../../errors/BadRequestError";
import { getOperationType } from "../getOperationType/service";

export const setOperationTypeCommission = async (
  operationTypeName: string,
  commission: number
) => {
  if (commission < 0) {
    throw new BadRequestError("Commission cannot be a negative number");
  }
  if (isNaN(commission)) {
    throw new BadRequestError("Commission is not a proper number");
  }

  const operationType = await getOperationType({ name: operationTypeName });

  return operationType?.update({ commission });
};
