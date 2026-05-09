export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      aspirations: {
        Row: {
          created_at: string
          description: string
          display_order: number
          icon_name: string
          id: string
          status: string
          timeline: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          display_order?: number
          icon_name?: string
          id?: string
          status?: string
          timeline?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          icon_name?: string
          id?: string
          status?: string
          timeline?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      childhood_events: {
        Row: {
          created_at: string
          description: string
          display_order: number
          icon_name: string
          id: string
          title: string
          updated_at: string
          year: string
        }
        Insert: {
          created_at?: string
          description?: string
          display_order?: number
          icon_name?: string
          id?: string
          title: string
          updated_at?: string
          year: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          icon_name?: string
          id?: string
          title?: string
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
      contact_info: {
        Row: {
          availability_status: string | null
          availability_text: string | null
          created_at: string
          email: string | null
          id: string
          location: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          availability_status?: string | null
          availability_text?: string | null
          created_at?: string
          email?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          availability_status?: string | null
          availability_text?: string | null
          created_at?: string
          email?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
          subject: string
        }
        Insert: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
          subject?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
          subject?: string
        }
        Relationships: []
      }
      education_achievements: {
        Row: {
          count_value: string
          created_at: string
          description: string
          display_order: number
          id: string
          title: string
        }
        Insert: {
          count_value: string
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          title: string
        }
        Update: {
          count_value?: string
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          title?: string
        }
        Relationships: []
      }
      education_activities: {
        Row: {
          created_at: string
          description: string
          display_order: number
          id: string
          role: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          role?: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          role?: string
          title?: string
        }
        Relationships: []
      }
      education_entries: {
        Row: {
          created_at: string
          degree: string
          display_order: number
          highlights: Json
          icon_name: string
          id: string
          institution: string
          period: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          degree: string
          display_order?: number
          highlights?: Json
          icon_name?: string
          id?: string
          institution: string
          period: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          degree?: string
          display_order?: number
          highlights?: Json
          icon_name?: string
          id?: string
          institution?: string
          period?: string
          updated_at?: string
        }
        Relationships: []
      }
      image_versions: {
        Row: {
          created_at: string
          id: string
          image_key: string
          is_active: boolean
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_key: string
          is_active?: boolean
          url?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_key?: string
          is_active?: boolean
          url?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string
          display_order: number
          github_link: string | null
          id: string
          image_url: string | null
          live_demo_link: string | null
          tech_stack: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          display_order?: number
          github_link?: string | null
          id?: string
          image_url?: string | null
          live_demo_link?: string | null
          tech_stack?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          github_link?: string | null
          id?: string
          image_url?: string | null
          live_demo_link?: string | null
          tech_stack?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      resume_files: {
        Row: {
          created_at: string
          file_name: string
          file_type: string
          file_url: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          file_name?: string
          file_type: string
          file_url?: string
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_type?: string
          file_url?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_images: {
        Row: {
          alt_text: string | null
          created_at: string
          id: string
          image_key: string
          updated_at: string
          url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_key: string
          updated_at?: string
          url?: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_key?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          about_heading: string | null
          about_text_1: string | null
          about_text_2: string | null
          aspirations_quote: string | null
          aspirations_quote_author: string | null
          bio_long: string | null
          bio_short: string | null
          created_at: string
          current_status: string | null
          employment_status: string | null
          family_text: string | null
          first_name: string
          full_name: string
          id: string
          location: string | null
          quote_author: string | null
          quote_text: string | null
          stat_1_label: string | null
          stat_1_value: string | null
          stat_2_label: string | null
          stat_2_value: string | null
          stat_3_label: string | null
          stat_3_value: string | null
          tagline: string
          updated_at: string
          value_1: string | null
          value_1_sub: string | null
          value_2: string | null
          value_2_sub: string | null
          value_3: string | null
          value_3_sub: string | null
          vision_text: string | null
          vision_title: string | null
        }
        Insert: {
          about_heading?: string | null
          about_text_1?: string | null
          about_text_2?: string | null
          aspirations_quote?: string | null
          aspirations_quote_author?: string | null
          bio_long?: string | null
          bio_short?: string | null
          created_at?: string
          current_status?: string | null
          employment_status?: string | null
          family_text?: string | null
          first_name?: string
          full_name?: string
          id?: string
          location?: string | null
          quote_author?: string | null
          quote_text?: string | null
          stat_1_label?: string | null
          stat_1_value?: string | null
          stat_2_label?: string | null
          stat_2_value?: string | null
          stat_3_label?: string | null
          stat_3_value?: string | null
          tagline?: string
          updated_at?: string
          value_1?: string | null
          value_1_sub?: string | null
          value_2?: string | null
          value_2_sub?: string | null
          value_3?: string | null
          value_3_sub?: string | null
          vision_text?: string | null
          vision_title?: string | null
        }
        Update: {
          about_heading?: string | null
          about_text_1?: string | null
          about_text_2?: string | null
          aspirations_quote?: string | null
          aspirations_quote_author?: string | null
          bio_long?: string | null
          bio_short?: string | null
          created_at?: string
          current_status?: string | null
          employment_status?: string | null
          family_text?: string | null
          first_name?: string
          full_name?: string
          id?: string
          location?: string | null
          quote_author?: string | null
          quote_text?: string | null
          stat_1_label?: string | null
          stat_1_value?: string | null
          stat_2_label?: string | null
          stat_2_value?: string | null
          stat_3_label?: string | null
          stat_3_value?: string | null
          tagline?: string
          updated_at?: string
          value_1?: string | null
          value_1_sub?: string | null
          value_2?: string | null
          value_2_sub?: string | null
          value_3?: string | null
          value_3_sub?: string | null
          vision_text?: string | null
          vision_title?: string | null
        }
        Relationships: []
      }
      skills_creative: {
        Row: {
          created_at: string
          description: string
          display_order: number
          icon_name: string
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string
          display_order?: number
          icon_name?: string
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          icon_name?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      skills_technical: {
        Row: {
          created_at: string
          display_order: number
          id: string
          level: number
          name: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          level?: number
          name: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          level?: number
          name?: string
        }
        Relationships: []
      }
      social_links: {
        Row: {
          created_at: string
          display_order: number
          handle: string | null
          icon_name: string
          id: string
          platform: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          handle?: string | null
          icon_name?: string
          id?: string
          platform: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          display_order?: number
          handle?: string | null
          icon_name?: string
          id?: string
          platform?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      theme_settings: {
        Row: {
          accent_color: string
          background_color: string
          created_at: string
          font_body: string
          font_display: string
          foreground_color: string
          heading_color: string
          id: string
          primary_color: string
          secondary_color: string
          text_color: string
          updated_at: string
        }
        Insert: {
          accent_color?: string
          background_color?: string
          created_at?: string
          font_body?: string
          font_display?: string
          foreground_color?: string
          heading_color?: string
          id?: string
          primary_color?: string
          secondary_color?: string
          text_color?: string
          updated_at?: string
        }
        Update: {
          accent_color?: string
          background_color?: string
          created_at?: string
          font_body?: string
          font_display?: string
          foreground_color?: string
          heading_color?: string
          id?: string
          primary_color?: string
          secondary_color?: string
          text_color?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
