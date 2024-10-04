'use client'
import React, {useEffect} from 'react'

import {resetBackgroundImage, setBackgroundImage} from "@/app/utils/setBackgroundImage";
import MysteryHunt from "@/app/components/mysteryhunt/MysteryHunt";

const CreatePage = () => {

    useEffect(() => {
        setBackgroundImage('/festival/festival_background.webp');
        return () => {
            resetBackgroundImage();
        };
    }, []);

    return (
        <MysteryHunt/>
    )
}

export default CreatePage