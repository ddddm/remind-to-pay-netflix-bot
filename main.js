'use strict';
var TelegramBot = require('node-telegram-bot-api'),
    Promise = require('bluebird'),
    _ = require('lodash'),
    moment = require('moment-timezone'),
    CronJob = require('cron').CronJob,
    config    = require('./config.json'),
    bot = new TelegramBot(config.token, {polling: true}),
    firebase = require("firebase"),
    debug = require('debug')

firebase.initializeApp({
    databaseURL: config.firebase.database,
    serviceAccount: config.firebase.key_file
});

var appError = debug('error flow');
var mainLog = debug('main');

mainLog('starting');

bot.onText(/\/start/, function (msg, match) {
    var fromId = msg.chat.id;
    bot.sendMessage(fromId, 'start');
    var db = firebase.database();
    var chatsRef = db.ref("chats");

    chatsRef.child(fromId.toString()).set(new Date().toString(), function(err) {
        if(err) appError(err);
        mainLog('successfly written')
    })
});

bot.on('message', function (message) {
    console.log(message.chat);
})


/*

1. get mdm bank exchange rate DONE
2. store chats
3. cron task to remind to all chats
4. /start listener
5.


 */