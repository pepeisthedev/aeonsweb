import React from 'react'

import ComingSoon from '../components/ComingSoon'

import TestHero from '../components/TestHero'

const TestHome = () => {
    return(
        <main className="flex h-screen flex-col items-center justify-center bg-cover bg-[url('/backgroundaeonsbtc.png')] -my-24">
           <TestHero />
        </main>
    )
}

export default TestHome