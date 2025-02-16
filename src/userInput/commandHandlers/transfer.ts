import { transfer } from "../../services/Account/transfer/service";

export const transferHandler = async (args: string[]) => {
  try {
    await transfer(Number(args[1]), Number(args[2]), Number(args[3]), args[4]);
    console.log("Transfer successful");
  } catch (error: any) {
    console.log(error.message);
  }
};
