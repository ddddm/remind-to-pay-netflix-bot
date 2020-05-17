import * as assert from 'assert';

const token = process.env.TELEGRAM_BOT_TOKEN;
const numberOfPeople = parseInt(process.env.DEFAULT_NUMBER_OF_PEOPLE || '3');
const payment = parseFloat(process.env.PAYMENT_IN_EURO || '11.99');
const dbName = process.env.DOCUMENT_STORAGE_DB_NAME;
const collectionName = process.env.DOCUMENT_STORAGE_COLLECTION_NAME;
const connectionString = process.env.DOCUMENT_STORAGE_CONNECTION_STRING;

assert(dbName, 'Mongo DB name should be specified');
assert(collectionName, 'Mongo collection name should be specified');
assert(connectionString, 'Mongo connection string should be specified');
assert(token, 'Telegram token string should be specified');

const config = {
    dbName,
    collectionName,
    connectionString,
    token,
    payment,
    numberOfPeople,
}

export default {
    get() {
        return config;
    }
}