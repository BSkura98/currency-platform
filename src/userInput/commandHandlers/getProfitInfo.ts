import { getProfits } from "../../services/Profit/getProfits/service";

export const getProfitInfoHandler = async (args: string[]) => {
  try {
    const profits = await getProfits({
      currencyName: args[1],
    });
    if (profits.length === 0) {
      console.log("No profit information found for given currency");
    }
    profits.forEach((profit: any) =>
      console.log(
        `Operation: ${profit.operationTypeName}    Profit: ${profit.amount} ${profit.currencyName}`
      )
    );
  } catch (error: any) {
    console.log(error.message);
  }
};
