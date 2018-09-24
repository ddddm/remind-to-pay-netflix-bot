import { connect } from 'mongoose';

let cachedConnection;

export async function init() {
    if(cachedConnection) {
        return;
    }

    try {
        cachedConnection = await connect('connectionstring');
    } catch (error) {
        throw error;
    }
}
// .set writes to storage
// .get reads chat

// [done] Chat model

// Mongo integration