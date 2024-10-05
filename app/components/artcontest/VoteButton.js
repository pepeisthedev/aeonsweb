import { ChevronUp, ChevronDown } from "lucide-react";
import React, { useState, useCallback } from "react";

export const VoteButton = ({ votes, onVoteChange, isMobileView = false, submissionId, userData }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState(null);

    const hasVoted = userData?.voted_on.includes(submissionId) || false;
    const votesLeft = userData?.available_votes - userData?.used_votes > 0 || false;

    const handleVoteToggle = useCallback(
        async (e) => {
            e.stopPropagation(); // Prevent click event from bubbling up to parent elements
            if (!userData || isProcessing || !votesLeft && !hasVoted) return; // Prevent action if not logged in, if a request is in progress, or no votes left

            setIsProcessing(true);
            try {
                const method = hasVoted ? "DELETE" : "POST";
                const response = await fetch("/api/vote", {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ submissionId }),
                });

                const data = await response.json();

                if (response.ok) {
                 //   setMessage(hasVoted ? "Vote revoked successfully!" : "Vote submitted successfully!");
                    onVoteChange(); // Notify parent component of vote change
                } else {
                    setMessage(`Error: ${data.message || "Failed to process request."}`);
                }
            } catch (error) {
                console.error("Error processing vote request:", error);
                setMessage("An error occurred while processing your request.");
            } finally {
                setIsProcessing(false);
            }
        },
        [userData, isProcessing, hasVoted, submissionId, onVoteChange, votesLeft]
    );

    return (
        <div onClick={(e) => e.stopPropagation() /* Stop click propagation */}>
            <div className={`flex items-center rounded-full shadow-md ${isMobileView ? "bg-white bg-opacity-70" : "bg-gray-100"}`}>
                <span className={`text-gray-800 font-semibold ${isMobileView ? "text-xs px-2" : "text-sm px-3"}`}>{votes}</span>

                {userData ? (
                    <>
                        {/* Upvote Button */}
                        <button
                            onClick={handleVoteToggle}
                            disabled={!userData || isProcessing || hasVoted || !votesLeft}
                            className={`${
                                hasVoted || !votesLeft ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-[rgb(230,164,14)] hover:bg-[rgb(194,134,0)] text-white"
                            } rounded-full transition-colors duration-200 transform hover:scale-105 ${isMobileView ? "p-1" : "p-2"}`}
                        >
                            <ChevronUp size={isMobileView ? 14 : 18} />
                        </button>

                        {/* Downvote Button */}
                        <button
                            onClick={handleVoteToggle}
                            disabled={!userData || isProcessing || !hasVoted}
                            className={`${
                                !hasVoted ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-[rgb(230,164,14)] hover:bg-[rgb(194,134,0)] text-white"
                            } rounded-full transition-colors duration-200 transform hover:scale-105 ${isMobileView ? "p-1" : "p-2"}`}
                        >
                            <ChevronDown size={isMobileView ? 14 : 18} />
                        </button>
                    </>
                ) : (
                    <span className="text-gray-600 px-3">Login to vote</span>
                )}
            </div>

            {message && <p>{message}</p>}
        </div>
    );
};
