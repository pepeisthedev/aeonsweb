'use client'

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

// width={180} height={150}

const RepNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
      setIsOpen(!isOpen);
      console.log(isOpen)
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

            <div className={isOpen ? "showMenuNav" : "hideMenuNav"}>
                <div
                  className="absolute top-0 right-0 px-8 py-8"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    className="h-8 w-8 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <ul className="flex flex-col items-center justify-between min-h-[250px]">
                    <li className="border-b border-gray-400 my-8 uppercase">
                        <Link href="/gallery" className="text-4xl font-bold text-center uppercase mx-2">
                          <span>Galle<span className='text-[#e6a40e]'>ry</span></span>
                        </Link>
                    </li>
                    <li className="border-b border-gray-400 my-8 uppercase">
                        <Link href="/wlchecker" className='text-4xl font-bold text-center text-nowrap uppercase mx-2'>
                          WL Check<span className='text-[#e6a40e]'>er</span>
                        </Link>
                    </li>
                    <li className="border-b border-gray-400 my-8 uppercase">
                        <Link href="https://twitter.com/AeonsBTC" className="text-4xl font-bold text-center uppercase mx-2">
                          <span>Twitt<span className='text-[#e6a40e]'>er</span></span>
                        </Link>
                    </li>
                    <li className="border-b border-gray-400 my-8 uppercase">
                        <Link href="https://discord.gg/6KucTavSDh" className="text-4xl font-bold text-center uppercase mx-2">
                          <span>Disco<span className='text-[#e6a40e]'>rd</span></span>
                        </Link>
                    </li>
                </ul>
            </div>

            
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
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: black;
        z-index: 50;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </nav>
  )
}

export default RepNavBar