import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import Currency from "../../models/Currency";

export const setExchangeRateToPLN = async (
  currencyId: number,
  exchangeRateToPLN: number
) => {
  if (exchangeRateToPLN <= 0) {
    throw new BadRequestError("Exchange rate should be a positive number");
  }

  const currency = await Currency.findOne({ where: { id: currencyId } });

  if (!currency) {
    throw new NotFoundError("Currency with such id does not exist");
  }

  return currency?.update({ exchangeRateToPLN });
};
