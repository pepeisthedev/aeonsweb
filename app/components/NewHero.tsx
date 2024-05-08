import React from 'react'
import Image from 'next/image'

const NewHero = () => {
    return(
        <div className='flex flex-col items-center justify-center'>
            <div className='border-2 border-red-500 z-20'>
                <p className='text-9xl text-black'>Explore</p>
            </div>
            <div className='border-2 border-red-500'>
                <Image 
                    src='/3linescopy.png'
                    alt='3 lines'
                    className=''
                   width={600}
                   height={650}
                      priority
                />
            </div>
            <div className='border-2 border-red-500 z-20'>
                <p className='text-9xl text-black'>Art</p>
            </div>
        </div>
    )
}

export default NewHero;