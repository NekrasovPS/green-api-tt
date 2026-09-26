import { chatApi } from "../api/chatApi";
import { useChatStore } from "../store/chatStore";
import { useContactStore } from "../store/contactStore";

interface PollingConfig {
  idInstance: string;
  apiTokenInstance: string;
}

export const startPolling = (config: PollingConfig) => {
  const { idInstance, apiTokenInstance } = config;
  let isPolling = true;

  const poll = async () => {
    while (isPolling) {
      try {
        const notification = await chatApi.receiveNotification(
          idInstance,
          apiTokenInstance,
        );

        if (!notification) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          continue;
        }

        console.log("👉 Пришло новое уведомление от сервера:", notification);

        const type = notification.body?.typeWebhook;
        const receiptId = notification.receiptId;

        if (type === "incomingMessageReceived") {
          const incomingChatId = String(notification.body.senderData.chatId);
          const text =
            notification.body.messageData?.textMessageData?.textMessage;

          if (text) {
            const contacts = useContactStore.getState().contacts;
            const updateContactTelegramId =
              useContactStore.getState().updateContactTelegramId;
            const receiveMessage = useChatStore.getState().receiveMessage;

            let targetContact = contacts.find(
              (c) => c.telegramId === incomingChatId,
            );

            if (!targetContact) {
              targetContact = contacts.find((c) => !c.telegramId);

              if (targetContact) {
                updateContactTelegramId(targetContact.phone, incomingChatId);
              }
            }

            if (targetContact) {
              receiveMessage(targetContact.phone, text);
            } else {
              receiveMessage(incomingChatId, text);
            }
          }
        }

        await chatApi.deleteNotification(
          idInstance,
          apiTokenInstance,
          receiptId,
        );
      } catch (error) {
        console.error("Ошибка фонового опроса GREEN-API:", error);
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  };

  poll();

  return () => {
    isPolling = false;
    console.log("Фоновый опрос GREEN-API остановлен.");
  };
};
