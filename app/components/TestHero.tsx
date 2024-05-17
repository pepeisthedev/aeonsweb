'use client'

import React from 'react'
import Image from 'next/image'

import Tooltip from './Tooltip'

const TestHero = () => {
    return(
        <div className='flex flex-col items-center justify-center'>
                <div className='z-20'>
                    <p className='text-9xl text-black uppercase opacity-25'>Explore</p>
                </div>
            <Tooltip content='Aeons - Aeons are the eternal guardians of art, capturing the timeless essence of creativity.' position='bottom' className='w-full text-left align-center'>
                <span className='text-sm text-black uppercase opacity-0'>test</span>    
            </Tooltip>
            <Tooltip content='Humans : This line reflects humanitys ongoing role and evolution within the tapestry of life and art' position='top' className='w-full text-left align-center'>
                <div className='w-full'>
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
            <Tooltip content='Digital :  The Digital Realm, highlighted by the last line through the narrative of Bitcoin, represents the cutting-edge evolution of technology and its impact on society.' position='top' className='w-full text-left align-center'>
                <span className='text-sm text-black uppercase opacity-0'>test</span>    
            </Tooltip>
            <div className='z-20'>
                <p className='text-9xl text-black uppercase opacity-25'>Art</p>
            </div>
        </div>
    )
}

export default TestHero;