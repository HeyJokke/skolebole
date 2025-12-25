import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css";
import Image from "next/image"
import Link from "next/link"
import SearchForm from "@/lib/components/searchForm"
import React from 'react'
import { MaterialsProvider } from "@/lib/context/MaterialsProvider"
import DonationPopup from '@/lib/components/donationPopup'
import { FaFacebookSquare, FaInstagram, FaPinterest, FaYoutube } from "react-icons/fa"
import ForlagetLink from "@/lib/components/forlagetLink";

export const metadata: Metadata = {
  title: 'SkoleBole - Læringsmaterialer til indskolingen',
  description: 'SkoleBole har særligt fokus på barnets læseudvikling, den første læsning samt sproglig opmærksomhed og fonologisk opmærksomhed.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[url(/wallpapers/skolebole-wallpaper.jpg)] bg-cover bg-fixed min-h-screen`}>
        <MaterialsProvider>
        <header className="bg-yellow-50/80 shadow-md">
          <div className="max-w-6xl mx-auto px-4">
            <div className="lg:flex sm:block justify-between items-center py-6">
              <Link href="/"><Image className="m-auto mb-5 lg:mb-0" alt="Skolebole logo" src="/images/skolebole_logo_lrg.png" width={1421} height={747} style={{width: "160px"}}/></Link>
              <nav className="flex justify-center w-full m-auto max-w-2xl">
                <ul className="flex justify-center space-x-6">
                  <Link href="/materialer"><li className="bg-sky-600 w-fit p-3 rounded-full font-extrabold text-white text-xl hover:scale-105 hover:bg-sky-500 transform-size duration-200">Materialer</li></Link>
                  <Link href="/kontakt"><li className="bg-sky-600 w-fit p-3 rounded-full font-extrabold text-white text-xl hover:scale-105 hover:bg-sky-500 transform-size duration-200">Kontakt os</li></Link>
                </ul>
              </nav>
              <React.Suspense fallback={<div />}> 
                <SearchForm />
              </React.Suspense>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8 text-slate-700">
          <div className="h-full min-h-screen bg-yellow-50/80 rounded-2xl shadow-lg lg:p-6 md:p-3 p-2">
            {children}
          </div>
        </main>

        <DonationPopup />
        
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
      </body>
      
    </html>
  );
}
