import { connect, Collection } from 'mongodb';
import { ChatShape } from '../models/chat';
import * as assert from 'assert';

const dbName = process.env.MONGODB_DB_NAME;
const collectionName = process.env.MONGODB_COLLECTION_NAME;
const connectionString = process.env.MONGODB_CONNECTION_STRING;
let collection: Collection<ChatShape>;

export async function init() {
    if(collection) {
        return collection;
    }
    
    assert(dbName, 'Mongo DB name should be specified');
    assert(collectionName, 'Mongo collection name should be specified');
    assert(connectionString, 'Mongo connection string should be specified');

    try {
        const client = await connect(connectionString as string);
        return collection =  client.db(dbName).collection<ChatShape>(collectionName as string)
    } catch (error) {
        throw error;
    }
}

export async function set(data: ChatShape) {
    const collection = await init();
    collection.insertOne(data)
}

export async function get(chatId: number) {
    const collection = await init();
    const chat = await collection.findOne({ chatId, })
    return chat;
}