import { create } from "zustand";
import {persist} from "zustand/"
import { combine } from "zustand/middleware";


const useAuthStore = create(
  persist(
    combine(
      {
        member: null,
        isAuthenticated:false,
      },
      (set) => ({
        setIsAuthenticated: (status) => set({ setIsAuthenticated: status }),
        setMember: (member) => set({member})
      })
    ),
    {
      name: "auth-storage",
      partialize: (state) => ({
        
      })
    }
  )
)

export default useAuthStore;