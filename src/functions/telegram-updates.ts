import { Telegraf } from 'telegraf';
import * as updateLogger from 'telegraf-update-logger';

import configuration from '../configuration';
import { t } from '../translations';
import { handlePayment } from '../commands/payment';
import {
  set as setChatInfo,
  get as getChatInfo,
} from '../storage';
import { Chat } from '../models/chat';
import { success, failure } from '../respondToGatewayAPI'

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
}

export const telegramWebhookHandler = async event => {
  const app = new Telegraf(token);
  const startCmd = startCommandHandler();

  app.use(updateLogger({ colors: true }));

  app.command('payment', handlePayment);
  app.command('start', startCmd)
  app.command('debug', ctx => ctx.reply(updateLogger.format(ctx.update)))

  const payload = JSON.parse(event.body);
  await app.handleUpdate(payload);
  return success('OK');
}