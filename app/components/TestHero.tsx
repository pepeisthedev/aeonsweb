'use client'

import React from 'react'
import Image from 'next/image'

import Tooltip from './Tooltip'

/* 
width={400}
height={450}
*/

const TestHero = () => {
    return(
        <div className='flex flex-col items-center justify-center'>
                <div className='z-20 -mb-10'>
                    <p className='text-7xl sm:text-9xl text-white uppercase'>Explore</p>
                </div> 
                <div className='relative w-72 h-72'>
                    <Image 
                        src='/AnimatedLogoNew.png'
                        alt='3 lines'
                        className=''
                        fill
                        priority
                    />
                </div>
            <div className='z-20 -mt-10'>
                <p className='text-7xl sm:text-9xl text-white uppercase'>Art</p>
            </div>
        </div>
    )
}

export default TestHero;