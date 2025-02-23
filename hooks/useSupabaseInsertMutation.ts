import type { Database, TablesInsert } from "@/database.types";
import { supabase } from "@/services/supabase";
import { useMutation } from "@tanstack/react-query";

export enum Count {
  EXACT = "exact",
  PLANNED = "planned",
  ESTIMATED = "estimated",
}

export function useSupabaseInsertMutation<T>(
  tableName: keyof Database["public"]["Tables"],
) {
  return useMutation({
    mutationFn: async (newData: TablesInsert<typeof tableName>, options?: { count?: Count }) => {
      const { data, error } = await supabase
        .from(tableName)
        .insert(newData, options)
        .select();

      if (error) throw error;
      return data as T;
    },
  });
}
