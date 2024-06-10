'use client'

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

// width={180} height={150}

const RepNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
      setIsOpen(!isOpen);
      
  }

  return(
    <nav className="p-2 sm:p-6 md:flex md:justify-between md:items-center">
      <div className="container mx-auto flex justify-between items-center">
      <div className="relative h-16 w-48">
        <Link href="/" >
          <Image 
            className=''
            src='/Aeonsmainlogo.png'
            alt='Aeons logo'
            fill
          />
        </Link>
      </div>
      <section className="lg:hidden md:hidden flex">
      <div>
            <button onClick={handleClick} className="flex flex-col justify-center items-center">
                <span className={`bg-[#e6a40e] block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm`}></span>
                <span className={`bg-[#e6a40e] block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm my-0.5`}></span>
                <span className={`bg-[#e6a40e] block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm`}></span>  
            </button>
        </div>
      </section>
      <div className="hidden md:flex md:items-center">
        <Link href="/gallery" className="text-4xl font-bold text-center uppercase mx-2">
            <span>Galle<span className='text-[#e6a40e]'>ry</span></span>
        </Link>
        <Link href="/wlchecker" className='text-4xl font-bold text-center text-nowrap uppercase mx-2'>
            WL Check<span className='text-[#e6a40e]'>er</span>
        </Link>
        <Link href='https://twitter.com/AeonsBTC' >
            <Image 
                className=''
                src='/AeonsTwitter60x60.png'
                alt='Aeons logo'
                width={60}
                height={60}
              />
        </Link>
        <Link href='https://discord.gg/6KucTavSDh'>
              <Image 
                className=''
                src='/AeonsDiscord60x60.png'
                alt='Aeons logo'
                width={60}
                height={60}
              />
          </Link>
      </div>
      </div>
    </nav>
  )
}

export default RepNavBar