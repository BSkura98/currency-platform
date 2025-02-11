import { appData } from "./data";
import { setExchangeRate } from "./services/Currency/service";

setExchangeRate("EUR", 5.13);

console.log(JSON.stringify(appData));
