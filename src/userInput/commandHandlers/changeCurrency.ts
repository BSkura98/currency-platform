import { changeCurrency } from "../../services/Account/changeCurrency/service";

export const changeCurrencyHandler = async (args: string[]) => {
  try {
    await changeCurrency(Number(args[1]), Number(args[4]), args[2], args[3]);
    console.log("Currency change successful");
  } catch (error: any) {
    console.log(error.message);
  }
};
