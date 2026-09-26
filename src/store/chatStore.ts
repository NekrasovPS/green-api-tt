import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Message, type ChatState } from "../types/types";
import { chatApi } from "../api/chatApi";
import { useAuthStore } from "./authStore";

interface ExtendedChatState extends ChatState {
  sendMessageThunk: (phone: string, text: string) => Promise<void>;
}

export const useChatStore = create<ExtendedChatState>()(
  persist(
    (set, get) => ({
      activeChatId: null,
      messages: {},

      setActiveChat: (phone) => set({ activeChatId: phone }),

      addMessage: (phone, text, sender) =>
        set((state) => {
          const newMessage: Message = {
            id: crypto.randomUUID(),
            text,
            sender,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          const oldMessages = state.messages[phone] || [];
          return {
            messages: {
              ...state.messages,
              [phone]: [...oldMessages, newMessage],
            },
          };
        }),

      receiveMessage: (phone, text) => get().addMessage(phone, text, "to"),

      sendMessageThunk: async (phone, text) => {
        const { idInstance, apiTokenInstance } = useAuthStore.getState();

        // Временный ID для возможного отката
        const tempId = crypto.randomUUID();
        const newMessage: Message = {
          id: tempId,
          text,
          sender: "me",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        set((state) => ({
          messages: {
            ...state.messages,
            [phone]: [...(state.messages[phone] || []), newMessage],
          },
        }));

        try {
          // 2. Сетевой запрос
          await chatApi.sendMessage(idInstance, apiTokenInstance, phone, text);
        } catch (error) {
          console.error("Ошибка сети. Откат UI...", error);
          set((state) => ({
            messages: {
              ...state.messages,
              [phone]: state.messages[phone].filter((m) => m.id !== tempId),
            },
          }));
          throw error;
        }
      },
    }),
    { name: "chat-storage" },
  ),
);
