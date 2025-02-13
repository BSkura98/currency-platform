import promptSync from "prompt-sync";

import { setExchangeRate } from "../services/setExchangeRate/service";
import { setOperationTypeCommission } from "../services/setOperationTypeCommission/service";

const prompt = promptSync({ sigint: true });

export const readInitialData = async () => {
  const usdExchangeRate = prompt("Enter the USD exchange rate (in PLN): ");
  await setExchangeRate("USD", Number(usdExchangeRate));
  const eurExchangeRate = prompt("Enter the EUR exchange rate (in PLN): ");
  await setExchangeRate("EUR", Number(eurExchangeRate));
  const depositCommissionRate = prompt("Enter the deposit commission rate: ");
  await setOperationTypeCommission("Deposit", Number(depositCommissionRate));
  const withdrawalCommissionRate = prompt(
    "Enter the withdrawal commission rate: "
  );
  await setOperationTypeCommission(
    "Withdrawal",
    Number(withdrawalCommissionRate)
  );
  const transferCommissionRate = prompt("Enter the transfer commission rate: ");
  await setOperationTypeCommission("Transfer", Number(transferCommissionRate));
  const currencyChangeCommissionRate = prompt(
    "Enter the currency change commission rate: "
  );
  await setOperationTypeCommission(
    "Currency change",
    Number(currencyChangeCommissionRate)
  );
};
