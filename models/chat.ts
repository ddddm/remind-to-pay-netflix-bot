const config =  require("./config.json");
export interface ChatShape {
    chatId: number;
    createdAt: Date;
    numberOfPayers: number;
}
export class Chat implements ChatShape {
    constructor(
        public chatId: number,
        public createdAt: Date,
        public numberOfPayers: number,
    ) {}

    static createFromChatId(chatId: number) {
        return new Chat(
            chatId,
            new Date(),
            (config.people as number)
        )
    }
}