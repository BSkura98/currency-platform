import { NotFoundError } from "../../errors/NotFoundError";
import OperationType from "../../models/OperationType";
import { createWhereFilter } from "../../utils/createWhereFilter";

interface Parameters {
  id?: number;
  name?: string;
}

export const getOperationType = async ({ id, name }: Parameters) => {
  let operationType = await OperationType.findOne({
    where: createWhereFilter({ id, name }),
  });
  if (!operationType) {
    throw new NotFoundError(`The operation type does not exist`);
  }
  return operationType;
};
