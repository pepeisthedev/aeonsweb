import React, { useEffect, useState } from "react";
import { VoteButton } from "@/app/components/artcontest/VoteButton";

export const ImageCard = ({ submission, onVoteChange, onSubmissionClick, userData }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
            const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            setIsMobileOrTablet(hasTouch || mobileUA);
        };

        checkDevice();
        window.addEventListener("resize", checkDevice);
        return () => window.removeEventListener("resize", checkDevice);
    }, []);

    const handleFlip = () => {
        if (!isMobileOrTablet) setIsFlipped(true);
    };

    const handleUnflip = () => {
        if (!isMobileOrTablet) setIsFlipped(false);
    };

    return (
        <div
            className="relative w-full aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
            onMouseEnter={handleFlip}
            onMouseLeave={handleUnflip}
            onClick={() => onSubmissionClick(submission)} // Click only triggers modal when clicking outside VoteButton
        >
            <div className="w-full h-full transition-all duration-500 ease-in-out">
                {/* Front of the card (Image) */}
                <div className={`absolute w-full h-full transition-opacity duration-500 ${isFlipped && !isMobileOrTablet ? "opacity-0" : "opacity-100"}`}>
                    <img src={submission.imageUrl} alt={submission.title} className="w-full h-full object-cover" />

                    {/* Compact vote button and count for mobile and tablet */}
                    {isMobileOrTablet && (
                        <div className="absolute bottom-2 right-2">
                            <VoteButton onVoteChange={onVoteChange} votes={submission.votes} submissionId={submission.id} userData={userData} isMobileView={true} />
                        </div>
                    )}
                </div>

                {/* Back of the card (Info) - Only for desktop */}
                {!isMobileOrTablet && (
                    <div className={`absolute w-full h-full bg-white text-black p-4 overflow-y-auto flex flex-col justify-between transition-opacity duration-500 ${isFlipped ? "opacity-100" : "opacity-0"}`}>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">{submission.title}</h3>
                            <p className="text-sm mb-2">{submission.description}</p>
                            <p className="text-sm mb-2">Team: {submission.team_members.join(", ")}</p>
                        </div>
                        <div className="flex justify-end" onClick={(e) => e.stopPropagation() /* Stop modal from opening when voting */}>
                            <VoteButton onVoteChange={onVoteChange} votes={submission.votes} submissionId={submission.id} userData={userData} isMobileView={false} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};