"use client"

import Link from 'next/link'

export default function Materialer():React.ReactElement {
    const linkClass = "bg-[url(/images/dansk_flag.jpg)] bg-cover overflow-hidden h-50 w-50 m-auto flex justify-center items-center border-2 border-red-500 rounded-full text-center font-bold hover:border-red-400 hover:bg-gray-100 transition duration-250 hover:scale-102"
    //const pFlagClass = "backdrop-blur-xs transition duration-100 hover:backdrop-blur-none flex w-full h-full justify-center items-center text-xl"
    
    return (
        <main className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-10">HVAD SKAL DER STÅ HER?</h1>
            <div className="m-auto grid lg:grid-cols-2 lg:grid-cols-1 gap-6 lg:w-130 sm:w-100">
              <Link className={`bg-[url(/images/dansk_boble.png)] ${linkClass}`} href="materialer/dansk" />
              
              <Link className={`bg-[url(/images/matematik_boble.png)] ${linkClass}`} href="materialer/matematik" />

              <Link className={`bg-[url(/images/morgenopgaver_boble.png)] ${linkClass}`} href="materialer/morgenopgaver" />

              <Link className={`bg-[url(/images/bhkl_boble.png)] ${linkClass}`} href="materialer/børnehaveklasse" />

              <Link className={`bg-[url(/images/specunderv_boble.png)] ${linkClass}`} href="materialer/specialundervisning" />

              <Link className={`bg-[url(/images/demo_boble.png)] ${linkClass}`} href="materialer/demoopgaver" />

              <Link className={`bg-[url(/images/DSA_boble.png)] ${linkClass}`} href="materialer/dsa" />

              <Link className={`bg-[url(/images/1klasse_boble.png)] ${linkClass}`} href="materialer/1.klasse" />
            </div>
        </main>
    )
}