import Link from "next/link";
import Image from "next/image";

const RepNavBar = () => {
  return(
    <nav className="p-4 sm:p-6 md:flex md:justify-between md:items-center">
      <div className="container mx-auto flex justify-between items-center">
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
      <div className="hidden md:flex">
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