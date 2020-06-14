import fetch from 'node-fetch';
import configuration from '../../configuration';
import { UserCurrency } from './currency';

const {
    currencyRatesToken,
} = configuration.get();

export async function getExchangeRate(currency: UserCurrency): Promise<number> {
    const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${currencyRatesToken}`)
    const { rates } = await response.json();

    if(!rates[currency]) { throw new Error('Currency is not supported')};

    return rates[currency] / rates.EUR
}
