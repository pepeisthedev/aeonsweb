import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-opacity-50">
      <Image 
          src='/backgroundaeonsbtc.png'
          alt="aeon background"
          className="object-cover object-center w-full h-full"
          fill
        />
      {/* <div className="relative z-[-1] flex place-items-center ">
        

      </div> */}

    
    </main>
  );
}
