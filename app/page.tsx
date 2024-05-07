import Image from "next/image";

import HeroImage from "./components/HeroImage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-cover bg-[url('/backgroundaeonsbtc.png')] -my-24">
   
        <HeroImage />
      {/* <div className="relative z-[-1] flex place-items-center ">
       

      </div> */}
    
    </main>
  );
}
