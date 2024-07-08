import React, { useEffect, useState } from 'react';
import './Countdown.css';

interface CountdownProps {
    initialSeconds: number;
    setIsTimeUp: React.Dispatch<React.SetStateAction<boolean>>;
    swiperSize: { width: number; height: number };
}

const Countdown: React.FC<CountdownProps> = ({ initialSeconds, setIsTimeUp, swiperSize }) => {
    const [time, setTime] = useState(Math.round(initialSeconds * 1000)); // Convert seconds to milliseconds

    useEffect(() => {
        if (time <= 0) {
            setIsTimeUp(true);
            return;
        }

        const interval = setInterval(() => {
            setTime(prevTime => {
                const newTime = prevTime - 10;
                if (newTime <= 0) {
                    clearInterval(interval);
                    setIsTimeUp(true);
                    return 0;
                }
                return newTime;
            });
        }, 10);

        return () => clearInterval(interval);
    }, [time]);

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