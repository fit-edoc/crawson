import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Arachne | Next-Gen Web Scraper",
  description: "Extract structured data from any website instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} antialiased selection:bg-accent selection:text-white`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
