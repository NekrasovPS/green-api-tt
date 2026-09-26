import { useContactStore } from "../../store/contactStore";
import { useChatStore } from "../../store/chatStore";
import styles from "./ListContacts.module.scss";

import avatar from "../assets/avatar.svg";

function ListContacts() {
  const contacts = useContactStore((state) => state.contacts);

  const setActiveChat = useChatStore((state) => state.setActiveChat);
  const activeChatId = useChatStore((state) => state.activeChatId);

  if (contacts.length === 0) {
    return (
      <div className={styles.noContacts}>
        <p>У вас пока нет контактов.</p>
        <p>Нажмите «Добавить контакт», чтобы начать общение.</p>
      </div>
    );
  }

  return (
    <ul className={styles.contactsList}>
      {contacts.map((contact) => (
        <li
          key={contact.id}
          onClick={() => setActiveChat(contact.phone)}
          className={`${styles.contactsList__item} ${
            activeChatId === contact.phone
              ? styles.contactsList__item_active
              : ""
          }`}
        >
          <div className={styles.contactsList__avatar}>
            <img src={avatar} />
          </div>
          <div className={styles.contactsList__info}>
            <span className={styles.contactsList__name}>{contact.name}</span>
            <span className={styles.contactsList__phone}>{contact.phone}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ListContacts;
