import { Telegraf } from 'telegraf';

import configuration from '../configuration';
import { t } from '../translations';
import {
  getAll as getAllChats,
} from '../storage';
import { UserCurrency } from "../utils/currency";
import { getIndividualPayment } from '../utils/individualPayment';
import { success, failure } from '../respondToGatewayAPI'

const {
  token,
} = configuration.get();

export const reminder = async _ => {
    const cursor = await getAllChats();
    const app = new Telegraf(token);
    for await(let chat of cursor) {
      const { chatId, numberOfPayers } = chat;
      const payment = await getIndividualPayment(UserCurrency.RUB, numberOfPayers);
      await app.telegram.sendMessage(chatId, t('payment_message', { payment }))
    }
    return success('OK');
}