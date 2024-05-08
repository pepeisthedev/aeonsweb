import React from 'react'
import Image from 'next/image'

const NewHero = () => {
    return(
        <div className='flex flex-col items-center justify-center space-y-0 '>
            <p className='text-9xl text-black'>New Hero</p>
            <div className='size-96'>
                <Image 
                    src='/3lineslogo.png'
                    alt='3 lines'
                    className='z-10'
                    width={400}
                    height={400}
                      priority
                />
            </div>
            <p className='text-9xl text-black'>New Hero</p>
        </div>
    )
}

export default NewHero;