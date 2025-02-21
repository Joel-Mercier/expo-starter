import { supabase } from "@/services/supabase";
import { useQuery } from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";

export function useSupabaseQuery<T>(
  key: QueryKey,
  tableName: string,
  options?: {
    limit?: number;
    column?: string;
    value?: any;
    select?: string;
  },
) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      let query = supabase.from(tableName).select(options?.select || "*");

      if (options?.column && options?.value !== undefined) {
        query = query.eq(options.column, options.value);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as T;
    },
  });
}
