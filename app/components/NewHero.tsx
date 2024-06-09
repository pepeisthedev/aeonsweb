import React from 'react'
import Image from 'next/image'

const NewHero = () => {
    return(
        <div className='flex flex-col items-center justify-center'>
            <div className='z-20 -mb-10'>
                <p className='text-9xl text-white uppercase'>Explore</p>
            </div>
            <div className=''>
                <Image 
                    src='/AnimatedlogoNew.png'
                    alt='3 lines'
                    className=''
                   width={400}
                   height={450}
                   
                      priority
                />
            </div>
            <div className='z-20 -mt-10'>
                <p className='text-9xl text-white uppercase'>Art</p>
            </div>
        </div>
    )
}

export default NewHero;