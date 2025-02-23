import type { Database, TablesUpdate } from "@/database.types";
import { supabase } from "@/services/supabase";
import { useMutation } from "@tanstack/react-query";
import type { Count } from "./useSupabaseInsertMutation";

export function useSupabaseUpdateMutation<T>(
  tableName: keyof Database["public"]["Tables"],
) {
  return useMutation({
    mutationFn: async ({ updatedData, options }: {
      updatedData: TablesUpdate<typeof tableName>, options: {
        count?: Count,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        eq?: { column: string; value: any };
        gt?: { column: string; value: string | number | boolean | null };
        lt?: { column: string; value: string | number | boolean | null };
        gte?: { column: string; value: string | number | boolean | null };
        lte?: { column: string; value: string | number | boolean | null };
        like?: { column: string; value: string };
        ilike?: { column: string; value: string };
        is?: { column: string; value: boolean };
        in?: { column: string; values: string[] | number[] | boolean[] | null[] };
        neq?: { column: string; value: string | number | boolean | null };
      }
    }) => {
      let query = supabase
        .from(tableName)
        .update(updatedData)

      if (options?.eq && options?.eq !== undefined) {
        query = query.eq(options.eq.column, options.eq.value);
      }

      if (options?.gt && options?.gt !== undefined) {
        query = query.gt(options.gt.column, options.gt.value);
      }

      if (options?.lt && options?.lt !== undefined) {
        query = query.lt(options.lt.column, options.lt.value);
      }

      if (options?.gte && options?.gte !== undefined) {
        query = query.gte(options.gte.column, options.gte.value);
      }

      if (options?.lte && options?.lte !== undefined) {
        query = query.lte(options.lte.column, options.lte.value);
      }

      if (options?.like && options?.like !== undefined) {
        query = query.like(options.like.column, options.like.value);
      }

      if (options?.ilike && options?.ilike !== undefined) {
        query = query.ilike(options.ilike.column, options.ilike.value);
      }

      if (options?.is && options?.is !== undefined) {
        query = query.is(options.is.column, options.is.value);
      }

      if (options?.in && options?.in !== undefined) {
        query = query.in(options.in.column, options.in.values);
      }

      if (options?.neq && options?.neq !== undefined) {
        query = query.neq(options.neq.column, options.neq.value);
      }

      const { data, error } = await query.select();

      if (error) throw error;
      return data as T;
    },
  });
}
