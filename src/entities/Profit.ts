import { Currency } from "./Currency";
import { OperationType } from "./OperationType";

export class Profit {
  public currency!: Currency;
  public operation!: OperationType;
  public amount!: number;
}
