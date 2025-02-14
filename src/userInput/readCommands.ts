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
import { withdrawHandler } from "./commandHandlers/withdraw";
import { transferHandler } from "./commandHandlers/transfer";
import { getHistoryHandler } from "./commandHandlers/history";

const prompt = promptSync({ sigint: true });

const operations = {
  deposit: depositHandler,
  withdraw: withdrawHandler,
  transfer: transferHandler,
  changeCurrency: changeCurrency,
  history: getHistoryHandler,
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
