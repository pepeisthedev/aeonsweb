
import React from 'react'
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="sticky top-0 left-0 w-full bg-gray-800 text-gray-300 flex justify-between items-center p-4">
      <ul className="flex justify-between w-full max-w-md mx-auto p-0 list-none">
        <li className="mr-6">
          <Link href="/" className="text-lg font-bold">
            Home
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/about" className=''>
            About
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/contact" className=''>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;