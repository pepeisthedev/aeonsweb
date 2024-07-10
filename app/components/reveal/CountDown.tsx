import React, { useEffect, useState, useRef } from 'react';
import './Countdown.css';

interface CountdownProps {
    initialSeconds: number;
    setIsTimeUp: React.Dispatch<React.SetStateAction<boolean>>;
    swiperSize: { width: number; height: number };
}

const Countdown: React.FC<CountdownProps> = ({ initialSeconds, setIsTimeUp, swiperSize }) => {
    const [time, setTime] = useState(Math.round(initialSeconds * 1000)); // Convert seconds to milliseconds
    const startTimeRef = useRef<number>(performance.now());
    const requestRef = useRef<number>(0);

    useEffect(() => {
        const updateTimer = (currentTime: number) => {
            const elapsedTime = currentTime - startTimeRef.current;
            const newTime = Math.round(initialSeconds * 1000 - elapsedTime);

            if (newTime <= 0) {
                setTime(0);
                setIsTimeUp(true);
                cancelAnimationFrame(requestRef.current);
            } else {
                setTime(newTime);
                requestRef.current = requestAnimationFrame(updateTimer);
            }
        };

        startTimeRef.current = performance.now();
        requestRef.current = requestAnimationFrame(updateTimer);

        return () => cancelAnimationFrame(requestRef.current);
    }, [initialSeconds, setIsTimeUp]);

    const formatTime = (time: number) => {
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
    };

    return (
        <div className="countdown">
            <div
                style={{
                    width: `${swiperSize.height}px`,
                }}
                className="timer text-white uppercase"
            >
                <h2 className="next-reveal text-white uppercase">NEXT REVEAL IN</h2>
                <h1 className="timer-value">{formatTime(time)}</h1>
            </div>
        </div>
    );
};

export default Countdown;
