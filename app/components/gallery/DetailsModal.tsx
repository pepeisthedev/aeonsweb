import React, {ReactNode, MouseEventHandler, useState, useEffect} from 'react';
import { useSwipeable } from 'react-swipeable';
import './DetailsModal.css';

interface ModalProps {
    children: ReactNode;
    onClose: MouseEventHandler;
    onNext: () => void;
    onPrevious: () => void;
}

const DetailsModal: React.FC<ModalProps> = ({ children, onClose, onNext, onPrevious }) => {
    const [deltaX, setDeltaX] = useState(0);
    const [finalX, setFinalX] = useState(0);
    const [animate, setAnimate] = useState(false);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose(e);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowRight':
                    onNext();
                    break;
                case 'ArrowLeft':
                    onPrevious();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onNext, onPrevious]);

    const handlers = useSwipeable({
        delta: 40, // Increase this value to make the swipe gesture less sensitive
        onSwiping: ({ deltaX }) => {
            setDeltaX(deltaX);
            setAnimate(false);
        },
        onSwipedLeft: () => {
            setAnimate(true);
            setFinalX(-window.innerWidth); // Set the final position off-screen to the left
            setTimeout(() => {
                onNext();
                setDeltaX(0);
                setFinalX(0);
                setAnimate(false);
            }, 200); // Match the animation duration
        },
        onSwipedRight: () => {
            setAnimate(true);
            setFinalX(window.innerWidth); // Set the final position off-screen to the right
            setTimeout(() => {
                onPrevious();
                setDeltaX(0);
                setFinalX(0);
                setAnimate(false);
            }, 200); // Match the animation duration
        },
        onSwiped: () => {
            setDeltaX(0);
        }
    });

    return (
        <div {...handlers} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-container" onClick={handleOverlayClick}>
            <div
                className={`relative modal-transparent p-6 rounded shadow-lg ${animate ? 'animate' : ''}`}
                style={{
                    transform: `translateX(${animate ? finalX : deltaX}px)`,
                    transition: animate ? 'transform 0.5s ease-out' : 'none'
                }}
            >
                <img src="/arrow-right.png" alt="Previous" className="modal-button left" onClick={onPrevious} />
                <img src="/arrow-right.png" alt="Next" className="modal-button right" onClick={onNext} />
                {children}
            </div>
        </div>
    );
};

export default DetailsModal;
