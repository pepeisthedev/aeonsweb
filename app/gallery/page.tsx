'use client'

import React from 'react'
import "./page.css"
import ImageGallery from "@/app/components/gallery/ImageGallery";


const Gallery = () => {
    return(
        <main className="main-content flex-col flex h-screen flex-grow bg-[url('/blackaeonsbg.png')] bg-cover -my-24">

                <ImageGallery/>

            </main>
            )
            }

            export default Gallery;