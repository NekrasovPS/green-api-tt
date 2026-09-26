export type AuthData = {
  idInstance: string;
  apiTokenInstance: string;
};

export type AuthState = AuthData & {
  setAuthData: (data: AuthData) => void;
  clearAuthData: () => void;
};

export type ContactData = {
  id: string;
  name: string;
  phone: string;
  telegramId?: string;
};

export type ContactState = {
  contacts: ContactData[];
  setContacts: (contacts: ContactData[]) => void;
  addContact: (contact: ContactData) => void;
  updateContactTelegramId: (phone: string, telegramId: string) => void;
  clearContactData: () => void; // Добавили экшен очистки
};

export type Message = {
  id: string;
  text: string;
  sender: "me" | "to";
  time: string;
};

export type MessageData = Record<string, Message[]>;

export type ChatState = {
  activeChatId: string | null;
  messages: MessageData;
  setActiveChat: (phone: string | null) => void;
  receiveMessage: (phone: string, text: string) => void;
  addMessage: (phone: string, text: string, sender: "me" | "to") => void;
};
