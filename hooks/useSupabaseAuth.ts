import { supabase } from "@/services/supabase";
import { useMutation } from "@tanstack/react-query";

export interface LoginParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

export function useSupabaseLogin() {
  return useMutation({
    mutationFn: async ({ email, password }: LoginParams) => {
      const response = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      return response;
    },
  });
}

export function useSupabaseLogout() {
  return useMutation({
    mutationFn: async () => {
      const response = await supabase.auth.signOut();

      return response;
    },
  });
}

export function useSupabaseResetPassword() {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "expostarter://(auth)/reset-password",
      });

      return response;
    },
  });
}
