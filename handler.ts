import { getBinBankExchangeRates, getPaymentShares } from './exchangeRate';
import * as firebase from 'firebase-admin';
import * as Telegraf from 'telegraf';

const config =  require("./config.json");
const certFile = require(`./keys/${config.firebase.key_file}`);

firebase.initializeApp({
  databaseURL: config.firebase.database,
  credential: firebase.credential.cert(certFile) 
})

export const telegramWebhookHandler = async (event, context, cb) => {
  const app = new Telegraf(config.token);
  let payload;

  app.command('payment', async (ctx) => {
    const rate = await getBinBankExchangeRates();
    ctx.reply(
      [
        'Если бы за Netflix платить пришлось сегодня, то по',
        getPaymentShares(rate * config.payment_in_euro),
        "рублей",
        'с человека.'
      ].join(' ')
    );
    cb(null, {
      statusCode: 200,
    });
  });
  app.command('start', async (ctx) => {
    const chatId = ctx.chat.id;
    const db = firebase.database();
    const chatsRef = db.ref("chats");
    
    ctx.reply('Я запомнил этот чат и буду слать в него напоминания.');
    chatsRef.child(chatId.toString()).set(new Date().toString())

    cb(null, {
      statusCode: 200,
    });
  })
  app.on('text', (ctx) => {
    ctx.reply('Hello World');
    cb(null, {
      statusCode: 200,
    });
  })

  try {
    payload = JSON.parse(event.body);
    app.handleUpdate(payload);
  } catch (error) {
    console.error(error);
    return context.fail()
  }
}

export const reminder = (event, context, cb) => {
  // this is called when need to remind about payment
}