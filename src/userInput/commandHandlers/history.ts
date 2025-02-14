import { getHistory } from "../../services/getHistory/service";

const createHistoryLog = (operationRecord: any) => {
  let log = `${operationRecord.createdAt}   User id: ${operationRecord["account.userId"]}   Operation: `;
  if (operationRecord.operationTypeName === "Transfer") {
    if (operationRecord.amount < 0) {
      log = log.concat("Outgoing transfer   ");
    } else {
      log = log.concat("Incoming transfer   ");
    }
  } else {
    log = log.concat(`${operationRecord.operationTypeName}   `);
  }

  log = log.concat(
    `Amount: ${operationRecord.amount} ${operationRecord["account.currencyName"]}   Balance: ${operationRecord.balance} ${operationRecord["account.currencyName"]} `
  );
  return log;
};

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
