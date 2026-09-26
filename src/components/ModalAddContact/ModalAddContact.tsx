import { useState } from "react";
import { formatPhoneNumber, getRawPhoneNumber } from "../../utils/formatPhone";
import { useContactStore } from "../../store/contactStore";
import styles from "./ModalAddContact.module.scss";

interface ModalAddContactProps {
  onClose: () => void;
}

function ModalAddContact({ onClose }: ModalAddContactProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const addContact = useContactStore((state) => state.addContact);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(event.target.value);
    setPhone(formattedPhone);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !phone.trim()) {
      alert("Заполните все поля");
      return;
    }

    const rawPhone = getRawPhoneNumber(phone);

    addContact({
      id: crypto.randomUUID(),
      name: name.trim(),
      phone: rawPhone,
    });

    onClose();
  };

  return (
    <div className={styles.modalAddContact} onClick={onClose}>
      <form
        className={styles.modalAddContact__container}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.modalAddContact__title}>Добавить контакт</h2>

        <input
          className={styles.modalAddContact__input}
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={styles.modalAddContact__input}
          type="text"
          placeholder="+7 (999) 000-00-00"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={18}
        />

        <button type="submit" className={styles.modalAddContact__button}>
          Добавить
        </button>

        <button
          type="button"
          onClick={onClose}
          className={styles.modalAddContact__close}
          aria-label="Закрыть"
        ></button>
      </form>
    </div>
  );
}

export default ModalAddContact;
