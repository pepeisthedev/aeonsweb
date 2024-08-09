'use client';
import React, { useEffect, useState } from 'react';
import FestivalMain from "@/app/components/festival/FestivalMain";
import { resetBackgroundImage, setBackgroundImage } from '@/app/utils/setBackgroundImage';
import FestivalStagePicker from "@/app/components/festival/FestivalStagePicker";

const CreatePage = () => {
    const [showFestivalMain, setShowFestivalMain] = useState(true);

    useEffect(() => {
        setBackgroundImage('/festival.jpg');
        return () => {
            resetBackgroundImage();
        };
    }, []);

    return (
        <div className={`page-container`}>
            {showFestivalMain ? (
                <FestivalMain onButtonClick={() => setShowFestivalMain(false)} />
            ) : (
                <FestivalStagePicker />
            )}
        </div>
    );
};

export default CreatePage;