import React from "react";
import { type ConversationModel, type MessageModel, MessageType, initialState } from "./state";
import "./App.css";

export function App() {
  const messagesRef = React.useRef<HTMLDivElement>(null);
  const [state, setState] = React.useState(initialState);

  const conversation = React.useMemo(
    () => state.conversations[state.selectedConversationIndex],
    [state],
  );
  const newMessage = React.useMemo(() => conversation?.newMessage ?? "", [conversation]);
  const messages = React.useMemo(() => conversation?.messages ?? [], [conversation]);

  const selectConversation = React.useCallback(
    (conversation: ConversationModel) =>
      setState((state) => ({
        ...state,
        selectedConversationIndex: state.conversations.indexOf(conversation),
      })),
    [],
  );

  const setConversation = React.useCallback(
    (fn: (conversation: ConversationModel) => ConversationModel) => {
      setState((state) => {
        const conversations = state.conversations.slice();
        conversations[state.selectedConversationIndex] = fn(
          conversations[state.selectedConversationIndex],
        );
        return { ...state, conversations };
      });
    },
    [],
  );

  const setNewMessage = React.useCallback(
    (newMessage: string) => setConversation((conversation) => ({ ...conversation, newMessage })),
    [setConversation],
  );

  const sendNewMessage = React.useCallback(() => {
    setConversation((conversation) => ({
      ...conversation,
      newMessage: "",
      messages: [
        ...conversation.messages,
        { type: MessageType.Out, content: conversation.newMessage },
      ],
    }));
    window.requestAnimationFrame(() => {
      messagesRef.current?.lastElementChild?.scrollIntoView();
    });
  }, [setConversation]);

  return (
    <div className="App">
      <div className="ConversationList">
        {state.conversations.map((c, ci) => (
          <Conversation
            key={`${ci}`}
            conversation={c}
            isSelected={c === conversation}
            onSelect={() => selectConversation(c)}
          />
        ))}
      </div>
      <div className="Chat">
        <div className="Messages" ref={messagesRef}>
          {messages.length === 0 ? (
            <div className="NoMessages">There are no messages in this conversation...</div>
          ) : (
            <>
              {messages.map((m, mi) => (
                <Message key={`${mi}`} message={m} />
              ))}
            </>
          )}
        </div>
        {!!conversation && (
          <div className="NewMessage">
            <input
              type="text"
              className=""
              placeholder="New message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendNewMessage();
                }
              }}
            />
            <button type="button" onClick={sendNewMessage}>
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface ConverstationProps {
  conversation: ConversationModel;
  isSelected: boolean;
  onSelect(): unknown;
}

function Conversation({ conversation, isSelected, onSelect }: ConverstationProps) {
  let className = "Conversation";
  if (isSelected) {
    className += " Conversation--selected";
  }

  let preview = "";
  if (conversation.newMessage !== "") {
    preview = conversation.newMessage;
  } else if (conversation.messages.length !== 0) {
    preview = conversation.messages[conversation.messages.length - 1].content;
  }

  return (
    <div className={className} onClick={onSelect}>
      <div className="Conversation-userImg" />
      <div className="Conversation-text">
        <div className="Conversation-userName">{conversation.user.name}</div>
        <div className="Conversation-lastMsg">{preview}</div>
      </div>
    </div>
  );
}

interface MessageProps {
  message: MessageModel;
}

function Message({ message }: MessageProps) {
  let className = "Message";
  switch (message.type) {
    case MessageType.In:
      className += " Message--in";
      break;
    case MessageType.Out:
      className += " Message--out";
      break;
  }
  return <div className={className}>{message.content}</div>;
}
