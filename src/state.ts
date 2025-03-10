export interface State {
  selectedConversationIndex: number;
  conversations: ConversationModel[];
}

export interface ConversationModel {
  user: UserModel;
  newMessage: string;
  messages: MessageModel[];
}

export interface UserModel {
  name: string;
}

export interface MessageModel {
  type: MessageType;
  content: string;
}

export enum MessageType {
  In = 0,
  Out = 1,
}

export const initialState: State = {
  selectedConversationIndex: 0,
  conversations: [
    {
      user: { name: "John Doe" },
      newMessage: "",
      messages: [
        { type: MessageType.In, content: "Good morning!" },
        { type: MessageType.Out, content: "Good morning to you too!" },
        { type: MessageType.In, content: "How are you today?" },
        { type: MessageType.Out, content: "I am doing fine." },
        { type: MessageType.Out, content: "Thanks for asking." },
      ],
    },
    {
      user: { name: "Jane Doe" },
      newMessage: "",
      messages: [
        { type: MessageType.In, content: "Good evening!" },
        { type: MessageType.Out, content: "Good evening to you too!" },
        { type: MessageType.In, content: "How was your day?" },
        { type: MessageType.Out, content: "Pretty good. And yours?" },
        { type: MessageType.In, content: "Not too bad." },
      ],
    },
    {
      user: { name: "Uncle Jim" },
      newMessage: "",
      messages: [],
    },
  ],
};
