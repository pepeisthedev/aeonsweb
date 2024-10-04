'use client'
import React, {useEffect, useState} from 'react';

import Gallery from "@/app/components/artcontest/Gallery";
import {setOriginalStyling, removeOriginalStyling} from "@/app/utils/setBackgroundImage";

const HomePage = () => {
    useEffect(() => {
        removeOriginalStyling()
        return () => {
          setOriginalStyling()
        };
    }, []);
  return (


      <Gallery />

  );
};

export default HomePage;
