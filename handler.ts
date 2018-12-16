import * as Telegraf from 'telegraf';
import { getBinBankExchangeRates, getPaymentShares } from './exchangeRate';
import { t } from './translations';
import { set as setChatInfo } from './storage';
import { Chat } from './models/chat';

const config =  require("./config.json");

export const telegramWebhookHandler = async (event, context, cb) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const app = new Telegraf(config.token);
  let payload;

  app.catch(error => {
    console.log(`Bot failed to handle the message with error`);
    console.error(error);
  })

  app.command('payment', async (ctx) => {
    try {
      const rate = await getBinBankExchangeRates();
      const payment = getPaymentShares(rate * config.payment_in_euro);
      await ctx.reply(t('requested_payment_message', { payment }));
      cb(null, {
        statusCode: 200,
      });
    } catch (error) {
      cb(error);
      throw error;
    }
  });

  app.command('start', async ctx => {
    const { id: chatId } = ctx.chat;
    const chat = Chat.createFromChatId(
      chatId,
      (config.people as number)
    );
    
    console.log(`[command=start] Chat ${chatId} created: ${JSON.stringify(chat, null, 2)}`);
    await ctx.reply(t('bot_started_successfuly'))

    await setChatInfo(chat);
    console.log(`[command=start] Chat ${chatId} stored`);

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