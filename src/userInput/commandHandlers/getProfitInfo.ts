import { getProfits } from "../../services/getProfits/service";

export const getProfitInfoHandler = async (args: string[]) => {
  try {
    const profits = await getProfits({
      currencyName: args[1],
    });
    profits.forEach((profit: any) =>
      console.log(
        `Operation: ${profit.operationTypeName}    Profit: ${profit.amount} ${profit.currencyName}`
      )
    );
  } catch (error: any) {
    console.log(error.message);
  }
};
