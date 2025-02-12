import Currency from "../models/Currency";

export const calculateAmountInCurrency = (
  sourceCurrency: Currency,
  targetCurrency: Currency,
  amount: number
) => {
  return (
    (amount * sourceCurrency.dataValues.exchangeRateToPLN) /
    targetCurrency.dataValues.exchangeRateToPLN
  );
};
