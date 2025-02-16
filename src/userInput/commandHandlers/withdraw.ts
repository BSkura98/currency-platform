import { withdraw } from "../../services/Account/withdraw/service";

export const withdrawHandler = async (args: string[]) => {
  try {
    await withdraw(Number(args[1]), Number(args[3]), args[2]);
    console.log("Withdrawal successful");
  } catch (error: any) {
    console.log(error.message);
  }
};
