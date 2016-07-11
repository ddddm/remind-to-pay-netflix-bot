var request = require('request')
var Promise = require('bluebird')

var appId = 'e2cf12a023434cebbb340acda92c6b8b';

function getBinBankExchangeRates() {
    return new Promise(function(resolve, reject) {
        request(
            {
                uri:'https://openexchangerates.org/api/latest.json?app_id=' + appId,
                method:'GET'
            },
            function (err, res, responseString) {
                var respone = JSON.parse(responseString);
                resolve(respone.rates.RUB / respone.rates.EUR);
            })
    })

}
module.exports = getBinBankExchangeRates