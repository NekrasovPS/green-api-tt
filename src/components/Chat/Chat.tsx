import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { startPolling } from "../../utils/startPolling"; // Импортируем нашу утилиту
import ChatContacts from "../ChatContacts/ChatContacts";
import ChatMessages from "../ChatMessages/ChatMessages";
import styles from "./Chat.module.scss";

function Chat() {
  const idInstance = useAuthStore((state) => state.idInstance);
  const apiTokenInstance = useAuthStore((state) => state.apiTokenInstance);

  useEffect(() => {
    if (!idInstance || !apiTokenInstance) return;

    const stopPolling = startPolling({ idInstance, apiTokenInstance });

    return () => {
      stopPolling();
    };
  }, [idInstance, apiTokenInstance]);

  return (
    <div className={styles.chat}>
      <ChatContacts />
      <ChatMessages />
    </div>
  );
}

export default Chat;
