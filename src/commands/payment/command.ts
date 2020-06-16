import { Context } from 'telegraf';
import { UserCurrency } from "../../utils/currency";
import { t } from '../../translations';
import { getIndividualPayment } from '../../utils/individualPayment';
import configuration from '../../configuration';

const {
    numberOfPeople,
} = configuration.get();

export default async (ctx: Context) => {
    const payment = await getIndividualPayment(UserCurrency.RUB, numberOfPeople);
    await ctx.reply(t('requested_payment_message', { payment }));
}