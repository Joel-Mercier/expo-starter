import { useQuery, useMutation } from '@tanstack/react-query'
import type { QueryKey } from '@tanstack/react-query'
import { supabase } from '@/services/supabase'

// Example hook for fetching data
export function useSupabaseQuery<T>(
  key: QueryKey,
  tableName: string,
  options?: {
    column?: string
    value?: any
    select?: string
  }
) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      let query = supabase.from(tableName).select(options?.select || '*')
      
      if (options?.column && options?.value !== undefined) {
        query = query.eq(options.column, options.value)
      }
      
      const { data, error } = await query
      
      if (error) throw error
      return data as T
    },
  })
}

// Example hook for mutations
export function useSupabaseMutation<T>(
  tableName: string,
  options?: {
    onSuccess?: () => void
  }
) {
  return useMutation({
    mutationFn: async (newData: Partial<T>) => {
      const { data, error } = await supabase
        .from(tableName)
        .insert(newData)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: options?.onSuccess,
  })
}