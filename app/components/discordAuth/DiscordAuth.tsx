import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import './DiscordAuth.css';
import { UserData } from "./User";

interface DiscordAuthProps {
  onAuthChange: (user: UserData | null) => void;
  userData: UserData | null; // Add userData prop to track if the user is logged in
}

const DiscordAuth = ({ onAuthChange, userData }: DiscordAuthProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const isProcessingRef = useRef(false);

  const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI!;

  // Redirect user to Discord OAuth
  const loginWithDiscord = () => {
    const authorizeUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify%20guilds.members.read`;
    window.location.href = authorizeUrl;
  };

  // Handle the OAuth callback by exchanging the code for a token
  const handleCallback = async (code: string) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    setIsLoading(true);

    try {
      const response = await fetch('/api/discordauthentication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }

      const data = await response.json();
      fetchUserData(data.discord_id);
    } catch (err) {
      console.error('Authentication failed', err);
    } finally {
      setIsLoading(false);
      isProcessingRef.current = false;
    }
  };

  // Fetch the full user data (including votes)
  const fetchUserData = async (discordId: string) => {
    try {
      const response = await fetch(`/api/user?discord_id=${discordId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData: UserData = await response.json();
      onAuthChange(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      onAuthChange(null);
    }
  };

  // Check authentication status via the backend
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/validatetoken', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.isAuthenticated) {
          fetchUserData(data.user.discord_id); // Fetch additional data
        } else {
          onAuthChange(null);
        }
      } else {
        onAuthChange(null);
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
      onAuthChange(null);
    }
  };

  useEffect(() => {
    checkAuthStatus(); // Check authentication on mount
  }, []);

  useEffect(() => {
    const code = searchParams!!.get('code');
    if (code && !isProcessingRef.current) {
      handleCallback(code); // Handle the OAuth callback if the code is present
    }
  }, [searchParams]);

  // Only show the login button if the user is not logged in
  if (userData) {
    return null; // If user is logged in, don't render the login button
  }

  return (
    <div className="discord-auth">
      <button
        onClick={loginWithDiscord}
        className="bg-[#7289da] text-white px-4 py-2 rounded hover:bg-[#5f73bc] transition-colors"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Login with Discord'}
      </button>
    </div>
  );
}

const DiscordAuthWrapper = (props: DiscordAuthProps) => (
  <Suspense fallback={<div>Loading...</div>}>
    <DiscordAuth {...props} />
  </Suspense>
);

export default DiscordAuthWrapper;
