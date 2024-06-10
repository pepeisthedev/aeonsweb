
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const NewNav = () => {
  return (
    <nav className="sticky flex flex-row justify-between max-w-5xl mx-auto px-2 py-3 sm:px-4 z-10 bg-opacity-50">
      <div>
        <Link href="/">
          <Image 
            className=''
            src='/Aeonsmainlogo.png'
            alt='Aeons logo'
            width={180}
            height={150}
          />
        </Link>
      </div>
      {/* <ul className="flex items-center justify-center w-full max-w-md mx-auto p-0 list-none text-center">
        <li className="mr-4">
          <Link href="/gallery" className="text-2xl font-bold font-edo text-center">
            Gallery
          </Link>
        </li>
        <li className="mr-4">
          <Link href="/wlchecker" className='text-2xl font-bold font-edo text-center text-nowrap'>
            WL Checker
          </Link>
        </li>
      </ul> */}
      <div className='flex flex-row justify-between'>
      <ul className="flex items-center justify-center w-full max-w-md mx-auto p-0 list-none text-center">
        <li className="mr-6 opacity-80">
          <Link href="/gallery" className="text-4xl font-bold text-center uppercase">
            <span>Galle<span className='text-[#e6a40e]'>ry</span></span>
          </Link>
        </li>
        <li className="mr-2 opacity-80">
          <Link href="/wlchecker" className='text-4xl font-bold text-center text-nowrap uppercase'>
            WL Check<span className='text-[#e6a40e]'>er</span>
          </Link>
        </li>
        <li className='opacity-80'>
            <Link href='https://twitter.com/AeonsBTC' >
            <Image 
                className=''
                src='/AeonsTwitter60x60.png'
                alt='Aeons logo'
                width={60}
                height={60}
              />
            </Link>
        </li>
        <li className="opacity-80">
            <Link href='https://discord.gg/6KucTavSDh'>
              <Image 
                className=''
                src='/AeonsDiscord60x60.png'
                alt='Aeons logo'
                width={60}
                height={60}
              />
          </Link>
        </li>
      </ul>
     
      {/* <Link href='/' className='h-fit w-fit'>
        <Image 
            className=''
            src='/TwitterMenuLogo.png'
            alt='Aeons logo'
            width={50}
            height={60}
          />
        </Link> */}
        {/* <Link href='/'>
          <Image 
            className=''
            src='/newdiscordlogo.png'
            alt='Aeons logo'
            width={150}
            height={150}
          />
      </Link> */}
      
      </div>
    </nav>
  );
};

export default NewNav;