import { connect, Collection } from 'mongodb';
import * as assert from 'assert';
import { ChatShape } from '../models/chat';
import configuration from '../configuration';

const {
    dbName,
    collectionName,
    connectionString,
} = configuration.get();
let collection: Collection<ChatShape>;

export async function init() {
    if(collection) {
        return collection;
    }

    try {
        const client = await connect(connectionString, {
            useNewUrlParser: true,
        });
        return collection =  client.db(dbName).collection<ChatShape>(collectionName)
    } catch (error) {
        throw error;
    }
}

export async function set(data: ChatShape) {
    const collection = await init();
    return collection.insertOne(data)
}

export async function get(chatId: number) {
    const collection = await init();
    const chat = await collection.findOne({ chatId, })
    return chat;
}