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

const startCommandHandler = () => async ctx => {
  const { id: chatId } = ctx.chat;
  const chat = Chat.createFromChatId(
    chatId,
    numberOfPeople,
  );
  const existingChat = await getChatInfo(chat.chatId);

  if(existingChat) {
    console.log(`[command=start] Chat ${chatId} found in DB: ${JSON.stringify(existingChat, null, 2)}`);
    await ctx.reply(t('bot_started_chat_existed'));
    return;
  }
  
  console.log(`[command=start] Chat ${chatId} created: ${JSON.stringify(chat, null, 2)}`);
  await ctx.reply(t('bot_started_successfuly'))

  await setChatInfo(chat);
  console.log(`[command=start] Chat ${chatId} stored`);

}

export const telegramWebhookHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const app = new Telegraf(token);
  const startCmd = startCommandHandler();

  app.command('payment', async (ctx) => {
      const rate = await getBinBankExchangeRates();
      const payment = getPaymentShares() * rate;
      await ctx.reply(t('requested_payment_message', { payment }));
  });

  app.command('start', startCmd)

  const payload = JSON.parse(event.body);
  console.log({
    type: 'payload',
    payload,
  })
  await app.handleUpdate(payload);
  return {
    payload,
  }
}