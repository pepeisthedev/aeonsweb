'use client';
import React, { useEffect, useState } from 'react';
import FestivalMain from "@/app/components/festival/FestivalMain";
import { resetBackgroundImage, setBackgroundImage } from '@/app/utils/setBackgroundImage';

const CreatePage = () => {
    const [showFestivalMain, setShowFestivalMain] = useState(true);

    useEffect(() => {
        setBackgroundImage('/festival.jpg');
        return () => {
            resetBackgroundImage();
        };
    }, []);

    return (


                <FestivalMain/>


    );
};

export default CreatePage;