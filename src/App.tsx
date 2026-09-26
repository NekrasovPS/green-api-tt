import Authorization from "./components/Authorization/Authorization";
import Chat from "./components/Chat/Chat";
import { useAuthStore } from "./store/authStore";

function App() {
  const { idInstance, apiTokenInstance } = useAuthStore((state) => state);

  const isAuth = idInstance && apiTokenInstance;

  return (
    <>
      {isAuth ? (
        <Chat />
      ) : (
        <Authorization />
      )}
    </>
  );
}

export default App;
