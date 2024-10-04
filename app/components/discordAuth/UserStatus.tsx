import React from 'react';
import { UserData } from './User';  // Ensure that this path is correct for your UserData interface

interface UserStatusProps {
  userData: UserData | null;  // Receive the user data as a prop
}

const UserStatus: React.FC<UserStatusProps> = ({ userData }) => {
  if (!userData) {
    return null; // Don't display anything if there's no user data
  }

  return (
    <div className="user-info">
      <p className="text-2xl">Welcome, {userData.username}</p>
      <p className="text-xl">Available Votes: {userData.available_votes}</p>
      <p className="text-xl">Votes Left: {userData.available_votes - userData.used_votes}</p>
    </div>
  );
};

export default UserStatus;
