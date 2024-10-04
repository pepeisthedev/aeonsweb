'use client'
// pages/index.tsx or SubmissionsPage.tsx
import React, { useState } from 'react';
import DiscordAuth from '../components/discordAuth/DiscordAuth';
import UserStatus from '../components/discordAuth/UserStatus';
import {SubmissionForm} from '@/app/components/artcontest_OLD/SubmissionForm';
import SubmissionsGrid from '@/app/components/artcontest_OLD/SubmissionsGrid';
import { UserData } from "../components/discordAuth/User";

const HomePage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const refreshUserData = async () => {
    if (userData) {
      try {
        const response = await fetch(`/api/user`);
        if (response.ok) {
          const updatedUserData = await response.json();
          setUserData(updatedUserData);  // Update the state with refreshed data
        }
      } catch (error) {
        console.error('Failed to refresh user data:', error);
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl mb-4">Submissions</h1>
      
      {/* Discord Login Component */}
      <DiscordAuth onAuthChange={setUserData} userData={userData} />
      <UserStatus userData={userData} />

      {/* Pass auth state to the submissions form and grid */}
      <SubmissionForm isLoggedIn={!!userData} />
      <SubmissionsGrid userData={userData} onVoteChange={refreshUserData} />
    </div>
  );
};

export default HomePage;
