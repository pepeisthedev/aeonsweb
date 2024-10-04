'use client'
import React, {useEffect} from 'react'

import {resetBackgroundImage, setBackgroundImage} from "@/app/utils/setBackgroundImage";
import MysteryWelcome from "@/app/components/mysteryhunt/MysteryWelcome";

const CreatePage = () => {

    useEffect(() => {
        setBackgroundImage('/festival/festival_background.webp');
        return () => {
            resetBackgroundImage();
        };
    }, []);

    return (
        <MysteryWelcome/>
    )
}

export default CreatePage