import React, {useCallback, useEffect, useState} from "react";
import {ChevronLeft, ChevronRight, X} from "lucide-react";
import {VoteButton} from "@/app/components/artcontest/VoteButton";

export const FullResImageModal = ({ submissions, currentSubmissionId, onClose, onPrev, onNext, onVoteChange, userData }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLandscape, setIsLandscape] = useState(false);
    const currentSubmission = submissions.find(subm => subm.id === currentSubmissionId);

    useEffect(() => {
        const checkOrientation = () => {
            setIsLandscape(window.innerWidth > window.innerHeight && window.innerWidth < 900);
        };

        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        return () => window.removeEventListener('resize', checkOrientation);
    }, []);

    useEffect(() => {
        if (currentSubmission) {
            setIsLoading(true);
            const img = new Image();
            img.onload = () => setIsLoading(false);
            img.src = currentSubmission.imageUrl;
        }
    }, [currentSubmission]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'ArrowLeft') onPrev();
        else if (e.key === 'ArrowRight') onNext();
        else if (e.key === 'Escape') onClose();
    }, [onPrev, onNext, onClose]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    if (!currentSubmission) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className="mt-20 fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={handleBackdropClick}>
            <div className={`bg-white rounded-2xl shadow-xl overflow-hidden relative ${isLandscape ? 'w-[95vw] h-auto max-h-[90vh]' : 'w-[90vw] max-w-4xl'}`}>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-1 transition-colors duration-200 z-20"
                >
                    <X size={20} />
                </button>

                <div className={`flex ${isLandscape ? 'flex-row' : 'flex-col'}`}>
                    <div className={`relative ${isLandscape ? 'w-2/3' : 'w-full aspect-video'}`}>
                        {isLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                <div className="text-gray-500 text-xl">Loading...</div>
                            </div>
                        ) : (
                            <img
                                src={currentSubmission.content_url}
                                alt={currentSubmission.title}
                                className={`w-full h-full ${isLandscape ? 'object-contain' : 'object-cover'}`}
                            />
                        )}
                        <button
                            onClick={onPrev}
                            className="absolute left-2 top-1/2 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-1 transition-all duration-200 hover:scale-110 z-20"
                            style={{ transform: 'translateY(-50%)' }}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={onNext}
                            className="absolute right-2 top-1/2 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-1 transition-all duration-200 hover:scale-110 z-20"
                            style={{ transform: 'translateY(-50%)' }}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div className={`bg-white ${isLandscape ? 'w-1/3 p-4 overflow-y-auto' : 'p-6'}`}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">{currentSubmission.title}</h3>
                            <VoteButton onVoteChange={onVoteChange} votes={currentSubmission.votes} submissionId={currentSubmission.id} userData={userData}/>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{currentSubmission.description}</p>
                        <p className="text-sm text-gray-500">Team: {currentSubmission.team_members.join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};