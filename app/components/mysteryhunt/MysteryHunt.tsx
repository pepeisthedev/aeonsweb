import React, { useEffect, useState, useRef } from 'react';
import "./MysteryHunt.css";

const MysteryHunt = () => {
    const [responseStatus, setResponseStatus] = useState<number | null>(null);
    const [response, setResponse] = useState<any | null>(null); // Remove the ResponseType for now to focus on functionality
    const [error, setError] = useState<string | null>(null);
    const [twitterProfileName, setTwitterProfileName] = useState<string>('');
    const [mysteryWord, setMysteryWord] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (mysteryWord === '') {
            setResponse(null);
        }
    }, [mysteryWord]);

    const handleClick = async () => {
        if (response) {
            setResponse(null);
            setMysteryWord('');
            setTwitterProfileName('');
            setError('');
            return;
        }
        setResponse(null);

        // Validation
        if (!mysteryWord) {
            setError('Mystery word cannot be empty');
            return;
        }
        if (!twitterProfileName || !/^@.+/.test(twitterProfileName)) {
            setError('Twitter profile name must start with @');
            return;
        }

        try {
            const res = await fetch('/api/mysteryhunt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ providedSecret: mysteryWord, twitterProfile: twitterProfileName }),
            });
            const data = await res.json();
            setResponseStatus(res.status);
            setResponse(data.postLink);
            if(res.status === 200) {
                setError(null);
            } else if (res.status === 404) {
                setError('Sorry, you didn´t solve the mystery.');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred');
        }
    };

    return (
        <div className={`flex flex-col items-center justify-center h-screen mt-28`}>
            <div className={`${responseStatus === 200 ? 'fade-out' : ''}`}>
                <div className="questionbox mb-6">
                    <h1 className="text-7xl lg:text-9xl mb-8 align-center">
                        <span className="aeons-white">Myste</span>
                        <span className="aeons-yellow">ry </span>
                        <span className="aeons-white">Hu</span>
                        <span className="aeons-yellow">nt</span>
                    </h1>
                    <div className="question">
                        .- . --- -. ... / .. ... / - .... . / -.- . -.--
                    </div>
                </div>
                <div className="input-wrapper">
                    <input
                        ref={inputRef}
                        type="text"
                        value={mysteryWord}
                        onChange={(e) => {
                            setMysteryWord(e.target.value);
                            setError(null);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleClick();
                            }
                        }}
                        placeholder="Provide the answer here"
                        className="mb-4 p-2 input-wallet "
                    />
                    <input
                        ref={inputRef}
                        type="text"
                        value={twitterProfileName}
                        onChange={(e) => {
                            setTwitterProfileName(e.target.value);
                            setError(null);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleClick();
                            }
                        }}
                        placeholder="X-handle: @name"
                        className="mb-4 p-2 input-wallet "
                    />
                    <button onClick={handleClick} className="ml-3 button-style">
                        {response ? 'Clear' : 'Submit'}
                    </button>
                </div>
                {error && (
                    <div className="congrats">
                        {error}
                    </div>
                )}
            </div>
            {responseStatus === 200 && (
                <div className={`overlay fade-in`}>
                    <div className="image-container">
                        <a href={response}
                           target="_blank" rel="noopener noreferrer">
                            <img src="/mystery/aeonspeaking.webp" alt="Right Image"
                                 className="aeon-image fade-in-image"/>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MysteryHunt;