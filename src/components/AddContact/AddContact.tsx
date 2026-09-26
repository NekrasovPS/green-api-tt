import styles from "./AddContact.module.scss";

interface AddContactProps {
  onClick: () => void;
}

// React.FC сам подхватит типы для деструктуризации из AddContactProps
const AddContact: React.FC<AddContactProps> = ({ onClick }) => {
  return (
    <div className={styles.addContact}>
      <button
        onClick={onClick}
        type="button"
        className={styles.addContact__button}
      >
        Добавить контакт
      </button>
    </div>
  );
};

export default AddContact;
