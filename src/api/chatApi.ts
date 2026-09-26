import { apiClient } from "./apiClient";

export const chatApi = {
  sendMessage: async (
    idInstance: string,
    apiTokenInstance: string,
    chatId: string,
    message: string,
  ) => {
    const cleanChatId = chatId.trim();

    const isPhoneNumber =
      (cleanChatId.startsWith("7") || cleanChatId.startsWith("8")) &&
      cleanChatId.length >= 11;

    const formattedChatId = isPhoneNumber
      ? cleanChatId.includes("@")
        ? cleanChatId
        : `${cleanChatId}@c.us`
      : cleanChatId;

    const response = await apiClient.post(
      `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      {
        chatId: formattedChatId,
        message: message,
      },
    );

    return response.data;
  },

  receiveNotification: async (idInstance: string, apiTokenInstance: string) => {
    const response = await apiClient.get(
      `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
    );
    return response.data;
  },

  deleteNotification: async (
    idInstance: string,
    apiTokenInstance: string,
    receiptId: number,
  ) => {
    const response = await apiClient.delete(
      `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
    );
    return response.data;
  },
};
