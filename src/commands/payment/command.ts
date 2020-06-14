import { Context } from 'telegraf';
import { UserCurrency } from "./currency";
import { t } from '../../translations';
import { getIndividualPayment } from './individualPayment';

export default async (ctx: Context) => {
    const payment = await getIndividualPayment(UserCurrency.RUB);
    await ctx.reply(t('requested_payment_message', { payment }));
}