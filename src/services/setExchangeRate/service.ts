import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import Currency from "../../models/Currency";

export const setExchangeRate = async (
  currencyName: string,
  exchangeRateInPLN: number
) => {
  if (exchangeRateInPLN <= 0) {
    throw new BadRequestError("Exchange rate should be a positive number");
  }
  if (isNaN(exchangeRateInPLN)) {
    throw new BadRequestError("Exchange rate is not a proper number");
  }

  const currency = await Currency.findOne({ where: { name: currencyName } });

  if (!currency) {
    throw new NotFoundError("The currency does not exist");
  }

  return currency?.update({ exchangeRateToPLN: exchangeRateInPLN });
};
