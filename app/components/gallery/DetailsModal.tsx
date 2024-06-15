import React, {ReactNode, MouseEventHandler, useEffect, useState} from 'react';
import { useSwipeable } from 'react-swipeable';
import './DetailsModal.css';
import './FlipDetailsModal.css';

interface ModalProps {
    children: ReactNode;
    onClose: MouseEventHandler;
    onNext: () => void;
    onPrevious: () => void;
}

const DetailsModal: React.FC<ModalProps> = ({ children, onClose , onNext, onPrevious}) => {
    const [swipeOut, setSwipeOut] = useState(''); // Change this state to a string

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
        onSwipedLeft: () => {
            setSwipeOut('swipeOutLeft');
            setTimeout(() => {
                onNext();
            }, 100); // Change this delay to 0.25s
            setTimeout(() => {
                setSwipeOut('');
            }, 200);
        },
        onSwipedRight: () => {
            setSwipeOut('swipeOutRight');
            setTimeout(() => {
                onPrevious();
            }, 100); // Change this delay to 0.25s
            setTimeout(() => {
                setSwipeOut('');
            }, 200);
        }
    });

    return (
        <div {...handlers} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-container" onClick={handleOverlayClick}>
            <div className={`relative modal-transparent p-6 rounded shadow-lg ${swipeOut}`}> {/* Use the swipeOut state here */}
                <img src="/arrow-right.png" alt="Previous" className="modal-button left" onClick={onPrevious} />
                <img src="/arrow-right.png" alt="Next" className="modal-button right" onClick={onNext} />
                {children}
            </div>
        </div>
    );
};

export default DetailsModal;