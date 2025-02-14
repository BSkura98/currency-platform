import promptSync from "prompt-sync";
import { deposit } from "../services/deposit/service";
import { withdraw } from "../services/withdraw/service";
import { transfer } from "../services/transfer/service";
import { changeCurrency } from "../services/changeCurrency/service";
import { getHistory } from "../services/getHistory/service";
import { getAccounts } from "../services/getAccounts/service";
import { getProfits } from "../services/getProfits/service";
import { getUsers } from "../services/getUsers/service";
import { getListOfCommands } from "./getListOfCommands";
import { depositHandler } from "./commandHandlers/deposit";
import { withdrawHandler } from "./commandHandlers/withdraw";
import { transferHandler } from "./commandHandlers/transfer";
import { getHistoryHandler } from "./commandHandlers/getHistory";
import { getUserBalanceHandler } from "./commandHandlers/getUserBalance";
import { getAccountHistoryHandler } from "./commandHandlers/getAccountHistory";
import { getProfitInfoHandler } from "./commandHandlers/getProfitInfo";
import { getUsersHandler } from "./commandHandlers/getUsers";
import { helpHandler } from "./commandHandlers/help";

const prompt = promptSync({ sigint: true });

const operations = {
  deposit: depositHandler,
  withdraw: withdrawHandler,
  transfer: transferHandler,
  changeCurrency: changeCurrency,
  getHistory: getHistoryHandler,
  getUserBalance: getUserBalanceHandler,
  getUserHistory: getAccountHistoryHandler,
  getProfitInfo: getProfitInfoHandler,
  getUsers: getUsersHandler,
  help: helpHandler,
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
