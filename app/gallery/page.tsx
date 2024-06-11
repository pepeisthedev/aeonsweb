'use client'

import React from 'react'

import ComingSoon from '../components/ComingSoon'
import Tooltip from '../components/Tooltip'


const Gallery = () => {
    return(
        <main className="flex h-screen flex-col items-center justify-center bg-cover bg-[url('/blackaeonsbg.png')] -my-12">
            
                <ComingSoon />
            
        </main>
    )
}

export default Gallery;