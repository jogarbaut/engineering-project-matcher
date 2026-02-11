export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          years_of_experience: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          years_of_experience?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          years_of_experience?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      teams: {
        Row: {
          id: string;
          name: string;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'teams_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      team_members: {
        Row: {
          id: string;
          team_id: string;
          user_id: string;
          role: 'owner' | 'admin' | 'member';
          joined_at: string;
        };
        Insert: {
          id?: string;
          team_id: string;
          user_id: string;
          role?: 'owner' | 'admin' | 'member';
          joined_at?: string;
        };
        Update: {
          id?: string;
          team_id?: string;
          user_id?: string;
          role?: 'owner' | 'admin' | 'member';
          joined_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'team_members_team_id_fkey';
            columns: ['team_id'];
            isOneToOne: false;
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'team_members_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      licenses: {
        Row: {
          id: string;
          name: string;
          license_type: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          license_type: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          license_type?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      user_licenses: {
        Row: {
          id: string;
          user_id: string;
          license_id: string;
          license_number: string;
          state: string;
          expiration_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          license_id: string;
          license_number: string;
          state: string;
          expiration_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          license_id?: string;
          license_number?: string;
          state?: string;
          expiration_date?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_licenses_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_licenses_license_id_fkey';
            columns: ['license_id'];
            isOneToOne: false;
            referencedRelation: 'licenses';
            referencedColumns: ['id'];
          },
        ];
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          start_date: string | null;
          end_date: string | null;
          project_value: string | null;
          client_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          project_value?: string | null;
          client_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          project_value?: string | null;
          client_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_projects: {
        Row: {
          id: string;
          user_id: string;
          project_id: string;
          role: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          project_id: string;
          role?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          project_id?: string;
          role?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_projects_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_projects_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'projects';
            referencedColumns: ['id'];
          },
        ];
      };
      rfps: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          agency_name: string | null;
          due_date: string | null;
          estimated_value: string | null;
          required_licenses: string[] | null;
          location: string | null;
          scraped_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          agency_name?: string | null;
          due_date?: string | null;
          estimated_value?: string | null;
          required_licenses?: string[] | null;
          location?: string | null;
          scraped_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          agency_name?: string | null;
          due_date?: string | null;
          estimated_value?: string | null;
          required_licenses?: string[] | null;
          location?: string | null;
          scraped_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      rfp_matches: {
        Row: {
          id: string;
          rfp_id: string;
          team_id: string | null;
          user_id: string | null;
          match_score: string | null;
          matching_criteria: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          rfp_id: string;
          team_id?: string | null;
          user_id?: string | null;
          match_score?: string | null;
          matching_criteria?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          rfp_id?: string;
          team_id?: string | null;
          user_id?: string | null;
          match_score?: string | null;
          matching_criteria?: Json | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'rfp_matches_rfp_id_fkey';
            columns: ['rfp_id'];
            isOneToOne: false;
            referencedRelation: 'rfps';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'rfp_matches_team_id_fkey';
            columns: ['team_id'];
            isOneToOne: false;
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'rfp_matches_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      team_member_role: 'owner' | 'admin' | 'member';
    };
    CompositeTypes: Record<string, never>;
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
