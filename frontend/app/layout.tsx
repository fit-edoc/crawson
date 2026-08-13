import type { Metadata } from "next";
import { Inter, Geist, Oswald } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "Crawson  |  Web Scraper",
  description: "Extract structured data from any website instantly.",

  icons:{
    icon:"/logo.png",
    
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable, oswald.variable)}>
      <body className={`${inter.variable} font-sans antialiased selection:bg-accent selection:text-white`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
