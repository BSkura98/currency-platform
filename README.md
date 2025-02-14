# currency-platform
This is a platform which simulates money transfers and currency exchanges.

## How to run
1. Run `npm install` to install all dependencies
2. Run `npm run build` to compile TypeScript files to JavaScript
3. Run `npm run resetDatabase` to create initial data (users, accounts, currencies etc.) in database (this command can be also used to reset database)
4. Run `npm run start` to run the application

## How to use
After running this applications, you will be asked to enter exchange rates in PLN for currencies and commission rates for operations. Commission rates should be entered as a float number (for example: 0.05 means 5% commission rate).

After entering this data, you can make operations through commands.

There are 4 operations for which the platform charges a commission:
* Deposit,
* Withdrawal,
* Transfer,
* Currency change.

Keep in mind that amount entered in command is the amount before charging commission!

Most commands require user id parameter. There are 5 users initially created by `npm run resetDatabase` with ids from 1 to 5, but just in case there is `getUsers` command which allows you to list ids of all users.

## Commands
- `deposit <amount> <user id> <currency>` - deposit money in given currency to the user with given id
- `withdraw <amount> <user id> <currency>` - withdraw money in given currency from the user with given id
- `transfer <amount> <source user id> <target user id> <currency>` - transfer money in the given currency from the source user to the target user
- `changeCurrency <amount> <user id> <currency from> <currency to>` - change currency for the given user
- `getHistory <currency?> <start date?> <end date?> <operation name?>` - get history with optional filter parameters
- `getUserBalance <user id>` - get balances in all currencies for the user
- `getUserHistory <user id>` - get history for all user accounts
- `getProfitInfo <currency?>` - get information about platform profit
- `getUsers` - get ids for all users
- `help`

Available currencies: PLN, USD, EUR

Operation names for getHistory command: deposit, withdrawal, transfer, currency change

