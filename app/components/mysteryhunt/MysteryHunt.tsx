import React, { useState, useEffect } from 'react';

const MysteryHunt: React.FC = () => {
    const [showSubmission, setShowSubmission] = useState<boolean>(false);
    const [answer, setAnswer] = useState<string>('');
    const [twitterUsername, setTwitterUsername] = useState<string>('');
    const [showFullImage, setShowFullImage] = useState<boolean>(false);
    const [isImageHovered, setIsImageHovered] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [responseStatus, setResponseStatus] = useState<number | null>(null);
    const [response, setResponse] = useState<string | null>(null);
    const [displayedMessage, setDisplayedMessage] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
    const [hasSucceeded, setHasSucceeded] = useState<boolean>(false);

    const mainColor = '#e6a40e';
    const darkMainColor = '#f0b21c';
    const darkWhiteColor = '#ffffff';

    const initialMessage = "51c18098f8f0a51cb8728d16e83f130d91b9a4f5324527dce5c7a2bef2df7dd3i0";
    const successMessage = "Congrats Explorer, AGoodDoctor approves!";
    const errorMessage = "You didn't solve the Mystery, try again!";

    useEffect(() => {
        const checkDeviceType = () => {
            if (window.innerWidth <= 768) {
                setDeviceType('mobile');
            } else if (window.innerWidth <= 1024) {
                setDeviceType('tablet');
            } else {
                setDeviceType('desktop');
            }
        };

        checkDeviceType();
        window.addEventListener('resize', checkDeviceType);
        return () => window.removeEventListener('resize', checkDeviceType);
    }, []);

    useEffect(() => {
        if (showFullImage) {
            setIsTyping(true);
            let message: string;
            if (hasSucceeded) {
                message = successMessage;
            } else if (responseStatus === 400) {
                message = errorMessage;
            } else {
                message = initialMessage;
            }

            let index = 0;
            const intervalId = setInterval(() => {
                if (index < message.length) {
                    setDisplayedMessage(prevMessage => prevMessage + message[index-1]);
                    index++;
                } else {
                    clearInterval(intervalId);
                    setIsTyping(false);
                }
            }, 50);
            return () => clearInterval(intervalId);
        } else {
            setDisplayedMessage('');
            setIsTyping(false);
        }
    }, [showFullImage, responseStatus, hasSucceeded, successMessage, errorMessage, initialMessage]);

    const toggleView = () => {
        setShowSubmission(!showSubmission);
        if (!hasSucceeded) {
            setShowFullImage(false);
            setError(null);
            setResponseStatus(null);
            setResponse(null);
        }
    };



    const getImageTransform = () => {
        if (showFullImage) return 'translateY(0)';

        switch (deviceType) {
            case 'mobile':
                return 'translateY(65%)';
            case 'tablet':
                return 'translateY(80%)';
            default:
                return isImageHovered ? 'translateY(75%)' : 'translateY(80%)';
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setDisplayedMessage('');

        if (!answer) {
            setError('Mystery word cannot be empty');
            return;
        }
        if (!twitterUsername || !/^@.+/.test(twitterUsername)) {
            setError('Twitter profile name must start with @');
            return;
        }

        try {
            const res = await fetch('/api/mysteryhunt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ providedSecret: answer, twitterProfile: twitterUsername }),
            });
            const data = await res.json();
            setResponseStatus(res.status);
            if (res.status === 200) {
                setHasSucceeded(true);
                setResponse(data.postLink);
            }
            setShowFullImage(true);
        } catch (error) {
            console.error(error);
            setError('An error occurred');
        }
    };

    const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!showFullImage) {
            setShowFullImage(true);
            if (!hasSucceeded) {
                setResponseStatus(null);
            }
        }
    };

    const handleTwitterUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (!value.startsWith('@') && value !== '') {
            value = '@' + value;
        }
        setTwitterUsername(value);
    };

    const buttonClasses = `w-full px-6 py-3 text-xl md:text-2xl text-center rounded-md focus:outline-none
    transition-all duration-100 ease-out
    hover:shadow-lg hover:scale-102
    active:transform active:scale-98`;

    const getImageSize = () => {
        switch (deviceType) {
            case 'mobile':
            case 'tablet':
                return { maxWidth: '200px', maxHeight: '200px' };
            default:
                return { maxWidth: '400px', maxHeight: '400px' };
        }
    };

    const getMessagePosition = () => {
        switch (deviceType) {
            case 'mobile':
            case 'tablet':
                return { bottom: '185px' };
            default:
                return { bottom: '380px' };
        }
    };

    return (
        <div className="relative min-h-screen pt-16 sm:pt-20 md:pt-24">
            <div className="flex justify-center items-center min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-96px)] p-4">
                <div className="w-full max-w-[1000px] bg-white bg-opacity-90 rounded-lg shadow-lg p-4 sm:p-6 md:p-10">
                    <div className="text-center mb-6 md:mb-8">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-3">
                            <span className="text-black">Myste</span>
                            <span style={{ color: mainColor }}>ry</span>
                            {' '}
                            <span className="text-black">Hu</span>
                            <span style={{ color: mainColor }}>nt</span>
                        </h1>
                        <p className="text-2xl md:text-2xl" style={{ color: mainColor }}>Unravel the Experiment, Unlock the Truth</p>
                    </div>
                    <div className="space-y-6 md:space-y-8 text-lg md:text-xl">
                        {!showSubmission ? (
                            <>
                                <div className="space-y-4 md:space-y-6">
                                    <p className="text-center text-gray-700">
                                        Welcome, aspiring explorer! You&apos;ve stumbled upon a mystery that has puzzled the greatest minds.
                                        Are you ready to test your wit and uncover the truth hidden in plain sight?
                                    </p>
                                    <p className="text-center text-gray-700">
                                        Your journey continues with this cryptic message. Find the <span style={{ color: mainColor, fontWeight: 'bold' }}>KEY</span> and <span style={{ color: mainColor, fontWeight: 'bold' }}>DECIPHER</span> it, and you&apos;ll be one step closer to unraveling the grand mystery.
                                        Remember, in the world of enigmas, <span style={{ color: mainColor, fontWeight: 'bold' }}>EVERY DETAIL MATTERS</span>. Look closely, think creatively, and trust your instincts.
                                    </p>
                                    <div className="p-4 md:p-8 bg-white bg-opacity-90 rounded-lg shadow-inner border-2" style={{ borderColor: mainColor }}>
                                        <p className="text-xl md:text-3xl font-mono text-center tracking-wide" style={{ color: mainColor }}>
                                            Cszyw uhzu jwd dswe hf CUzzhFhqkqf
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div className="space-y-4 md:space-y-6">
                                    <p className="text-center text-gray-700">
                                        Excellent work, explorer! You&apos;ve almost unraveled the Experiment.
                                        Now, let&apos;s see if your decryption skills are up to the challenge.
                                    </p>
                                    <div>
                                        <label htmlFor="answer" className="block text-lg md:text-xl font-medium mb-2" style={{ color: mainColor }}>Your Deciphered Answer</label>
                                        <input
                                            type="text"
                                            id="answer"
                                            value={answer}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value)}
                                            placeholder="Enter your solution here"
                                            required
                                            className="w-full p-3 text-base md:text-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="twitter" className="block text-lg md:text-xl font-medium mb-2" style={{ color: mainColor }}>X Username</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="twitter"
                                                value={twitterUsername}
                                                onChange={handleTwitterUsernameChange}
                                                placeholder="@"
                                                required
                                                className="w-full p-3 text-base md:text-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
                                            />
                                            {!twitterUsername.startsWith('@') && '@'}
                                        </div>
                                    </div>
                                    {error && (
                                        <div className="text-red-500 text-center">
                                            {error}
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        className={`${buttonClasses} text-white`}
                                        style={{
                                            backgroundColor: mainColor,
                                            borderColor: mainColor,
                                            transition: 'all 0.1s ease-out',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = darkMainColor;
                                            e.currentTarget.style.transform = 'scale(1.02)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = mainColor;
                                            e.currentTarget.style.transform = 'scale(1)';
                                        }}
                                    >
                                        Submit Your Solution
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                    <div className="mt-6 md:mt-8">
                        <button
                            onClick={toggleView}
                            className={`${buttonClasses} border`}
                            style={{
                                color: mainColor,
                                borderColor: mainColor,
                                transition: 'all 0.1s ease-out',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = darkWhiteColor;
                                e.currentTarget.style.transform = 'scale(1.02)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            {showSubmission ? "Back to the Cipher" : "I've Cracked the Code!"}
                        </button>
                    </div>
                </div>
            </div>

            {showFullImage && (
                <div
                    className="fixed left-0 z-[52] p-4 w-full sm:w-auto"
                    style={getMessagePosition()}
                >
                    <div className="bg-black bg-opacity-70 p-3 rounded-lg mx-auto" style={{ maxWidth: '400px', width: 'fit-content' }}>
                        <p className="text-white font-mono text-sm sm:text-base md:text-lg leading-tight break-words">
                            {displayedMessage}
                            {isTyping && <span className="animate-pulse">|</span>}
                        </p>
                        {hasSucceeded && !isTyping && (
                            <div className="mt-4 text-center">
                                <a
                                    href={response || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-white px-4 py-2 rounded-full shadow-lg text-sm sm:text-base transition-all duration-100 ease-out hover:shadow-xl hover:scale-105"
                                    style={{
                                        color: mainColor,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = darkMainColor;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = mainColor;
                                    }}
                                >
                                    Post on X
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div
                className="fixed bottom-0 left-0 transition-all duration-300 ease-in-out overflow-hidden"
                style={{
                    width: showFullImage ? '100%' : '50%',
                    height: showFullImage ? '100vh' : '20vw',
                    ...getImageSize(),
                    zIndex: showFullImage ? 51 : 50,
                }}
            >
                <div
                    className="relative w-full h-full"
                    onMouseEnter={() => setIsImageHovered(true)}
                    onMouseLeave={() => setIsImageHovered(false)}
                    onClick={handleImageClick}
                >
                    <img
                        src={responseStatus === 200 ? "/gif_aeons.gif" : "/gif_aeons.gif"}
                        alt={responseStatus === 200 ? "Success image" : "Mystery image"}
                        className="w-full h-full object-cover object-top absolute bottom-0 left-0"
                        style={{
                            transform: getImageTransform(),
                            transition: 'transform 300ms ease-in-out',
                        }}
                    />
                </div>
            </div>

            {showFullImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
                    onClick={() => setShowFullImage(false)}
                ></div>
            )}
        </div>
    );
};

export default MysteryHunt;