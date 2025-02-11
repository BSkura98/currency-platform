import { Currency } from "./Currency";
import { Operation } from "./Operation";

export class Account {
  public id!: string;
  public currency!: Currency;
  public balance!: number;
  public operations!: Operation[];
}
