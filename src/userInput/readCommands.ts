import promptSync from "prompt-sync";

import { depositHandler } from "./commandHandlers/deposit";
import { withdrawHandler } from "./commandHandlers/withdraw";
import { transferHandler } from "./commandHandlers/transfer";
import { getHistoryHandler } from "./commandHandlers/getHistory";
import { getUserBalanceHandler } from "./commandHandlers/getUserBalance";
import { getAccountHistoryHandler } from "./commandHandlers/getAccountHistory";
import { getProfitInfoHandler } from "./commandHandlers/getProfitInfo";
import { getUsersHandler } from "./commandHandlers/getUsers";
import { helpHandler } from "./commandHandlers/help";
import { changeCurrencyHandler } from "./commandHandlers/changeCurrency";

const prompt = promptSync({ sigint: true });

const operations = {
  deposit: depositHandler,
  withdraw: withdrawHandler,
  transfer: transferHandler,
  changeCurrency: changeCurrencyHandler,
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
