import { getBinBankExchangeRates, getPaymentShares } from './exchangeRate';
import { t } from './translations';
import * as Telegraf from 'telegraf';

const config =  require("./config.json");

export const telegramWebhookHandler = async (event, context, cb) => {
  const app = new Telegraf(config.token);
  let payload;

  app.command('payment', async (ctx) => {
    const rate = await getBinBankExchangeRates();
    const payment = getPaymentShares(rate * config.payment_in_euro);
    ctx.reply(t('requested_payment_message', { payment }));
    cb(null, {
      statusCode: 200,
    });
  });

  app.command('start', async ctx => {
    ctx.reply(t('bot_started_successfuly'))
    cb(null, { statusCode: 200 })
  })

  try {
    payload = JSON.parse(event.body);
    app.handleUpdate(payload);
  } catch (error) {
    console.error(error);
    return context.fail()
  }
}