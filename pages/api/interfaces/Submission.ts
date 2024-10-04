export interface Submission {
  id?: string; // `id` is optional because it's auto-generated as a UUID
  created_at?: string; // Optional because it's auto-generated as a timestamp
  title: string;
  description: string;
  author: string;
  twitter_url: string;
  media_url: string;
  votes: number;
  content_type: string;
  team_members: string[];
  discord_id: string;
}
