export const createHistoryLog = (operationRecord: any) => {
  let log = `${operationRecord.createdAt}   User id: ${operationRecord["account.userId"]}   Operation: `;
  if (operationRecord.operationTypeName === "transfer") {
    if (operationRecord.amount < 0) {
      log = log.concat("outgoing transfer   ");
    } else {
      log = log.concat("incoming transfer   ");
    }
  } else {
    log = log.concat(`${operationRecord.operationTypeName}   `);
  }

  log = log.concat(
    `Amount: ${operationRecord.amount} ${operationRecord["account.currencyName"]}   Balance: ${operationRecord.balance} ${operationRecord["account.currencyName"]} `
  );
  return log;
};
