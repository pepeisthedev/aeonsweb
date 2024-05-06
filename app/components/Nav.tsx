
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const NavBar = () => {
  return (
    <nav className="sticky top-0 left-0 w-full bg-gray-800 text-gray-300 flex justify-between items-center p-4">
      <ul className="flex justify-between w-full max-w-md mx-auto p-0 list-none">
        <li className="mr-6">
          <Link href="/" className="text-lg font-bold">
            Gallery
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/about" className='text-lg font-bold'>
            WL Checker
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/contact" className='text-lg font-bold'>
            About Us
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/contact" className='text-lg font-bold'>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;