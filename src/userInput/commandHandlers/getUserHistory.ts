import { getOperationRecords } from "../../services/OperationRecord/getOperationRecords/service";
import { createHistoryLog } from "./utils/createHistoryLog";

export const getUserHistoryHandler = async (args: string[]) => {
  try {
    if (isNaN(Number(args[1]))) {
      throw new Error("user id must be a valid number");
    }
    const operationRecords = await getOperationRecords({
      userId: Number(args[1]),
    });
    if (operationRecords.length === 0) {
      console.log("No history found for given user id");
    }
    operationRecords.forEach((operationRecord) =>
      console.log(createHistoryLog(operationRecord))
    );
  } catch (error: any) {
    console.log(error.message);
  }
};
