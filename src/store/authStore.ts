import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type AuthState } from "../types/types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      idInstance: "",
      apiTokenInstance: "",

      setAuthData: (data) =>
        set({
          idInstance: data.idInstance,
          apiTokenInstance: data.apiTokenInstance,
        }),

      clearAuthData: () => {
        set({ idInstance: "", apiTokenInstance: "" });
        useAuthStore.persist.clearStorage();
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
