import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import {XIcon} from "@/app/components/artcontest/Icons";

const LeaderboardRow = ({ entry, position, isExpanded, toggleExpand, isFirst, isLast }) => {
    const videoRef = useRef(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const isVideo = entry.media_url.split('?')[0].match(/\.(mp4|webm|ogg)$/i);

    useEffect(() => {
        const video = videoRef.current
        if (video) {
            video.addEventListener('loadedmetadata', () => {
                video.currentTime = 0.01 // Set to a small value to show the first frame
                setIsLoaded(true)
            })
        }
        return () => {
            if (video) {
                video.removeEventListener('loadedmetadata', () => setIsLoaded(true))
            }
        }
    }, [])
    return (
    <div 
    className={`bg-white bg-opacity-70 overflow-hidden transition-all duration-700 ease-in-out cursor-pointer
                border-b-2 border-gray-300 last:border-b-0
                ${isFirst ? 'rounded-t-lg' : ''} ${isLast ? 'rounded-b-lg' : ''}`}
    onClick={toggleExpand}
    >
    <div className={`p-4 transition-all duration-700 ease-in-out ${isExpanded ? 'pb-8' : ''}`}>
        <div className="flex items-center space-x-4">
        <div className="w-16 flex items-center justify-center font-bold text-3xl text-[rgb(230,164,14)]">
            {position}
        </div>
        <div className="flex-grow flex items-center">
            <div className="relative overflow-hidden transition-all duration-700 ease-in-out"
                style={{
                    width: isExpanded ? '25%' : '4rem',
                    paddingBottom: isExpanded ? '25%' : '4rem',
                    flexShrink: 0,
                }}>

                {isVideo ? (
                    <video
                        ref={videoRef}
                        src={entry.media_url}
                        className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-all duration-700 ease-in-out ${
                            isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        muted
                        playsInline
                        preload="metadata"
                    />
                ) : (
                    <img
                        src={entry.media_url}
                        alt={entry.title}
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-all duration-700 ease-in-out"
                    />
                )}

            </div>
            <div className="flex-grow ml-4">
                <h3 className="font-semibold text-gray-800 text-base">{entry.title}</h3>
                <p className="text-sm text-gray-600">Team: {entry.team_members.join(', ')}</p>
            <div className="mt-2 flex items-center justify-between">
                <span className="text-gray-600">Votes: {entry.votes}</span>
                <ChevronDown 
                size={20} 
                className={`text-gray-500 transition-transform duration-700 ${isExpanded ? 'transform rotate-180' : ''}`}
                />
            </div>
            <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                    style={{
                    transform: isExpanded ? 'translateY(0)' : 'translateY(-20px)',
                    }}>
                <div className="w-full">
                <h4 className="font-bold text-gray-800 mb-2">Description</h4>
                <p className="text-gray-700 mb-4 text-sm">{entry.description}</p>
                </div>
                <div className="flex justify-start items-center">
                <a 
                    href={entry.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
                    onClick={(e) => e.stopPropagation()}
                >
                    <XIcon size={20} color="white" />
                    <span>View on X</span>
                </a>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
);
};
// Leaderboard Component
const Leaderboard = ({ submissions }) => {
    const [expandedRow, setExpandedRow] = useState(null);

    const toggleExpand = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    return (
        <div className="w-full flex justify-center">
            <div className="w-full sm:w-2/3 bg-white bg-opacity-50 backdrop-blur-sm overflow-hidden rounded-lg">
                {submissions
                    .slice() // Create a shallow copy to avoid mutating the original array
                    .sort((a, b) => b.votes - a.votes) // Sort in descending order based on votes
                    .map((entry, index) => (
                    <LeaderboardRow
                        key={entry.id}
                        entry={entry}
                        position={index + 1}
                        isExpanded={expandedRow === entry.id}
                        toggleExpand={() => toggleExpand(entry.id)}
                        isFirst={index === 0}
                        isLast={index === submissions.length - 1}
                    />
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
