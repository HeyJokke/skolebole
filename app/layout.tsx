import type { Metadata } from "next"
import { Geist, Geist_Mono, Bubblegum_Sans } from "next/font/google"
import "./globals.css";
import Image from "next/image"
import Link from "next/link"
import SearchForm from "@/lib/components/searchForm"
import React from 'react'
import { MaterialsProvider } from "@/lib/context/MaterialsProvider"
import { FaFacebookSquare, FaInstagram, FaPinterest, FaYoutube } from "react-icons/fa"
import ForlagetLink from "@/lib/components/forlagetLink";
import ScrollToTop from "@/lib/components/scrollToTop";
import { MaterialsProviderAdmin } from "@/lib/context/MaterialsProviderAdmin";

export const metadata: Metadata = {
  title: 'SkoleBole - Læringsmaterialer til indskolingen',
  description: 'Hos SkoleBole finder du printklare kopisider til den første læsning, sproglig og fonologisk opmærksomhed samt matematisk logisk tænkning.',
  icons: "/icon.png"
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bubbleGum = Bubblegum_Sans({
  weight: ['400'],
  variable: "--font-bubblegum-sans",
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${bubbleGum.variable}`}>
        <MaterialsProviderAdmin>
          <MaterialsProvider>
          <header className="bg-yellow-50/80 shadow-md">
            <div className="max-w-6xl mx-auto px-4">
              <div className="lg:flex sm:block justify-between items-center py-6">
                <Link href="/"><Image className="w-fit m-auto mb-5 lg:mb-0" alt="Skolebole logo" src="/images/skolebole_logo_lrg.png" width={1421} height={747} style={{width: "180px"}}/></Link>
                <nav>
                  <ul className="md:flex block w-full justify-center space-y-6 space-x-0 md:space-x-6 md:space-y-0">
                    {/* Large/medium screens navbar */}
                    <Link className="hidden md:block" href="/materialer"><li className="bg-sky-600 text-nowrap w-fit text-center p-4 rounded-full font-extrabold text-white text-xl hover:scale-105 hover:bg-sky-500 transform-size duration-200">Alle materialer</li></Link>
                    <Link className="hidden md:block" href="/maanedsside"><li className="bg-sky-600 text-nowrap w-fit text-center p-4 rounded-full font-extrabold text-white text-xl hover:scale-105 hover:bg-sky-500 transform-size duration-200">Månedens materialer</li></Link>
                    <Link className="hidden md:block" href="/kontakt"><li className="bg-sky-600 text-nowrap w-fit text-center p-4 rounded-full font-extrabold text-white text-xl hover:scale-105 hover:bg-sky-500 transform-size duration-200">Kontakt os</li></Link>
                    {/* Small screens navbar */}
                    <Link className="block md:hidden" href="/materialer"><li className="bg-sky-600 text-nowrap w-full text-center p-4 rounded-full font-extrabold text-white text-xl">Alle materialer</li></Link>
                    <Link className="block md:hidden" href="/maanedsside"><li className="bg-sky-600 text-nowrap w-full text-center p-4 rounded-full font-extrabold text-white text-xl">Månedens materialer</li></Link>
                    <Link className="block md:hidden" href="/kontakt"><li className="bg-sky-600 text-nowrap w-full text-center p-4 rounded-full font-extrabold text-white text-xl">Kontakt os</li></Link>
                    <div className="m-auto block md:hidden lg:block">
                      <React.Suspense fallback={<div/>}> 
                        <SearchForm />
                      </React.Suspense>
                    </div>
                  </ul>
                </nav>
                <div className="m-auto ml-0 mr-0 mt-5 lg:mt-auto hidden md:block lg:hidden">
                  <React.Suspense fallback={<div/>}> 
                    <SearchForm />
                  </React.Suspense>
                </div>
              </div>
            </div>
          </header>

          <main className="w-full flex justify-center px-4 lg:px-0 py-8 text-slate-700 gap-5">
            <div className="hidden lg:flex fixed lg:static w-[75]">
              <span className="h-[75] w-[75]"></span>
            </div>
            <div className="max-w-6xl w-full h-full min-h-screen bg-yellow-50/90 rounded-2xl shadow-lg lg:p-6 md:p-3 p-2">
              <React.Suspense fallback={<div/>}>
                {children}
              </React.Suspense>
            </div>
            <div className="lg:flex fixed lg:static w-[75]">
              <ScrollToTop />
            </div>
          </main>
          
          <footer className="mt-12 bg-yellow-50/80 border-t border-gray-100 py-6">
            <div className="flex flex-col max-w-6xl mx-auto px-4 text-center text-gray-600">
              <p className="text-sm">
                Illustrationer og billeder anvendt på denne hjemmeside, og i SkoleBoles materialer i øvrigt, er enten skabt af forfatter Liselotte Ring Kryger/
                Forlaget Kluddermor (herunder AI-genererede illustrationer via OpenAI/DALL·E) eller anvendt i henhold til gældende billedlicenser fra lovlige 
                billeddatabaser som Pixabay, Freepik og Shutterstock. Der er ingen eksterne illustratorer eller billedkunstnere, som skal vederlægges, 
                i forbindelse med brugen af disse billeder.
                <br/><br/>
                Al kopiering, analogt og digitalt, af SkoleBoles materialer eller dele deraf er tilladt i henhold til undervisningsinstitutionens aftale med <span className="font-bold">Tekst & Node</span>.
                <br/>
                Kopiering, der går ud over begrænsningsreglerne i aftalen med <span className="font-bold">Tekst & Node</span>, kan alene finde sted efter forudgående aftale med SkoleBole / Forlaget Kluddermor.
              </p>
              <ForlagetLink />
              <p>©2026 by Forlaget Kluddermor</p>
              <div className="flex mt-2 mb-2 w-30 justify-between m-auto">
                <a href="https://www.facebook.com/forlagetkluddermor/" target="_blank"><FaFacebookSquare /></a>
                <a href="https://www.instagram.com/forlagetkluddermor/" target="_blank"><FaInstagram /></a>
                <a href="https://www.pinterest.dk/forlagetkluddermor/_saved/" target="_blank"><FaPinterest /></a>
                <a href="https://www.youtube.com/channel/UCk4maKwrZGy97RbU3fgyJvg/videos" target="_blank"><FaYoutube /></a>
              </div>
              <p>
                Hannevej 16 <br/>
                3060 Espergærde <br/>
                forlagetkluddermor@gmail.com<br/>
                Tlf. 20 91 56 27<br/>
                CVR 42724505
              </p>
            </div>
          </footer>
          </MaterialsProvider>
        </MaterialsProviderAdmin>
      </body>
      
    </html>
  );
}
