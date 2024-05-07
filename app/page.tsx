import Image from "next/image";

import HeroImage from "./components/HeroImage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-cover bg-[url('/backgroundaeonsbtc.png')] -my-24">
      {/* <Image 
          src='/backgroundaeonsbtc.png'
          alt="aeon background"
          className="object-cover object-center w-full h-full bg-opacity-50"
          fill
        /> */}
      <div className="relative z-[-1] flex place-items-center ">
       <HeroImage />

      </div>
    
    </main>
  );
}
