import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image"
import Link from "next/link"
import SearchForm from "@/lib/components/searchForm"
import { MaterialsProvider } from "@/lib/context/MaterialsProvider";

export const metadata: Metadata = {
  title: 'Skolebole - Læringsmaterialer til danske skoler',
  description: 'Find gratis opgavesæt til dansk, matematik og engelsk',
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-blue-50 to-white min-h-screen`}>
        <MaterialsProvider>
        <header className="bg-white shadow-md">
          <div className="max-w-6xl mx-auto px-4">
            <div className="lg:flex sm:block justify-between items-center py-6">
              <Link href="/"><Image className="m-auto" alt="Skolebole logo" src="/images/skolebole_logo_lrg.png" width={1421} height={747} style={{width: "160px"}}/></Link>
              <nav className="flex justify-center w-full m-auto max-w-2xl">
                <ul className="md:flex sm:block justify-center space-x-6">
                  <Link href="/materialer"><li className="px-6 py-2 m-auto text-center rounded-full bg-red-100 hover:bg-red-200 transition-colors duration-300 cursor-pointer font-medium text-red-800">Katalog</li></Link>
                  <Link href="/materialer"><li className="px-6 py-2 m-auto text-center rounded-full bg-red-100 hover:bg-red-200 transition-colors duration-300 cursor-pointer font-medium text-red-800">Om os</li></Link>
                </ul>
              </nav>
              <SearchForm />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="h-full min-h-screen bg-white rounded-2xl shadow-lg p-6">
            {children}
          </div>
        </main>
        <footer className="mt-12 bg-white border-t border-gray-100 py-6">
          <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
            <p>© {new Date().getFullYear()} Skolebole - Læringsmaterialer til danske skoler</p>
          </div>
        </footer>
        </MaterialsProvider>
      </body>
      
    </html>
  );
}
