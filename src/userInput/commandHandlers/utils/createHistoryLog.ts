export const createHistoryLog = (operationRecord: any) => {
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
