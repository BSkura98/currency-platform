import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import OperationType from "../../models/OperationType";

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

  const operationType = await OperationType.findOne({
    where: { name: operationTypeName },
  });

  if (!operationType) {
    throw new NotFoundError("Operation type with such name does not exist");
  }

  return operationType?.update({ commission });
};
