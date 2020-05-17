import * as request from "request";
import * as Promise from "bluebird";
import configuration from './configuration';

const {
    numberOfPeople,
} = configuration.get();
const appId = 'e2cf12a023434cebbb340acda92c6b8b';

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

export function getPaymentShares(payment) {
    return Math.round(payment / numberOfPeople);
}