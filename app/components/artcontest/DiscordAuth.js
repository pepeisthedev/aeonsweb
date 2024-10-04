import React, { useEffect, useState, useRef, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { UserPlus } from "lucide-react";

const DiscordAuth = ({ setUserData, userData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const isProcessingRef = useRef(false);

    const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI;

    // Redirect user to Discord OAuth
    const loginWithDiscord = () => {
        const authorizeUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify%20guilds.members.read`;
        window.location.href = authorizeUrl;
    };

    // Handle the OAuth callback by exchanging the code for a token
    const handleCallback = useCallback(async (code) => {
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
            fetchUserData();
        } catch (err) {
            console.error('Authentication failed', err);
        } finally {
            setIsLoading(false);
            isProcessingRef.current = false;
        }
    }, []);

    // Fetch the full user data (including votes)
    const fetchUserData = async () => {
        try {
            const response = await fetch(`/api/user`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userData = await response.json();
            setUserData(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUserData(null);
        }
    };

    // Check authentication status via the backend
    const checkAuthStatus = useCallback(async () => {
        try {
            const response = await fetch('/api/validatetoken', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                if (data.isAuthenticated) {
                    fetchUserData(); // Fetch additional data
                } else {
                    setUserData(null);
                }
            } else {
                setUserData(null);
            }
        } catch (error) {
            console.error('Error checking authentication status:', error);
            setUserData(null);
        }
    }, []);

    useEffect(() => {
        checkAuthStatus(); // Check authentication on mount
    }, [checkAuthStatus]);

    useEffect(() => {
        const code = searchParams.get('code');
        if (code && !isProcessingRef.current) {
            handleCallback(code); // Handle the OAuth callback if the code is present
        }
    }, [searchParams, handleCallback]);

    // Only show the login button if the user is not logged in
    if (userData) {
        return null; // If user is logged in, don't render the login button
    }

    return (
        <div className="discord-auth">
            <button
                onClick={loginWithDiscord}
                disabled={isLoading}
                className="bg-[rgb(230,164,14)] hover:bg-[rgb(194,134,0)] text-white font-bold py-2 px-4 rounded-lg flex items-center"
            >
                <UserPlus size={20} className="mr-2" />
                {isLoading ? 'Loading...' : 'Login with Discord'}
            </button>
        </div>
    );
};

const DiscordAuthWrapper = (props) => (
    <Suspense fallback={<div>Loading...</div>}>
        <DiscordAuth {...props} />
    </Suspense>
);

export default DiscordAuthWrapper;