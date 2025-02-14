import { getHistory } from "../../services/getHistory/service";
import { createHistoryLog } from "./utils/createHistoryLog";

export const getHistoryHandler = async (args: string[]) => {
  try {
    const operationRecords = await getHistory({
      currencyName: args[1],
      startDate: args[2] ? new Date(args[3]) : undefined,
      endDate: args[3] ? new Date(args[4]) : undefined,
      operationTypeName:
        args.length > 4 ? args.splice(0, 4).join(" ") : undefined,
    });
    operationRecords.forEach((operationRecord) =>
      console.log(createHistoryLog(operationRecord))
    );
  } catch (error: any) {
    console.log(error.message);
  }
};
