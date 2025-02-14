import { changeCurrency } from "../../services/changeCurrency/service";

export const changeCurrencyHandler = async (args: string[]) => {
  try {
    await changeCurrency(Number(args[1]), Number(args[2]), args[3], args[4]);
    console.log("Currency change successful");
  } catch (error: any) {
    console.log(error.message);
  }
};
