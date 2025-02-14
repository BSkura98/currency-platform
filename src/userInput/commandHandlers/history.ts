import { getHistory } from "../../services/getHistory/service";
import { createHistoryLog } from "./utils/createHistoryLog";

export const getHistoryHandler = async (args: string[]) => {
  try {
    const operationRecords = await getHistory({
      operationTypeName: args[1],
      currencyName: args[2],
      startDate: args[3] ? new Date(args[3]) : undefined,
      endDate: args[4] ? new Date(args[4]) : undefined,
    });
    operationRecords.forEach((operationRecord) =>
      console.log(createHistoryLog(operationRecord))
    );
  } catch (error: any) {
    console.log(error.message);
  }
};
