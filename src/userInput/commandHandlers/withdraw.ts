import { withdraw } from "../../services/withdraw/service";

export const withdrawHandler = async (args: string[]) => {
  try {
    await withdraw(Number(args[1]), Number(args[2]), args[3]);
    console.log("Withdrawal successful");
  } catch (error: any) {
    console.log(error.message);
  }
};
