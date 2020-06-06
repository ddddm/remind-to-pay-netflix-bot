import { Context } from 'telegraf';
import { getExchangeRate, getPaymentShares, UserCurrency } from './exchangeRate';
import { t } from '../../translations';

export default async (ctx: Context) => {
    const exchangeRate = await getExchangeRate(UserCurrency.RUB);
    const payment = getPaymentShares() * exchangeRate;
    await ctx.reply(t('requested_payment_message', { payment }));
}