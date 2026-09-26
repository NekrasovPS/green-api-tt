import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useChatStore } from "../../store/chatStore";
import { useContactStore } from "../../store/contactStore";

import AddContact from "../AddContact/AddContact";
import ModalAddContact from "../ModalAddContact/ModalAddContact";
import ListContacts from "../ListContacts/ListContacts";

import styles from "./ChatContacts.module.scss";

function Contacts() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clearAuthData = useAuthStore((state) => state.clearAuthData);
  const clearChatData = useChatStore((state) => state.clearChatData);
  const clearContactData = useContactStore((state) => state.clearContactData);

  const handleLogout = () => {
    // 1. Полная очистка сообщений и контактов
    clearChatData();
    clearContactData();

    // 2. Очистка авторизации (компонент Chat размонтируется, App переключится на Authorization)
    clearAuthData();
  };

  return (
    <>
      <div className={styles.contacts}>
        <div className={styles.contacts__header}>
          <h2 className={styles.contacts__title}>Контакты</h2>
          <button
            type="button"
            onClick={handleLogout}
            className={styles.contacts__logoutBtn}
            title="Выйти и очистить данные"
          >
            Выйти
          </button>
        </div>

        <AddContact onClick={() => setIsModalOpen(true)} />
        <ListContacts />
      </div>

      {isModalOpen && <ModalAddContact onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

export default Contacts;
