import { getHistory } from "../../services/getHistory/service";
import { createHistoryLog } from "./utils/createHistoryLog";

export const getAccountHistoryHandler = async (args: string[]) => {
  try {
    const operationRecords = await getHistory({ userId: Number(args[1]) });
    operationRecords.forEach((operationRecord) =>
      console.log(createHistoryLog(operationRecord))
    );
  } catch (error: any) {
    console.log(error.message);
  }
};
