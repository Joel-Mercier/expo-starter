import createSelectors from "@/utils/createSelectors";
import type { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthStore {
  session: Session | null;
  setSession: (session: Session | null) => void;
  account: User | null;
  setAccount: (account: User | null) => void;
}

export const useAuthBase = create<AuthStore>()((set) => ({
  session: null,
  setSession: async (session: Session | null) => {
    set({ session });
  },
  account: null,
  setAccount: (account: User | null) => {
    set({ account });
  },
}));

const useAuth = createSelectors(useAuthBase);
export default useAuth;
