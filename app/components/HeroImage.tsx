import React from 'react'
import Image from 'next/image';

const HeroImage = () => {
    return(
        <div className='flex flex-col items-center justify-center'>
            <Image 
                src='/3lineslogo.png'
                alt='3 lines'
                width={500}
                height={300}
                className='z-10'
            />
        </div>
    )
}

export default HeroImage;