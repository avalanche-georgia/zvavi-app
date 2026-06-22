export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.1'
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      avalanche_problems: {
        Row: {
          aspects: Json | null
          avalanche_size: number | null
          confidence: Database['public']['Enums']['confidence'] | null
          created_at: string
          description: string | null
          distribution: Database['public']['Enums']['distribution'] | null
          forecast_id: number
          id: number
          is_all_day: boolean
          order: number
          sensitivity: Database['public']['Enums']['sensitivity'] | null
          time_of_day: Json | null
          trend: Database['public']['Enums']['trend'] | null
          type: Database['public']['Enums']['avalanche_type']
        }
        Insert: {
          aspects?: Json | null
          avalanche_size?: number | null
          confidence?: Database['public']['Enums']['confidence'] | null
          created_at?: string
          description?: string | null
          distribution?: Database['public']['Enums']['distribution'] | null
          forecast_id: number
          id?: number
          is_all_day?: boolean
          order?: number
          sensitivity?: Database['public']['Enums']['sensitivity'] | null
          time_of_day?: Json | null
          trend?: Database['public']['Enums']['trend'] | null
          type: Database['public']['Enums']['avalanche_type']
        }
        Update: {
          aspects?: Json | null
          avalanche_size?: number | null
          confidence?: Database['public']['Enums']['confidence'] | null
          created_at?: string
          description?: string | null
          distribution?: Database['public']['Enums']['distribution'] | null
          forecast_id?: number
          id?: number
          is_all_day?: boolean
          order?: number
          sensitivity?: Database['public']['Enums']['sensitivity'] | null
          time_of_day?: Json | null
          trend?: Database['public']['Enums']['trend'] | null
          type?: Database['public']['Enums']['avalanche_type']
        }
        Relationships: [
          {
            foreignKeyName: 'avalanche_problems_forecast_id_fkey'
            columns: ['forecast_id']
            isOneToOne: false
            referencedRelation: 'forecasts'
            referencedColumns: ['id']
          },
        ]
      }
      avalanche_translations: {
        Row: {
          avalanche_id: number
          created_at: string | null
          description: string | null
          id: number
          locale: string
          updated_at: string | null
        }
        Insert: {
          avalanche_id: number
          created_at?: string | null
          description?: string | null
          id?: number
          locale: string
          updated_at?: string | null
        }
        Update: {
          avalanche_id?: number
          created_at?: string | null
          description?: string | null
          id?: number
          locale?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'avalanche_translations_avalanche_id_fkey'
            columns: ['avalanche_id']
            isOneToOne: false
            referencedRelation: 'recent_avalanches'
            referencedColumns: ['id']
          },
        ]
      }
      forecast_avalanche: {
        Row: {
          avalanche_id: number
          forecast_id: number
        }
        Insert: {
          avalanche_id: number
          forecast_id: number
        }
        Update: {
          avalanche_id?: number
          forecast_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'forecast_avalanche_avalanche_id_fkey'
            columns: ['avalanche_id']
            isOneToOne: false
            referencedRelation: 'recent_avalanches'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'forecast_avalanche_forecast_id_fkey'
            columns: ['forecast_id']
            isOneToOne: false
            referencedRelation: 'forecasts'
            referencedColumns: ['id']
          },
        ]
      }
      forecast_translations: {
        Row: {
          additional_hazards: string | null
          created_at: string | null
          forecast_id: number
          id: number
          locale: string
          snowpack: string | null
          summary: string | null
          updated_at: string | null
          weather: string | null
        }
        Insert: {
          additional_hazards?: string | null
          created_at?: string | null
          forecast_id: number
          id?: number
          locale: string
          snowpack?: string | null
          summary?: string | null
          updated_at?: string | null
          weather?: string | null
        }
        Update: {
          additional_hazards?: string | null
          created_at?: string | null
          forecast_id?: number
          id?: number
          locale?: string
          snowpack?: string | null
          summary?: string | null
          updated_at?: string | null
          weather?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'forecast_translations_forecast_id_fkey'
            columns: ['forecast_id']
            isOneToOne: false
            referencedRelation: 'forecasts'
            referencedColumns: ['id']
          },
        ]
      }
      forecasts: {
        Row: {
          additional_hazards: string | null
          created_at: string
          forecaster: string | null
          hazard_levels: Json
          id: number
          published_at: string | null
          region_id: Database['public']['Enums']['region_id'] | null
          snow_condition: Database['public']['Enums']['snow_condition']
          snowpack: string | null
          status: Database['public']['Enums']['forecast_status'] | null
          summary: string | null
          valid_until: string | null
          weather: string | null
        }
        Insert: {
          additional_hazards?: string | null
          created_at?: string
          forecaster?: string | null
          hazard_levels?: Json
          id?: number
          published_at?: string | null
          region_id?: Database['public']['Enums']['region_id'] | null
          snow_condition?: Database['public']['Enums']['snow_condition']
          snowpack?: string | null
          status?: Database['public']['Enums']['forecast_status'] | null
          summary?: string | null
          valid_until?: string | null
          weather?: string | null
        }
        Update: {
          additional_hazards?: string | null
          created_at?: string
          forecaster?: string | null
          hazard_levels?: Json
          id?: number
          published_at?: string | null
          region_id?: Database['public']['Enums']['region_id'] | null
          snow_condition?: Database['public']['Enums']['snow_condition']
          snowpack?: string | null
          status?: Database['public']['Enums']['forecast_status'] | null
          summary?: string | null
          valid_until?: string | null
          weather?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'forecasts_region_id_fkey'
            columns: ['region_id']
            isOneToOne: false
            referencedRelation: 'regions'
            referencedColumns: ['id']
          },
        ]
      }
      member_applications: {
        Row: {
          address: string | null
          age: number | null
          created_at: string
          email: string
          first_name: string
          gender: string | null
          id: string
          last_name: string
          member_id: string | null
          motivation: string | null
          occupation: string | null
          payment_method: string
          phone: string
          status: string
        }
        Insert: {
          address?: string | null
          age?: number | null
          created_at?: string
          email: string
          first_name: string
          gender?: string | null
          id?: string
          last_name: string
          member_id?: string | null
          motivation?: string | null
          occupation?: string | null
          payment_method: string
          phone: string
          status?: string
        }
        Update: {
          address?: string | null
          age?: number | null
          created_at?: string
          email?: string
          first_name?: string
          gender?: string | null
          id?: string
          last_name?: string
          member_id?: string | null
          motivation?: string | null
          occupation?: string | null
          payment_method?: string
          phone?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: 'member_applications_member_id_fkey'
            columns: ['member_id']
            isOneToOne: false
            referencedRelation: 'members'
            referencedColumns: ['id']
          },
        ]
      }
      member_verifications: {
        Row: {
          id: string
          ip_address: unknown
          member_id: string
          user_agent: string | null
          verified_at: string
        }
        Insert: {
          id?: string
          ip_address?: unknown
          member_id: string
          user_agent?: string | null
          verified_at?: string
        }
        Update: {
          id?: string
          ip_address?: unknown
          member_id?: string
          user_agent?: string | null
          verified_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'member_verifications_member_id_fkey'
            columns: ['member_id']
            isOneToOne: false
            referencedRelation: 'members'
            referencedColumns: ['id']
          },
        ]
      }
      members: {
        Row: {
          auth_user_id: string | null
          created_at: string
          email: string | null
          expires_at: string | null
          first_name: string
          id: string
          joined_at: string
          last_name: string
          member_id: string
          notes: string | null
          phone: string | null
          status: Database['public']['Enums']['member_status']
          updated_at: string
          verification_code: string
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string
          email?: string | null
          expires_at?: string | null
          first_name: string
          id?: string
          joined_at?: string
          last_name: string
          member_id: string
          notes?: string | null
          phone?: string | null
          status?: Database['public']['Enums']['member_status']
          updated_at?: string
          verification_code: string
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string
          email?: string | null
          expires_at?: string | null
          first_name?: string
          id?: string
          joined_at?: string
          last_name?: string
          member_id?: string
          notes?: string | null
          phone?: string | null
          status?: Database['public']['Enums']['member_status']
          updated_at?: string
          verification_code?: string
        }
        Relationships: []
      }
      partners: {
        Row: {
          benefit_en: string | null
          benefit_ka: string | null
          created_at: string | null
          description_en: string | null
          description_ka: string | null
          id: string
          is_active: boolean
          logo_url: string
          name_en: string
          name_ka: string | null
          tier: number
          updated_at: string | null
          website_url: string
        }
        Insert: {
          benefit_en?: string | null
          benefit_ka?: string | null
          created_at?: string | null
          description_en?: string | null
          description_ka?: string | null
          id?: string
          is_active?: boolean
          logo_url: string
          name_en: string
          name_ka?: string | null
          tier?: number
          updated_at?: string | null
          website_url: string
        }
        Update: {
          benefit_en?: string | null
          benefit_ka?: string | null
          created_at?: string | null
          description_en?: string | null
          description_ka?: string | null
          id?: string
          is_active?: boolean
          logo_url?: string
          name_en?: string
          name_ka?: string | null
          tier?: number
          updated_at?: string | null
          website_url?: string
        }
        Relationships: []
      }
      problem_translations: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          locale: string
          problem_id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          locale: string
          problem_id: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          locale?: string
          problem_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'problem_translations_problem_id_fkey'
            columns: ['problem_id']
            isOneToOne: false
            referencedRelation: 'avalanche_problems'
            referencedColumns: ['id']
          },
        ]
      }
      recent_avalanches: {
        Row: {
          aspects: Json | null
          created_at: string
          date: string | null
          description: string | null
          id: number
          involvement: string | null
          is_date_unknown: boolean
          latitude: number | null
          location: string | null
          longitude: number | null
          quantity: number
          region_id: Database['public']['Enums']['region_id'] | null
          size: number
          slab_depth: number | null
          trigger: Database['public']['Enums']['avalanche_trigger']
          type: Database['public']['Enums']['avalanche_type']
          width: number | null
        }
        Insert: {
          aspects?: Json | null
          created_at?: string
          date?: string | null
          description?: string | null
          id?: number
          involvement?: string | null
          is_date_unknown?: boolean
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          quantity: number
          region_id?: Database['public']['Enums']['region_id'] | null
          size: number
          slab_depth?: number | null
          trigger: Database['public']['Enums']['avalanche_trigger']
          type: Database['public']['Enums']['avalanche_type']
          width?: number | null
        }
        Update: {
          aspects?: Json | null
          created_at?: string
          date?: string | null
          description?: string | null
          id?: number
          involvement?: string | null
          is_date_unknown?: boolean
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          quantity?: number
          region_id?: Database['public']['Enums']['region_id'] | null
          size?: number
          slab_depth?: number | null
          trigger?: Database['public']['Enums']['avalanche_trigger']
          type?: Database['public']['Enums']['avalanche_type']
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'recent_avalanches_region_id_fkey'
            columns: ['region_id']
            isOneToOne: false
            referencedRelation: 'regions'
            referencedColumns: ['id']
          },
        ]
      }
      regions: {
        Row: {
          created_at: string
          default_zoom: number | null
          display_order: number
          forecast_zone: Json | null
          id: Database['public']['Enums']['region_id']
          is_active: boolean
          map_center: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          default_zoom?: number | null
          display_order?: number
          forecast_zone?: Json | null
          id: Database['public']['Enums']['region_id']
          is_active?: boolean
          map_center?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          default_zoom?: number | null
          display_order?: number
          forecast_zone?: Json | null
          id?: Database['public']['Enums']['region_id']
          is_active?: boolean
          map_center?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      suspicious_requests: {
        Row: {
          city: string | null
          country: string | null
          created_at: string | null
          id: string
          ip_address: string | null
          path: string
          referer: string | null
          user_agent: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          path: string
          referer?: string | null
          user_agent?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          path?: string
          referer?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          about: string | null
          avatar_url: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          role: Database['public']['Enums']['user_role']
        }
        Insert: {
          about?: string | null
          avatar_url?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: Database['public']['Enums']['user_role']
        }
        Update: {
          about?: string | null
          avatar_url?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: Database['public']['Enums']['user_role']
        }
        Relationships: []
      }
      weather_stations: {
        Row: {
          created_at: string | null
          id: string
          name_en: string
          name_ka: string | null
          sort_order: number | null
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name_en: string
          name_ka?: string | null
          sort_order?: number | null
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name_en?: string
          name_ka?: string | null
          sort_order?: number | null
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fetch_combined_forecast_data: { Args: never; Returns: Json }
      get_latest_published_forecast_with_related: { Args: never; Returns: Json }
      reorder_weather_stations: { Args: { updates: Json }; Returns: undefined }
      submit_member_application: {
        Args: {
          p_address?: string
          p_age?: number
          p_email: string
          p_first_name: string
          p_gender?: string
          p_last_name: string
          p_motivation?: string
          p_occupation?: string
          p_payment_method: string
          p_phone: string
        }
        Returns: Json
      }
      verify_member: {
        Args: { client_ip?: unknown; client_user_agent?: string; code: string }
        Returns: Json
      }
    }
    Enums: {
      avalanche_trigger:
        | 'natural'
        | 'riderAccidental'
        | 'riderCut'
        | 'explosives'
        | 'vehicle'
        | 'unknown'
      avalanche_type:
        | 'cornice'
        | 'deepSlab'
        | 'glide'
        | 'looseDry'
        | 'looseWet'
        | 'persistentSlab'
        | 'stormSlab'
        | 'wetSlab'
        | 'windSlab'
        | 'unknown'
      confidence: 'high' | 'low' | 'moderate'
      distribution: 'isolated' | 'specific' | 'widespread'
      forecast_status: 'draft' | 'published'
      hazard_level: '1' | '2' | '3' | '4' | '5'
      member_status: 'active' | 'inactive' | 'suspended' | 'expired' | 'pending'
      region_id: 'gudauri'
      sensitivity: 'reactive' | 'stubborn' | 'touchy' | 'unreactive'
      snow_condition: 'dry' | 'wet'
      trend: 'deteriorating' | 'improving' | 'noChange'
      user_role: 'admin' | 'forecaster' | 'trainee'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      avalanche_trigger: [
        'natural',
        'riderAccidental',
        'riderCut',
        'explosives',
        'vehicle',
        'unknown',
      ],
      avalanche_type: [
        'cornice',
        'deepSlab',
        'glide',
        'looseDry',
        'looseWet',
        'persistentSlab',
        'stormSlab',
        'wetSlab',
        'windSlab',
        'unknown',
      ],
      confidence: ['high', 'low', 'moderate'],
      distribution: ['isolated', 'specific', 'widespread'],
      forecast_status: ['draft', 'published'],
      hazard_level: ['1', '2', '3', '4', '5'],
      member_status: ['active', 'inactive', 'suspended', 'expired', 'pending'],
      region_id: ['gudauri'],
      sensitivity: ['reactive', 'stubborn', 'touchy', 'unreactive'],
      snow_condition: ['dry', 'wet'],
      trend: ['deteriorating', 'improving', 'noChange'],
      user_role: ['admin', 'forecaster', 'trainee'],
    },
  },
} as const
