import React, { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { VoteButton } from "@/app/components/artcontest/VoteButton";

export const FullResImageModal = ({
                                      submissions,
                                      currentSubmissionId,
                                      onClose,
                                      onPrev,
                                      onNext,
                                      onVoteChange,
                                      userData,
                                  }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const videoRef = useRef(null)
    const currentSubmission = submissions.find((subm) => subm.id === currentSubmissionId)

    const isVideo = currentSubmission?.media_url.split('?')[0].match(/\.(mp4|webm|ogg)$/i)

    useEffect(() => {
        if (currentSubmission) {
            setIsLoading(true)
            setIsPlaying(false)

            if (isVideo) {
                const video = document.createElement('video')
                video.src = currentSubmission.media_url
                video.onloadeddata = () => setIsLoading(false)
            } else {
                const img = new Image()
                img.onload = () => setIsLoading(false)
                img.src = currentSubmission.media_url
            }
        }
    }, [currentSubmission, isVideo])

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'ArrowLeft') onPrev()
            else if (e.key === 'ArrowRight') onNext()
            else if (e.key === 'Escape') onClose()
        },
        [onPrev, onNext, onClose]
    )

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    if (!currentSubmission) return null

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose()
    }

    const handlePlayClick = () => {
        setIsPlaying(true)
        if (videoRef.current) {
            videoRef.current.play()
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative w-full max-w-4xl max-h-[90vh] flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-1 transition-colors duration-200 z-20"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col md:flex-row h-full">
                    <div className="relative w-full md:w-2/3 h-[50vh] md:h-[80vh] flex-shrink-0">
                        {isLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                <div className="text-gray-500 text-xl">Loading...</div>
                            </div>
                        ) : isVideo ? (
                            <div className="relative w-full h-full">
                                <video
                                    ref={videoRef}
                                    src={currentSubmission.media_url}
                                    className="w-full h-full object-contain p-2"
                                    muted
                                    controls={isPlaying}
                                    autoPlay={isPlaying}
                                />
                                {!isPlaying && (
                                    <button
                                        onClick={handlePlayClick}
                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl"
                                    >
                                        ▶
                                    </button>
                                )}
                            </div>
                        ) : (
                            <img
                                src={currentSubmission.media_url}
                                alt={currentSubmission.title}
                                className="w-full h-full object-contain p-2"
                            />
                        )}
                        <button
                            onClick={onPrev}
                            className="absolute left-2 top-1/2 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-1 transition-all duration-200 hover:scale-110 z-20"
                            style={{transform: 'translateY(-50%)'}}
                        >
                            <ChevronLeft size={20}/>
                        </button>
                        <button
                            onClick={onNext}
                            className="absolute right-2 top-1/2 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-1 transition-all duration-200 hover:scale-110 z-20"
                            style={{transform: 'translateY(-50%)'}}
                        >
                            <ChevronRight size={20}/>
                        </button>
                    </div>

                    <div className="bg-white p-4 md:w-1/3 flex items-center justify-center">
                        <div className="w-full"> {/* Container to keep rows stacked */}
                            <div className="mb-4 flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-gray-800">{currentSubmission.title}</h3>
                                <VoteButton
                                    onVoteChange={onVoteChange}
                                    votes={currentSubmission.votes}
                                    submissionId={currentSubmission.id}
                                    userData={userData}
                                />
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{currentSubmission.description}</p>
                            <p className="text-sm text-gray-500">Team: {currentSubmission.team_members.join(', ')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}