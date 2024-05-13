'use client'

import React from 'react'
import Image from 'next/image'

import Tooltip from './Tooltip'

const TestHero = () => {
    return(
        <div className='flex flex-col items-center justify-center'>
            <Tooltip content='Will This Work Again?' position='bottom'>
                <div className='z-20'>
                    <p className='text-9xl text-black uppercase opacity-25'>Explore</p>
                </div>
            </Tooltip>
            <Tooltip content='hello world' position='bottom'>
                <div className=''>
                    <Image 
                        src='/RealMovingLogo.gif'
                        alt='3 lines'
                        className=''
                    width={400}
                    height={450}
                        priority
                    />
                </div>
            </Tooltip>
            <Tooltip content='We will see'>
                <div className='z-20'>
                    <span className='text-xl opacity-0'>check</span>
                </div>
            </Tooltip>
            <div className='z-20'>
                <p className='text-9xl text-black uppercase opacity-25'>Art</p>
            </div>
        </div>
    )
}

export default TestHero;