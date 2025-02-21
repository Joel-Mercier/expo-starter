import { supabase } from "@/services/supabase";
import { useMutation } from "@tanstack/react-query";

export function useSupabaseMutation<T>(
  tableName: string,
  options?: {
    onSuccess?: () => void;
  },
) {
  return useMutation({
    mutationFn: async (newData: Partial<T>) => {
      const { data, error } = await supabase
        .from(tableName)
        .insert(newData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: options?.onSuccess,
  });
}
