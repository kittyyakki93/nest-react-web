import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    combine(
      {
        member: null,
        isAuthenticated: false,
      },
      (set) => ({
        setIsAuthenticated: (status) => set({ isAuthenticated: status }),
        setMember: (member) => set({ member }),
      })
    ),
    {
      name: "auth-storage",
      partialize: (state) => ({
        member: state.member,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

export default useAuthStore;
