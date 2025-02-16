import promptSync from "prompt-sync";

import { setExchangeRate } from "../services/Currency/setExchangeRate/service";
import { setOperationTypeCommissionRate } from "../services/OperationType/setOperationTypeCommission/service";

const prompt = promptSync({ sigint: true });

export const readInitialData = async () => {
  const usdExchangeRate = prompt("Enter the USD exchange rate (in PLN): ");
  await setExchangeRate("USD", Number(usdExchangeRate));
  const eurExchangeRate = prompt("Enter the EUR exchange rate (in PLN): ");
  await setExchangeRate("EUR", Number(eurExchangeRate));
  const depositCommissionRate = prompt("Enter the deposit commission rate: ");
  await setOperationTypeCommissionRate(
    "deposit",
    Number(depositCommissionRate)
  );
  const withdrawalCommissionRate = prompt(
    "Enter the withdrawal commission rate: "
  );
  await setOperationTypeCommissionRate(
    "withdrawal",
    Number(withdrawalCommissionRate)
  );
  const transferCommissionRate = prompt("Enter the transfer commission rate: ");
  await setOperationTypeCommissionRate(
    "transfer",
    Number(transferCommissionRate)
  );
  const currencyChangeCommissionRate = prompt(
    "Enter the currency change commission rate: "
  );
  await setOperationTypeCommissionRate(
    "currency change",
    Number(currencyChangeCommissionRate)
  );
};
