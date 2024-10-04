import React from 'react';

const UserStatus = ({ userData }) => {
    if (!userData) {
        return null;
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
