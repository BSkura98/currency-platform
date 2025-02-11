import { Currency } from "./Currency";
import { OperationType } from "./OperationType";
import { Profit } from "./Profit";
import { User } from "./User";

export class Platform {
  public operationTypes!: OperationType[];
  public currencies!: Currency[];
  public users!: User[];
  public profits!: Profit[];
}
