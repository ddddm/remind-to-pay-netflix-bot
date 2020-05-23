import * as request from "request";
import configuration from '../../configuration';

const {
    numberOfPeople,
    payment,
} = configuration.get();
const appId = 'e2cf12a023434cebbb340acda92c6b8b';

export enum UserCurrency {
    RUB = 'RUB',
}

export function getBinBankExchangeRates(): Promise<number> {
    return new Promise(function(resolve, reject) {
        request(
            {
                uri:'https://openexchangerates.org/api/latest.json?app_id=' + appId,
                method:'GET'
            },
            function (err, res, responseString) {
                if(err) return reject(err);
                const response = JSON.parse(responseString);
                resolve(response.rates.RUB / response.rates.EUR);
            })
    })

}

export function getPaymentShares() {
    return Math.round(payment / numberOfPeople);
}