import { useState } from "react";
import { useChatStore } from "../../store/chatStore";
import styles from "./ChatMessages.module.scss";

function ChatMessages() {
  const [text, setText] = useState("");

  const activeChatId = useChatStore((state) => state.activeChatId);
  const messages = useChatStore((state) => state.messages);
  const sendMessageThunk = useChatStore((state) => state.sendMessageThunk);
  const chatHistory = activeChatId ? messages[activeChatId] || [] : [];

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text.trim() === "" || !activeChatId) return;

    const messageText = text;
    setText("");

    try {
      await sendMessageThunk(activeChatId, messageText);
    } catch {
      alert("Ошибка отправки. Проверьте интернет или токены.");
    }
  };

  if (!activeChatId) {
    return (
      <div className={styles.messagesEmpty}>
        <p>
          Добавьте новый контакт или выберите контакт из списка слева, чтобы
          начать переписку.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.messages}>
      <div className={styles.messages__header}>
        <h3>{activeChatId}</h3>
      </div>

      {/* Зона истории переписки */}
      <div className={styles.messages__history}>
        {chatHistory.toReversed().map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${
              msg.sender === "me"
                ? styles.message_outgoing
                : styles.message_incoming
            }`}
          >
            <p className={styles.message__text}>{msg.text}</p>
            <span className={styles.message__time}>{msg.time}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className={styles.messages__text}>
        <input
          placeholder="Введите текст"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" disabled={!text.trim()}>
          Отправить
        </button>
      </form>
    </div>
  );
}

export default ChatMessages;
