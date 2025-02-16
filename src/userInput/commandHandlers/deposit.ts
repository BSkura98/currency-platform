import { deposit } from "../../services/Account/deposit/service";

export const depositHandler = async (args: string[]) => {
  try {
    await deposit(Number(args[1]), Number(args[3]), args[2]);
    console.log("Deposit successful");
  } catch (error: any) {
    console.log(error.message);
  }
};
