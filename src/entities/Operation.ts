import { Account } from "./Account";
import { OperationType } from "./OperationType";

export class Operation {
  public id!: string;
  public account!: Account;
  public type!: OperationType;
  public amount!: number;
  public balance!: number;
  public date!: Date;
}
