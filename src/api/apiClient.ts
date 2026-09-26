import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.green-api.com",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
      console.error(
        "🚨 Сетевая ошибка! Скорее всего запрос заблокирован (VPN, AdBlock или CORS).",
      );

      alert(
        "Ошибка сети. Пожалуйста, отключите VPN, он блокирует доступ к API.",
      );
    }

    return Promise.reject(error);
  },
);
