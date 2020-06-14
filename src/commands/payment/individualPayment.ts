import configuration from '../../configuration';
import { getExchangeRate } from './exchangeRate';
import { UserCurrency, roundPaymentForCurrency } from "./currency";

const {
    numberOfPeople,
    payment,
} = configuration.get();

export function getPaymentShare() {
    return payment / numberOfPeople;
}

export async function getIndividualPayment(currency: UserCurrency) {
    const exchangeRate = await getExchangeRate(currency);
    const share = getPaymentShare();
    const payment = exchangeRate * share;
    return roundPaymentForCurrency(currency, payment)
    
}