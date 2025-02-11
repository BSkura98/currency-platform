import { appData } from "../../data";

export const setExchangeRate = (
  currencyName: string,
  exchangeRateToPLN: number
) => {
  let currency = appData.currencies.find(
    (currency) => currency.name === currencyName
  );
  if (currency) {
    currency.exchangeRateToPLN = exchangeRateToPLN;
  }
  return currency;
};
