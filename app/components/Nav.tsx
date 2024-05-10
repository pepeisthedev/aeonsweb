
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const NavBar = () => {
  return (
    <nav className="sticky mx-auto w-full text-gray-300 flex justify-between items-center p-4 z-10 bg-opacity-50">
      <div>
        <Image 
          className=''
          src='/Aeonsmainlogo.png'
          alt='Aeons logo'
          width={130}
          height={100}
        />
      </div>
      <ul className="flex items-center justify-between w-full max-w-md mx-auto p-0 list-none text-center">
        <li className="mr-4">
          <Link href="/" className="text-2xl font-bold font-edo text-center">
            Gallery
          </Link>
        </li>
        <li className="mr-4">
          <Link href="/about" className='text-2xl font-bold font-edo text-center text-nowrap'>
            WL Checker
          </Link>
        </li>
        <li className="ml-4">
          <Link href="/contact" className='text-2xl font-edo text-center'>
            About
          </Link>
        </li>
        <li className="ml-4">
          <Link href="/contact" className='text-2xl font-bold font-edo text-center'>
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
        height={50}
      />
      </div>
    </nav>
  );
};

export default NavBar;