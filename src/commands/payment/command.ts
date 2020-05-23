import { Context } from 'telegraf';
import { getBinBankExchangeRates, getPaymentShares } from './exchangeRate';
import { t } from '../../translations';

export default async (ctx: Context) => {
    const rate = await getBinBankExchangeRates();
    const payment = getPaymentShares() * rate;
    await ctx.reply(t('requested_payment_message', { payment }));
}