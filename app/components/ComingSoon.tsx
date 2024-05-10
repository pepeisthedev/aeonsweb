import React from 'react'
import Image from 'next/image'

const ComingSoon = () => {
    return(
        <div className='flex flex-col items-center justify-center'>
            <div className='z-20'>
                <p className='text-9xl text-black uppercase opacity-25'>Coming</p>
            </div>
            <div className=''>
                <Image 
                    src='/3linescopy.png'
                    alt='3 lines'
                    className=''
                   width={600}
                   height={650}
                      priority
                />
            </div>
            <div className='z-20'>
                <p className='text-9xl text-black uppercase opacity-25'>Soon</p>
            </div>
        </div>
    )
}

export default ComingSoon;