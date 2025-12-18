import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css";
import Image from "next/image"
import Link from "next/link"
import SearchForm from "@/lib/components/searchForm"
import React from 'react'
import { MaterialsProvider } from "@/lib/context/MaterialsProvider"
import DonationPopup from '@/lib/components/donationPopup'

export const metadata: Metadata = {
  title: 'SkoleBole - Læringsmaterialer til indskolingen',
  description: 'SkoleBole har særligt fokus på barnets læseudvikling, den første læsning samt sproglig opmærksomhed og fonologisk opmærksomhed.',
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
                <ul className="md:flex sm:block justify-center space-x-6">
                  <Link href="/materialer"><li className="px-6 py-2 m-auto text-center rounded-full cursor-pointer text-slate-700 font-extrabold text-xl underline decoration-3 hover:scale-105 transform-size duration-200 text-shadow-md text-shadow-white">Materialer</li></Link>
                  <Link href="/om_os"><li className="px-6 py-2 m-auto text-center rounded-full cursor-pointer text-slate-700 font-extrabold text-xl underline decoration-3 hover:scale-105 transform-size duration-200 text-shadow-md text-shadow-white">Om os</li></Link>
                </ul>
              </nav>
              <React.Suspense fallback={<div />}> 
                <SearchForm />
              </React.Suspense>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="h-full min-h-screen bg-yellow-50/80 rounded-2xl shadow-lg p-6">
            {children}
          </div>
        </main>

        <DonationPopup />
        
        <footer className="mt-12 bg-yellow-50/80 border-t border-gray-100 py-6">
          <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
            <p>© {new Date().getFullYear()} Skolebole - Danske læringsmaterialer til danske skoler</p>
          </div>
        </footer>
        </MaterialsProvider>
      </body>
      
    </html>
  );
}
