'use client'

import React, {useState} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import "./Nav.css"

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true); // New state variable

    const handleClick = () => {
        setTimeout(() => {
            setIsOpen(!isOpen);
        }, 100);
    }

    const handleRevealClick = () => {
        setIsAnimating(false); // Stop the animation
    }

    const handleBothClicks = () => {
        handleRevealClick();
        handleClick();
    }

    return (
        <nav className="nav p-4 w-full text-gray-300 flex flex-row justify-between items-center bg-opacity-50" id="nav" >
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

            <section className="lg:hidden md:hidden flex">
                <div>
                    <button onClick={handleClick} className="flex flex-col justify-center items-center">
                <span className={`bg-[#e6a40e] block transition-all duration-300 ease-out 
                    h-2 w-10 rounded-sm`}></span>
                        <span className={`bg-[#e6a40e] block transition-all duration-300 ease-out 
                    h-2 w-10 rounded-sm my-0.5`}></span>
                        <span className={`bg-[#e6a40e] block transition-all duration-300 ease-out 
                    h-2 w-10 rounded-sm`}></span>
                    </button>

                    <div className={isOpen ? "showMenuNav" : "hideMenuNav"}>
                        <div
                            className="absolute top-0 right-0 px-8 py-8 menu-z-index"
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
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </div>
                        <ul className="flex flex-col items-center justify-between min-h-[250px] link-z-index">
                            <li className="border-b border-gray-400 my-8 uppercase link-z-index">
                                <Link href="/gallery" className="text-4xl font-bold text-center uppercase mx-2 "
                                      onClick={handleClick}>
                                    <span>Galle<span className='text-[#e6a40e]'>ry</span></span>
                                </Link>
                            </li>

                            <li className={`border-b border-gray-400 my-8 uppercase link-z-index`}>
                                <Link href="/festival" className="text-4xl font-bold text-center uppercase mx-2 "
                                      onClick={handleBothClicks}>
                                    <span>Festiv<span className='text-[#e6a40e]'>al</span></span>
                                </Link>
                            </li>
                            <li className={`border-b border-gray-400 my-8 uppercase link-z-index`}>
                                <Link href="/assets" className="text-4xl font-bold text-center uppercase mx-2 "
                                      onClick={handleBothClicks}>
                                    <span>Asse<span className='text-[#e6a40e]'>ts</span></span>
                                </Link>
                            </li>
                            <li className="border-b border-gray-400 my-8 uppercase link-z-index">
                                <Link href="https://twitter.com/AeonsBTC"
                                      className="text-4xl font-bold text-center uppercase mx-2"
                                      onClick={handleClick}
                                      target="_blank" rel="noopener noreferrer">
                                    <span>Twitt<span className='text-[#e6a40e]'>er</span></span>
                                </Link>
                            </li>
                            <li className="border-b border-gray-400 my-8 uppercase link-z-index">
                                <Link href="https://discord.gg/2zqeHXZ6Tn"
                                      className="text-4xl font-bold text-center uppercase mx-2"
                                      onClick={handleClick}
                                      target="_blank" rel="noopener noreferrer">
                                    <span>Disco<span className='text-[#e6a40e]'>rd</span></span>
                                </Link>
                            </li>
                            <li className="border-b border-gray-400 my-8 uppercase link-z-index">
                                <Link href="https://magiceden.io/ordinals/marketplace/aeonsbtc"
                                      className="text-4xl font-bold text-center uppercase mx-2"
                                      onClick={handleClick}
                                      target="_blank" rel="noopener noreferrer">
                                    <span>Mark<span className='text-[#e6a40e]'>et </span></span>
                                    <span>pla<span className='text-[#e6a40e]'>ce</span></span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>


            <div className='hidden md:flex md:items-center'>
                <ul className="flex items-center justify-center mx-auto p-0 text-center">
                    <li className="mr-6">
                        <Link href="/gallery" className="text-4xl font-bold text-center uppercase">
                            <span>Galle<span className='text-[#e6a40e]'>ry</span></span>
                        </Link>
                    </li>
                    <li className={`mr-2`}>
                        <Link onClick={handleRevealClick} href="/festival"
                              className="text-4xl font-bold text-center uppercase mx-2">
                            <span>Festiv<span className='text-[#e6a40e]'>al</span></span>
                        </Link>
                    </li>
                    <li className="mr-6">
                        <Link href="/assets" className="text-4xl font-bold text-center uppercase">
                            <span>Asse<span className='text-[#e6a40e]'>ts</span></span>
                        </Link>
                    </li>
                    <li className='nav-li-container'>
                        <Link href='https://twitter.com/AeonsBTC'
                              target="_blank" rel="noopener noreferrer">
                            <Image
                                className='icon-size'
                                src='/AeonsTwitter60x60.png'
                                alt='Aeons logo'
                                width={60}
                                height={60}
                            />
                        </Link>
                    </li>
                    <li className="">
                        <Link href='https://discord.gg/2zqeHXZ6Tn'
                              target="_blank" rel="noopener noreferrer">
                            <Image
                                className='icon-size'
                                src='/AeonsDiscord60x60.png'
                                alt='Aeons logo'
                                width={60}
                                height={60}
                            />
                        </Link>
                    </li>
                    <li className="">
                        <Link href='https://magiceden.io/ordinals/marketplace/aeonsbtc'
                              target="_blank" rel="noopener noreferrer">
                            <Image
                                className="me-icon-size ml-2"
                                src='/me_logo.webp'
                                alt='ME logo'
                                width={60}
                                height={60}
                            />
                        </Link>
                    </li>
                </ul>

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
    );
};

export default NavBar;