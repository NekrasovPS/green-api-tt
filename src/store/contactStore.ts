import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type ContactState } from "../types/types";

export const useContactStore = create<ContactState>()(
  persist(
    (set) => ({
      contacts: [],

      setContacts: (newContacts) => set({ contacts: newContacts }),

      addContact: (newContact) =>
        set((state) => ({ contacts: [...state.contacts, newContact] })),

      updateContactTelegramId: (phone, telegramId) =>
        set((state) => ({
          contacts: state.contacts.map((c) =>
            c.phone === phone ? { ...c, telegramId } : c,
          ),
        })),

      clearContactData: () => {
        set({ contacts: [] });
        useContactStore.persist.clearStorage();
      },
    }),
    {
      name: "contacts-storage",
    },
  ),
);
