import { Op } from "sequelize";

import Account from "../../models/Account";
import OperationRecord from "../../models/OperationRecord";
import { createWhereFilter } from "../../utils/createWhereFilter";

interface Parameters {
  operationTypeName?: string;
  currencyName?: string;
  startDate?: Date;
  endDate?: Date;
  userId?: number;
}

export const getHistory = async ({
  operationTypeName,
  currencyName,
  startDate,
  endDate,
  userId,
}: Parameters) => {
  const operationRecordWhere: any = createWhereFilter({ operationTypeName });
  if (startDate) {
    operationRecordWhere.createdAt = { [Op.gte]: startDate };
  }
  if (endDate) {
    operationRecordWhere.createdAt = {
      ...operationRecordWhere.createdAt,
      [Op.lte]: endDate,
    };
  }

  const accountWhere = createWhereFilter({ currencyName, userId });

  return await OperationRecord.findAll({
    raw: true,
    where: operationRecordWhere,
    include: [
      {
        model: Account,
        required: true,
        where: accountWhere,
      },
    ],
  });
};
