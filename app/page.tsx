import Image from "next/image";

import HeroImage from "./components/HeroImage";
import NewHero from "./components/NewHero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cover bg-[url('/blackaeonsbg.png')] -my-12">
   
        {/* <HeroImage /> */}
        <NewHero />
      {/* <div className="relative z-[-1] flex place-items-center ">
       

      </div> */}
    
    </main>
  );
}
