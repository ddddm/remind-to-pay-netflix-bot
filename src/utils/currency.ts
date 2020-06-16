export enum UserCurrency {
    RUB = 'RUB'
}

const currencyRoundingRules = {
    [UserCurrency.RUB]: Math.round,
}

export function roundPaymentForCurrency(currency: UserCurrency, payment: number) {
    if(currencyRoundingRules[currency]) {
        return currencyRoundingRules[currency](payment);
    }
    return payment;
}
