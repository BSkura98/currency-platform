import promptSync from "prompt-sync";
import { deposit } from "../services/deposit/service";
import { withdraw } from "../services/withdraw/service";
import { transfer } from "../services/transfer/service";
import { changeCurrency } from "../services/changeCurrency/service";
import { getHistory } from "../services/getHistory/service";
import { getAccounts } from "../services/getAccounts/service";
import { getProfit } from "../services/getProfit/service";
import { getUsers } from "../services/getUsers/service";
import { getListOfCommands } from "./getListOfCommands";
import { depositHandler } from "./commandHandlers/deposit";

const prompt = promptSync({ sigint: true });

const operations = {
  deposit: async (args: string[]) => depositHandler(args),
  withdraw: async (args: string[]) =>
    withdraw(Number(args[1]), Number(args[2]), args[3]),
  transfer: async (args: string[]) =>
    transfer(Number(args[1]), Number(args[2]), Number(args[3]), args[4]),
  changeCurrency: async (args: string[]) =>
    changeCurrency(Number(args[1]), Number(args[2]), args[3], args[4]),
  history: async (args: string[]) =>
    getHistory({
      operationTypeName: args[1],
      currencyName: args[2],
      startDate: new Date(args[3]),
      endDate: new Date(args[4]),
    }),
  getAccountBalance: async (args: string[]) => getAccounts(Number(args[1])),
  getAccountHistory: async (args: string[]) =>
    getHistory({ userId: Number(args[1]) }),
  getProfitInfo: async (args: string[]) => getProfit(args[1], args[2]),
  getUsers: async (args: string[]) => getUsers(Number(args[1])),
  help: (args: string[]) => getListOfCommands(),
};

export const readCommands = async () => {
  console.log('Type "help" to get a list of commands');

  while (true) {
    const command = prompt("> ");
    const args = command.split(" ");
    const firstArg = args[0];
    if (firstArg in operations) {
      // @ts-ignore
      await operations[firstArg](args);
    } else {
      console.log("Wrong command");
    }
  }
};
