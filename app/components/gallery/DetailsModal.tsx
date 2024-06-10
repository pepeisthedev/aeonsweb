import React, { ReactNode, MouseEventHandler } from 'react';
import './DetailsModal.css';

interface ModalProps {
    children: ReactNode;
    onClose: MouseEventHandler;
    onNext: () => void;
    onPrevious: () => void;
}

const DetailsModal: React.FC<ModalProps> = ({ children, onClose , onNext, onPrevious}) => {
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose(e);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-container" onClick={handleOverlayClick}>
            <div className="relative modal-transparent p-6 rounded shadow-lg"> {/* Set position to relative */}
                <button
                    className="absolute top-2 right-2 rounded-full p-1"
                    onClick={(e) => onClose(e)}
                    style={{width: '10px', height: '10px'}} // Set a specific width and height
                >
                    &times;
                </button>
                <div className="button-container pr-2 pb-2">
                    <button className="text-red-700 underline" onClick={onPrevious}>Previous</button>
                    <button className="text-red-700 underline" onClick={onNext}>Next</button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default DetailsModal;