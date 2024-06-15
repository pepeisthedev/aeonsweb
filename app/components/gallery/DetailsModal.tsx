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
                <img src="/arrow-right.png" alt="Previous" className="modal-button left" onClick={onPrevious} />
                <img src="/arrow-right.png" alt="Next" className="modal-button right" onClick={onNext} />
                {children}
            </div>
        </div>
    );
};

export default DetailsModal;