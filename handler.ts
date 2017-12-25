import { getBinBankExchangeRates, getPaymentShares } from './exchangeRate';
import { sendMessage } from './telegram';
const config =  require("./config.json");

export const telegramWebhookHandler = async (event, context, cb) => {
  let payload;

  cb(null, {
    statusCode: 200,
  });

  try {
    payload = JSON.parse(event.body);
    const { message = {} } = payload || {};
    const { chat = {} } = message || {};
  
    if(chat.id) {
      const rate = await getBinBankExchangeRates();
      sendMessage(
        chat.id,
        [
          'Если бы за Netflix платить пришлось сегодня, то по',
          getPaymentShares(rate * config.payment_in_euro),
          '₽',
          'с человека.'
        ].join(' ')
      );
    }
  } catch (error) {
    return context.fail()
  }
  

}

export const reminder = (event, context, cb) => {
  // this is called when need to remind about payment
}