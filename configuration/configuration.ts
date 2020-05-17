let token = process.env.TELEGRAM_BOT_TOKEN;
let numberOfPeople = parseInt(process.env.DEFAULT_NUMBER_OF_PEOPLE || '3');
let payment = parseFloat(process.env.PAYMENT_IN_EURO || '11.99');
let dbName = process.env.DOCUMENT_STORAGE_DB_NAME;
let collectionName = process.env.DOCUMENT_STORAGE_COLLECTION_NAME;
let connectionString = process.env.DOCUMENT_STORAGE_CONNECTION_STRING;

const assert = (input: string | undefined, message: string) => {
    if(!input) {
        throw new Error(message)
    }

    return input;
}

dbName = assert(dbName, 'Mongo DB name should be specified');
collectionName = assert(collectionName, 'Mongo collection name should be specified');
connectionString = assert(connectionString, 'Mongo connection string should be specified');
token = assert(token, 'Telegram token string should be specified');


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