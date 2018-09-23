import * as mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true
    },
    numberOfPayers: {
        type: Number,
        required: false,
    },
}, {
    timestamps: true
})

export const ChatModel = mongoose.model('Chat', chatSchema);