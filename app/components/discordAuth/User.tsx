export interface UserData {
    username: string;
    discriminator: string;
    roles: string[];
    voted_on: string[];
    available_votes: number;
    used_votes: number;
  }