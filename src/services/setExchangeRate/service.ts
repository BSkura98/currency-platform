import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import Currency from "../../models/Currency";
import { getCurrency } from "../getCurrency/service";

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

  const currency = await getCurrency({ name: currencyName });

  return currency?.update({ exchangeRateToPLN: exchangeRateInPLN });
};
