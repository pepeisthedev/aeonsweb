// interfaces/User.ts
export interface User {
    id?: string; // id is optional because it will be auto-generated
    created_at?: string; // created_at is optional (auto-generated)
    discord_id: string;
    username: string;
    roles: string[];
    available_votes: number;
    used_votes: number;    
    voted_on: string[]; // Array of bigint (numbers)
    aeons_holder: boolean
}

export interface DatabaseSchema {
    users: User;
}