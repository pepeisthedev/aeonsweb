'use client'
import React, {useEffect} from 'react'

import FestivalStage2 from "@/app/components/festival/FestivalStage2";
import {resetBackgroundImage, setBackgroundImage} from "@/app/utils/setBackgroundImage";

const CreatePage = () => {

    useEffect(() => {
        setBackgroundImage('/festival/festival_background.webp');
        return () => {
            resetBackgroundImage();
        };
    }, []);

    return (
        <FestivalStage2/>
    )
}

export default CreatePage