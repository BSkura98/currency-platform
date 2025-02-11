import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import OperationType from "../../models/OperationType";

export const setOperationTypeCommission = async (
  operationTypeId: number,
  commission: number
) => {
  if (commission < 0) {
    throw new BadRequestError("Commission cannot be a negative number");
  }

  const operationType = await OperationType.findOne({
    where: { id: operationTypeId },
  });

  if (!operationType) {
    throw new NotFoundError("Operation type with such id does not exist");
  }

  return operationType?.update({ commission });
};
