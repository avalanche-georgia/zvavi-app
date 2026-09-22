import type { Database } from './database.types'

type CamelCaseKey<S extends string> = S extends `${infer Head}_${infer Tail}`
  ? `${Head}${Capitalize<CamelCaseKey<Tail>>}`
  : S

type CamelCase<T> = {
  [K in keyof T as CamelCaseKey<string & K>]: T[K]
}

/** Raw snake_case DB row — used internally for typed conversion helpers. */
export type DbRow<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

/** camelCase DB row — use in domain types and hooks. */
export type Tables<T extends keyof Database['public']['Tables']> = CamelCase<
  Database['public']['Tables'][T]['Row']
>

export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
