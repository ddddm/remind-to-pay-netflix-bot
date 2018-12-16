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

    static createFromChatId(chatId: number, people: number) {
        return new Chat(
            chatId,
            new Date(),
            people,
        )
    }
}