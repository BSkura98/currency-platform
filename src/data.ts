import { Currency } from "./entities/Currency";
import { OperationType } from "./entities/OperationType";
import { Platform } from "./entities/Platform";
import { User } from "./entities/User";

let operationTypes: OperationType[] = [
  {
    id: "1",
    name: "Deposit",
    commission: 0,
  },
  {
    id: "2",
    name: "Withdrawal",
    commission: 0,
  },
  {
    id: "3",
    name: "Transfer",
    commission: 0,
  },
  {
    id: "4",
    name: "Currency change",
    commission: 0,
  },
];

let currencies: Currency[] = [
  {
    id: "1",
    name: "PLN",
    exchangeRateToPLN: 1,
  },
  {
    id: "2",
    name: "EUR",
    exchangeRateToPLN: 4.18,
  },
  {
    id: "3",
    name: "USD",
    exchangeRateToPLN: 4.05,
  },
];

let users: User[] = [
  {
    id: "user1",
    accounts: [
      { id: "account1", currency: currencies[0], balance: 0, operations: [] },
      { id: "account2", currency: currencies[1], balance: 0, operations: [] },
      { id: "account3", currency: currencies[2], balance: 0, operations: [] },
    ],
  },
  {
    id: "user2",
    accounts: [
      { id: "account4", currency: currencies[0], balance: 0, operations: [] },
      { id: "account5", currency: currencies[1], balance: 0, operations: [] },
      { id: "account6", currency: currencies[2], balance: 0, operations: [] },
    ],
  },
  {
    id: "user3",
    accounts: [
      { id: "account7", currency: currencies[0], balance: 0, operations: [] },
      { id: "account8", currency: currencies[1], balance: 0, operations: [] },
      { id: "account9", currency: currencies[2], balance: 0, operations: [] },
    ],
  },
];

export let data: Platform = {
  operationTypes: operationTypes,
  currencies: currencies,
  users: users,
  profits: [],
};
