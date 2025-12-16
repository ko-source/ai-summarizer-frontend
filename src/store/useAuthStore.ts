import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  token: string | null;
  username: string | null;
  email: string | null;
  hasHydrated: boolean;                   
  setHasHydrated: (value: boolean) => void;
  setToken: (token: string | null) => void;
  setUser: (username: string | null, email: string | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      username: null,
      email: null,
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      setToken: (token) => set({ token }),

      setUser: (username, email) =>
        set({
          username,
          email,
        }),

      logout: () =>
        set({
          token: null,
          username: null,
          email: null,
        }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);
