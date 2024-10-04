'use client'
import React, {useEffect} from 'react'

import FestivalStage1 from "@/app/components/festival/FestivalStage1";
import {resetBackgroundImage, setBackgroundImage} from "@/app/utils/setBackgroundImage";

const CreatePage = () => {

    useEffect(() => {
        setBackgroundImage('/festival/festival_background.webp');
        return () => {
            resetBackgroundImage();
        };
    }, []);

    return (
        <FestivalStage1/>
    )
}

export default CreatePage