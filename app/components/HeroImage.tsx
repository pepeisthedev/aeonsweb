import React from 'react'
import Image from 'next/image';

const HeroImage = () => {
    return(
        <div className='flex flex-col items-center justify-center gap-x-4 py-24'>
            <div className='flex-1'>
                <p className='font-bold text-9xl text-black uppercase'>Explore</p>
            </div>
            <div className='flex-1'>
                <Image 
                    src='/3lineslogo.png'
                    alt='3 lines'
                    className='z-10'
                    width={400}
                    height={400}
                      priority
                />
            </div>
            <div className='flex-1'>
                <p className='font-bold text-9xl text-black uppercase'>Art</p>
            </div>
        </div>
    )
}

export default HeroImage;