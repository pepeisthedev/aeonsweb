'use client'

import React from 'react'

import ComingSoon from '../components/ComingSoon'
import Tooltip from '../components/Tooltip'


const Gallery = () => {
    return(
        <main className="flex h-screen flex-col items-center justify-center bg-cover bg-[url('/backgroundaeonsbtc.png')] -my-24">
            <Tooltip content='Will this work?'>
                <ComingSoon />
            </Tooltip>
        </main>
    )
}

export default Gallery;