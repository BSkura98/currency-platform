import { deposit } from "../../services/deposit/service";

export const depositHandler = async (args: string[]) => {
  try {
    await deposit(Number(args[1]), Number(args[2]), args[3]);
    console.log("Deposit successful");
  } catch (error: any) {
    console.log(error.message);
  }
};
