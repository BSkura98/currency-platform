import { transfer } from "../../services/Account/transfer/service";

export const transferHandler = async (args: string[]) => {
  try {
    await transfer(Number(args[1]), Number(args[3]), Number(args[4]), args[2]);
    console.log("Transfer successful");
  } catch (error: any) {
    console.log(error.message);
  }
};
