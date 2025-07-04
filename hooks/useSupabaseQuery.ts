import type { Database } from "@/database.types";
import { supabase } from "@/services/supabase";
import { useQuery } from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";

export function useSupabaseQuery<T>(
  key: QueryKey,
  tableName: keyof Database["public"]["Tables"],
  options?: {
    limit?: number;
    select?: string;
    order?: {
      column: string;
      ascending?: boolean;
      nullsFirst?: boolean;
      referencedTable?: string;
    };
    range?: { from: number; to: number };
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
  },
) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      let query = supabase.from(tableName).select(options?.select || "*");

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

      if (options?.limit && options?.limit !== undefined) {
        query = query.limit(options.limit);
      }

      if (options?.order && options?.order !== undefined) {
        query = query.order(options.order.column, {
          ascending: options.order.ascending,
          nullsFirst: options.order.nullsFirst,
          referencedTable: options.order.referencedTable,
        });
      }

      if (options?.range && options?.range !== undefined) {
        query = query.range(options.range.from, options.range.to);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as T;
    },
  });
}
