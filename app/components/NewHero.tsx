import React from 'react'
import Image from 'next/image'

const NewHero = () => {
    return(
        <div className=''>
            <p className='text-5xl text-black'>New Hero</p>
            <div className=''>
                <Image 
                    src='/3lineslogo.png'
                    alt='3 lines'
                    className='z-10'
                    width={600}
                    height={600}
                      priority
                />
            </div>
            <p className='text-5xl text-black'>New Hero</p>
        </div>
    )
}

export default NewHero;