import { changeCurrency } from "../../services/changeCurrency/service";
import { getAccounts } from "../../services/getAccounts/service";

export const getUserBalanceHandler = async (args: string[]) => {
  try {
    let accounts = await getAccounts(Number(args[1]));
    console.log(`Accounts for user ${args[1]}`);
    accounts.forEach((account) =>
      console.log(
        `Account id: ${account.id}   Balance: ${account.balance} ${account.currencyName}`
      )
    );
  } catch (error: any) {
    console.log(error.message);
  }
};
