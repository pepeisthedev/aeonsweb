// utils/SupabaseUserUtil.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { User } from '../interfaces/User';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export class UserdataBase {
  // Insert a new user
  static async insertUser(user: User): Promise<boolean> {
    try {
      const { error, status } = await supabase
        .from('users')
        .insert([user]);

      if (error || status !== 201) {
        console.error('Error inserting user:', error);
        console.error('Status:', status);
        return false; // Return false if the insert failed
      }

      console.log('User inserted successfully');
      return true; // Return true if the insert succeeded
    } catch (err) {
      console.error('Unexpected error inserting user:', err);
      return false; // Return false for unexpected errors
    }
  }

  // Read user by username
  static async readUser(discord_id: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('discord_id', discord_id)
        .single(); // Use .single() to ensure only one row is returned

      if (error) {
        console.error('Error reading user:', error);
        return null; // Return null if the user was not found
      }

      return data ? data : null; // Return the user data if found
    } catch (err) {
      console.error('Unexpected error reading user:', err);
      return null; // Return null for unexpected errors
    }
  }
}
