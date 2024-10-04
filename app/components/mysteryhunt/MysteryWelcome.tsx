import React, { useEffect, useRef, useState } from 'react';
import './MysteryHunt.css';
import './MysteryWelcome.css';
import { FaPlay, FaStop } from "react-icons/fa";

function MysteryHunt() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleMysteryClick = () => {
        setModalVisible(true);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && modalRef.current instanceof HTMLElement && !modalRef.current.contains(event.target as Node)) {
            setModalVisible(false);
        }
    };

    const handlePlayClick = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (isModalVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalVisible]);

    return (
        <div className={`flex flex-col items-center justify-center h-screen mt-28`}>
            <div className="shadow-textbox">
                <h1 className="text-3xl lg:text-5xl mb-8 align-center">
                    <span className="aeons-white">Greetings, brave explor</span>
                    <span className="aeons-yellow">er</span>
                    <span className="aeons-white">!</span>
                </h1>
                <span className="text-font">
                   Your journey begins here. Sometimes, the most crucial clues are hidden in plain sight. Have you ever questioned your curiosity?
                </span>
                <span className="text-font" onClick={handleMysteryClick}>?</span>
                <br/>
                <br/>
                <span className="text-font">
                    When you have traveled through the clues and found the answer, go to&nbsp;
                    <a href="/mysteryhunt" className="text-link underline aeons-orange">this page</a>
                    &nbsp;to submit it.
                </span>


                {/* Modal Component */}
                {isModalVisible && (
                    <div className="modal" ref={modalRef}>
                        <div className="modal-content">
                            <p className="mb-2">51c18098f8f0a51cb8728d16e83f130d91b9a4f5324527dce5c7a2bef2df7dd3i0</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MysteryHunt;