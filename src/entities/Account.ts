import { Currency } from "./Currency";
import { Operation } from "./Operation";
import { User } from "./User";

export class Account {
  public currency!: Currency;
  public user!: User;
  public balance!: number;
  public operations!: Operation[];
}
