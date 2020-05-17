import * as Telegraf from 'telegraf';
import configuration from './configuration';
import { getBinBankExchangeRates, getPaymentShares } from './exchangeRate';
import { t } from './translations';
import {
  set as setChatInfo,
  get as getChatInfo,
} from './storage';
import { Chat } from './models/chat';

const {
  token,
  numberOfPeople,
} = configuration.get();

const startCommandHandler = callback => async ctx => {
  const { id: chatId } = ctx.chat;
  const chat = Chat.createFromChatId(
    chatId,
    numberOfPeople,
  );
  const existingChat = await getChatInfo(chat.chatId);

  if(existingChat) {
    console.log(`[command=start] Chat ${chatId} found in DB: ${JSON.stringify(existingChat, null, 2)}`);
    await ctx.reply(t('bot_started_chat_existed'));
    return callback(null, { statusCode: 200 });
  }
  
  console.log(`[command=start] Chat ${chatId} created: ${JSON.stringify(chat, null, 2)}`);
  await ctx.reply(t('bot_started_successfuly'))

  await setChatInfo(chat);
  console.log(`[command=start] Chat ${chatId} stored`);

  callback(null, { statusCode: 200 })
}

export const telegramWebhookHandler = async (event, context, cb) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const app = new Telegraf(token);
  const startCmd = startCommandHandler(cb);

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

  app.command('start', startCmd)

  try {
    const payload = JSON.parse(event.body);
    app.handleUpdate(payload);
  } catch (error) {
    console.error(error);
    return context.fail()
  }
}