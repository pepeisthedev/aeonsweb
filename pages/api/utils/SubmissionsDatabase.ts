// utils/SubmissionsDatabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Submission } from '../interfaces/Submission';
import { a } from 'framer-motion/client';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export enum InsertSubmissionStatus {
  Success = 'success',
  Duplicate = 'duplicate',
  Error = 'error',
}

export class SubmissionsDatabase {
  // Insert a new submission
  static async insertSubmission(submission: Submission): Promise<InsertSubmissionStatus> {
    try {
      const { error, status } = await supabase
        .from('submissions')
        .insert([submission]);

      if (error) {
        if (error.code === '23505') { // Check for unique constraint violation
          console.error('Duplicate submission error:', error.message);
          return InsertSubmissionStatus.Duplicate;
        }
        console.error('Error inserting submission:', error.message);
        return InsertSubmissionStatus.Error;
      }

      if (status === 201) {
        console.log('Submission inserted successfully');
        return InsertSubmissionStatus.Success;
      }

      return InsertSubmissionStatus.Error;
    } catch (err) {
      console.error('Unexpected error inserting submission:', err);
      return InsertSubmissionStatus.Error;
    }
  }

  // Update submission by id
  static async updateSubmissionById(
    id: string,
    updates: Partial<Submission>
  ): Promise<boolean> {
    try {
      const { error, status } = await supabase
        .from('submissions')
        .update(updates)
        .eq('discord_id', id);

      if (error || status !== 204) {
        console.error('Error updating submission:', error);
        return false;
      }

      console.log('Submission updated successfully');
      return true;
    } catch (err) {
      console.error('Unexpected error updating submission:', err);
      return false;
    }
  }

  // Read submission by id
  static async readSubmission(id: string): Promise<Submission | null> {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error reading submission:', error);
        return null;
      }

      return data ? data : null;
    } catch (err) {
      console.error('Unexpected error reading submission:', err);
      return null;
    }
  }

  static async getSubmissionsByUserId(discordId: string): Promise<Submission | null> {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('discord_id', discordId)
      .single();

    if (error) {
      console.error('Error retrieving user submission:', error);
      return null;
    }
    return data;
  }

  static async getAllSubmissions(): Promise<Submission[] | null> {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('*'); // Select all columns

      if (error) {
        console.error('Error retrieving submissions:', error);
        return null;
      }

      return data ? data : null;
    } catch (err) {
      console.error('Unexpected error retrieving submissions:', err);
      return null;
    }
  }

  static async deleteSubmissionByUserId(discordId: string): Promise<boolean> {
    const { error } = await supabase
      .from('submissions')
      .delete()
      .eq('discord_id', discordId);

    if (error) {
      console.error('Error deleting submission:', error);
      return false;
    }
    return true;
  }

  static async voteForSubmission(submissionId: string, discord_id: string): Promise<string> {
    return this.updateVoteForSubmission(submissionId, discord_id, 'vote');
  }

  static async revokeVoteForSubmission(submissionId: string, discord_id: string): Promise<string> {
    return this.updateVoteForSubmission(submissionId, discord_id, 'revoke');
  }

  static async updateVoteForSubmission(submissionId: string, discord_id: string, action: string): Promise<string> {
    const { data, error } = await supabase.rpc('handle_vote', {
      submission_id: submissionId,
      discord_user_id: discord_id,
      action: action
    });

    if (error || !data) {
      console.error('Error voting for submission:', error);
      return 'error';
    }

    // `data` will contain the return value of the function ('success', 'already_voted', or 'no_votes_left')
    return data;
  }
}
