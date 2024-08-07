// FlyInSection.tsx
import React, { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface FlyInSectionProps {
    children: ReactNode;
    direction?: 'left' | 'right';
}

const FlyInSection: React.FC<FlyInSectionProps> = ({ children, direction = 'left' }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div
            ref={ref}
            className={`transform transition-transform duration-700 ${
                inView ? 'translate-x-0' : direction === 'left' ? '-translate-x-full' : 'translate-x-full'
            }`}
        >
            {children}
        </div>
    );
};

export default FlyInSection;
