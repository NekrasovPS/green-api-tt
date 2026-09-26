import { useState } from "react";
import { useAuthStore } from "../../store/authStore";

import styles from "./Authorization.module.scss";

function Authorization() {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");

  const setAuthData = useAuthStore((state) => state.setAuthData);

  function handleAuthorization() {
    if (idInstance == "" || apiTokenInstance == "") {
      alert("Заполните все поля");
      return;
    }

    setAuthData({
      idInstance: idInstance,
      apiTokenInstance: apiTokenInstance,
    });

    console.log("Данные сохранены в стор");
  }

  return (
    <div className={styles.authorization}>
      <div className={styles.authorization__container}>
        <h1 className={styles.authorization__title}>Авторизация</h1>
        <input
          className={styles.authorization__input}
          type="text"
          placeholder="idInstance"
          value={idInstance}
          id="idInstance"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIdInstance(e.target.value)
          }
        ></input>

        <input
          className={styles.authorization__input}
          type="text"
          value={apiTokenInstance}
          placeholder="apiTokenInstance"
          id="apiTokenInstance"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setApiTokenInstance(e.target.value)
          }
        ></input>

        <button
          onClick={handleAuthorization}
          className={styles.authorization__button}
        >
          Войти
        </button>
      </div>
    </div>
  );
}

export default Authorization;
