
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const NavBar = () => {
  return (
    <nav className="sticky top-0 left-0 w-full text-gray-300 flex justify-between items-center p-4 z-10 bg-opacity-50">
      <div>
        <Image 
          className=''
          src='/Aeonsmainlogo.png'
          alt='Aeons logo'
          width={130}
          height={100}
        />
      </div>
      <ul className="flex justify-between w-full max-w-md mx-auto p-0 list-none">
        <li className="mr-6">
          <Link href="/" className="text-2xl font-bold font-edo">
            Gallery
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/about" className='text-2xl font-bold font-edo'>
            WL Checker
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/contact" className='text-2xl font-edo'>
            About
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/contact" className='text-2xl font-bold font-edo'>
            Contact
          </Link>
        </li>
      </ul>
      <div className='flex flex-row justify-between'>
      <Image 
          className=''
          src='/TwitterMenuLogo.png'
          alt='Aeons logo'
          width={60}
          height={50}
        />
        <Image 
        className=''
        src='/discordlogo.png'
        alt='Aeons logo'
        width={60}
        height={60}
      />
      </div>
    </nav>
  );
};

export default NavBar;