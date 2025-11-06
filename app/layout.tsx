import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Skolebole - Læringsmaterialer til danske skoler',
  description: 'Find læringsmaterialer til dansk, matematik og engelsk',
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
        <header className="bg-white shadow-md">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center py-6">
              <Link href="/"><Image alt="Skolebole logo" src="/logo.png" width={1024} height={1024} style={{width: "160px"}}/></Link>
              <nav className="w-full max-w-2xl">
                <ul className="flex justify-center space-x-6">
                  <li className="px-6 py-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors duration-300 cursor-pointer font-medium text-blue-800"><Link href="/dansk">Dansk</Link></li>
                  <li className="px-6 py-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors duration-300 cursor-pointer font-medium text-green-800"><Link href="/matematik">Matematik</Link></li>
                  <li className="px-6 py-2 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors duration-300 cursor-pointer font-medium text-purple-800"><Link href="/engelsk">Engelsk</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {children}
          </div>
        </main>

        <footer className="mt-12 bg-white border-t border-gray-100 py-6">
          <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
            <p>© {new Date().getFullYear()} Skolebole - Læringsmaterialer til danske skoler</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
