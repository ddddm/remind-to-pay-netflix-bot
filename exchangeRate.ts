import * as request from "request";
import * as Promise from "bluebird";
const config =  require("./config.json");
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
                const respone = JSON.parse(responseString);
                resolve(respone.rates.RUB / respone.rates.EUR);
            })
    })

}

export function getPaymentShares(payment) {
    const people = config.people || 1;
    return Math.round(payment / people);
}