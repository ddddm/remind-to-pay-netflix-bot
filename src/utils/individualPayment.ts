import configuration from '../configuration';
import { getExchangeRate } from './exchangeRate';
import { UserCurrency, roundPaymentForCurrency } from "./currency";

const {
    payment,
} = configuration.get();

export function getPaymentShare(numberOfPeople) {
    return payment / numberOfPeople;
}

export async function getIndividualPayment(currency: UserCurrency, numberOfPeople: number) {
    const exchangeRate = await getExchangeRate(currency);
    const share = getPaymentShare(numberOfPeople);
    const payment = exchangeRate * share;
    return roundPaymentForCurrency(currency, payment)
    
}