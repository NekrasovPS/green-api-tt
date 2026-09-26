import { useState } from "react";

import AddContact from "../AddContact/AddContact";
import ModalAddContact from "../ModalAddContact/ModalAddContact";
import ListContacts from "../ListContacts/ListContacts";

import styles from "./ChatContacts.module.scss";

function Contacts() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className={styles.contacts}>
        <h2 className={styles.contacts__title}>Контакты</h2>
        <AddContact onClick={handleOpenModal} />
        <ListContacts />
      </div>
      {isModalOpen && <ModalAddContact onClose={handleCloseModal} />}
    </>
  );
}
export default Contacts;
