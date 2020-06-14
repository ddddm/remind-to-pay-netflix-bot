# Remind your pals to pay for Netlfix

[![Build Status](https://travis-ci.org/ddddm/remind-to-pay-netflix-bot.svg?branch=master)](https://travis-ci.org/ddddm/remind-to-pay-netflix-bot)

Sharing a family Netflix subscription with your friends? This bot will remind you to pay for it. 


### Getting started

You'll need
- an AWS account
- a [Telegram bot](https://core.telegram.org/bots#3-how-do-i-create-a-bot)

In AWS SSM, the following keys should exist in the [Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html):
- `/netflixBot/netflixBotdocumentStorageConnectionString`
- `/netflixBot/telegramBotToken`
- `/netflixBot/openexchangeratesOrgToken`
They are passed to the app as environment variables in `serverless.yml` config.

A bot is deployed on AWS Lambda via `serverless` framework. In order to use it, [AWS credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/) are required.
After that, a deploy can be done:

```
// serverless is a dependency, a local version can be invoked

yarn run serverless deploy
```

Now when a serverless function is deployed, the only thing left is to start receiving updates from telegram. Using the function URL, [a webhook can be set](https://core.telegram.org/bots/api#setwebhook).


### Features

Commands:
- [x] `/start` command activates the bot for the chat in which it will send reminders
- [x] `/payment` command calculates the individual payment

Reminder: 
- [ ] Sends a reminder to the chat it was activated on a selected date

