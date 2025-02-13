import OperationType from "../../models/OperationType";

export const calculateCommission = async (
  amount: number,
  operationName: string
) => {
  let operationType = await OperationType.findOne({
    where: { name: operationName },
  });
  return amount * operationType?.dataValues.commission;
};
