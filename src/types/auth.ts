import type { User } from '@supabase/supabase-js';
import type { Tables } from './database';

export type UserProfile = Tables<'users'>;

export type AuthUser = User;

export type CurrentUser = UserProfile;
