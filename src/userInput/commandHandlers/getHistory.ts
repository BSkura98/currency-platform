import { getOperationRecords } from "../../services/OperationRecord/getOperationRecords/service";
import { createHistoryLog } from "./utils/createHistoryLog";

export const getHistoryHandler = async (args: string[]) => {
  try {
    const operationRecords = await getOperationRecords({
      currencyName: args[1] === "-" ? undefined : args[1],
      startDate: args[2] && args[2] !== "-" ? new Date(args[2]) : undefined,
      endDate: args[3] && args[3] !== "-" ? new Date(args[3]) : undefined,
      operationTypeName: args.length > 4 ? args.splice(4).join(" ") : undefined,
    });
    operationRecords.forEach((operationRecord) =>
      console.log(createHistoryLog(operationRecord))
    );
  } catch (error: any) {
    console.log(error.message);
  }
};
