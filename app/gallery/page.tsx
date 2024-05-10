import React from 'react'

import ComingSoon from '../components/ComingSoon'

const Gallery = () => {
    return(
        <main className="flex h-screen flex-col items-center justify-center bg-cover bg-[url('/backgroundaeonsbtc.png')] -my-24">
            <ComingSoon />
        </main>
    )
}

export default Gallery;