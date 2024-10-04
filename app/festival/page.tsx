'use client';
import React, { useEffect, useState } from 'react';
import FestivalMain from "@/app/components/festival/FestivalMain";
import { resetBackgroundImage, setBackgroundImage } from '@/app/utils/setBackgroundImage';
import FestivalStagePicker from "@/app/components/festival/FestivalStagePicker";

const CreatePage = () => {
    const [showFestivalMain, setShowFestivalMain] = useState(true);

    useEffect(() => {
        setBackgroundImage('/festival/festival_background.webp');
        return () => {
            resetBackgroundImage();
        };
    }, []);

    return (
        <>
            {showFestivalMain ? (
                <FestivalMain onButtonClick={() => setShowFestivalMain(false)} />
            ) : (
                <FestivalStagePicker />
            )}
        </>
    );
};

export default CreatePage;