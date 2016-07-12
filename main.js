'use strict';
var TelegramBot = require('node-telegram-bot-api'),
    Promise = require('bluebird'),
    _ = require('lodash'),
    CronJob = require('cron').CronJob,
    config    = require('./config.json'),
    bot = new TelegramBot(config.token, {polling: true}),
    firebase = require("firebase"),
    debug = require('debug')

var exchangeRate = require('./exchangeRate')

firebase.initializeApp({
    databaseURL: config.firebase.database,
    serviceAccount: config.firebase.key_file
});

var appError = debug('error flow');
var mainLog = debug('main');

mainLog('starting');

// Handle /start command

bot.onText(/\/start/, function (msg) {
    var fromId = msg.chat.id;
    bot.sendMessage(fromId, 'Я запомнил этот чат и буду слать в него напоминания.');
    var db = firebase.database();
    var chatsRef = db.ref("chats");

    chatsRef.child(fromId.toString()).set(new Date().toString())
});

bot.onText(/\/payment/, function (msg) {
    var fromId = msg.chat.id;

    exchangeRate()
        .then(function (rate) {
            var paymentPerPerson = getPaymentShares(rate * config.payment_eur);

            mainLog('answering about payment to chat', fromId, 'payment per person', paymentPerPerson);

            bot.sendMessage(
                fromId,
                [
                    'Если бы за Netflix платить пришлось сегодня, то по',
                    paymentPerPerson,
                    '₽',
                    'с человека.'
                ].join(' ')
            );
        });
});


// Schedule
var cronReminderDate = parseInt(config.reminder_date);
var reminderJob = new CronJob(
    '00 3 15 ' + cronReminderDate + ' * *',
    function() {
        exchangeRate()
            .then(function (rate) {
                // create ref to chats node
                // and get all the values
                var db = firebase.database();
                var chatsRef = db.ref("chats");
                chatsRef.once(
                    "value",
                    function(snapshot) {
                        var chats = snapshot.val();
                        var paymentPerPerson = getPaymentShares(rate * config.payment_eur);

                        _.each(chats, function (chat, chatId) {
                            mainLog('sending to chat', chatId, 'payment per person', paymentPerPerson);
                            bot.sendMessage(
                                chatId,
                                [
                                    'Пора платить за Netflix. По',
                                    paymentPerPerson,
                                    '₽',
                                    'с человека.'
                                ].join(' ')
                            );
                        })
                }, function (errorObject) {
                    appError("The read failed: " + errorObject.code);
                });
            });

    },
    null,
    true /* Start the job right now */,
    "Asia/Yekaterinburg"
);

function getPaymentShares(payment) {
    var people = config.people || 1;

    return Math.round(payment / people);
}