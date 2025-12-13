"use client"

import Link from 'next/link'

export default function Materialer():React.ReactElement {
    const linkClass = "bg-[url(/images/dansk_flag.jpg)] bg-cover overflow-hidden h-50 w-50 m-auto flex justify-center items-center border-2 border-red-500 rounded-full text-center font-bold hover:border-red-400 hover:bg-gray-100 transition duration-250 hover:scale-102"
    const pFlagClass = "backdrop-blur-xs transition duration-100 hover:backdrop-blur-none flex w-full h-full justify-center items-center text-3xl"
    
    

    return (
        <main className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-10">Vælg et fag</h1>
            <div className="m-auto grid lg:grid-cols-2 lg:grid-cols-1 gap-6 lg:w-130 sm:w-100">
              <Link className={`bg-[url(/images/dansk_flag.jpg)] ${linkClass}`} href="materialer/dansk">
                <p className={pFlagClass}>Dansk</p>
              </Link>
              
              <Link className={`bg-[url(/images/matematik_flag.png)] ${linkClass}`} href="materialer/matematik">
                <p className={pFlagClass}>Matematik</p>
              </Link>

              <Link className={`bg-[url(/images/engelsk_flag.png)] ${linkClass}`} href="materialer/engelsk">
                <p className={pFlagClass}>Engelsk</p>
              </Link>

              <Link className={`bg-[url(/images/naturteknik_flag.png)] ${linkClass}`} href="materialer/naturteknik">
                <p className={pFlagClass}>Natur & Teknik</p>
              </Link>

              <Link className={`bg-[url(/images/historie_flag.png)] ${linkClass}`} href="materialer/historie">
                <p className={pFlagClass}>Historie</p>
              </Link>
            </div>
        </main>

    )
}