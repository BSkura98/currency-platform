import { getOperationRecords } from "../../services/getOperationRecords/service";
import { createHistoryLog } from "./utils/createHistoryLog";

export const getAccountHistoryHandler = async (args: string[]) => {
  try {
    const operationRecords = await getOperationRecords({
      userId: Number(args[1]),
    });
    operationRecords.forEach((operationRecord) =>
      console.log(createHistoryLog(operationRecord))
    );
  } catch (error: any) {
    console.log(error.message);
  }
};
