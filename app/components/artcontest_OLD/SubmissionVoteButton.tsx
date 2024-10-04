import React, { useState } from 'react';
import { UserData } from '../discordAuth/User';  // Import the `UserData` interface

interface SubmissionVoteButtonProps {
  submissionId: string;   // ID of the submission to vote/revoke on
  userData: UserData | null;  // Complete user object or `null` if not logged in
  onVoteChange: () => void; // Callback to notify parent component when the vote changes
}

const SubmissionVoteButton: React.FC<SubmissionVoteButtonProps> = ({ submissionId, userData, onVoteChange }) => {
  const [isProcessing, setIsProcessing] = useState(false);      // Track if the request is being processed
  const [message, setMessage] = useState<string | null>(null);  // Store any success or error messages

  // Check if the user has already voted on this submission
  const hasVoted = userData?.voted_on.includes(submissionId) || false;

  const handleVoteToggle = async () => {
    if (!userData || isProcessing) return;  // Prevent action if not logged in or if a request is in progress

    setIsProcessing(true);
    try {
      // Determine the request method based on the current vote state
      const method = hasVoted ? 'DELETE' : 'POST';
      const response = await fetch('/api/vote', {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ submissionId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(hasVoted ? 'Vote revoked successfully!' : 'Vote submitted successfully!');
        onVoteChange(); // Notify parent component of vote change
      } else {
        setMessage(`Error: ${data.message || 'Failed to process request.'}`);
      }
    } catch (error) {
      console.error('Error processing vote request:', error);
      setMessage('An error occurred while processing your request.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Determine button label and styling based on voting state
  const buttonLabel = userData
    ? isProcessing
      ? 'Processing...'
      : hasVoted
      ? 'Revoke Vote'
      : 'Vote'
    : 'Login to Vote';

  const buttonClass = !userData
    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
    : hasVoted
    ? 'bg-red-500 text-white hover:bg-red-600'
    : 'bg-green-500 text-white hover:bg-green-600';

  return (
    <div>
      <button
        onClick={handleVoteToggle}
        disabled={!userData || isProcessing}  // Disable if not logged in or if a request is in progress
        className={`p-2 rounded ${buttonClass} ${isProcessing ? 'opacity-50' : ''}`}
      >
        {buttonLabel}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SubmissionVoteButton;
