import type { Metadata } from "next";
import { Outfit, Dancing_Script, Cinzel } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-cursive",
  weight: ["400", "600", "700"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Happy Birthday Queen uhhh 👑❤️ | Smokiee to Queen",
  description: "A special 1-to-1 birthday celebration from Smokiee to Queen uhhh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dancingScript.variable} ${cinzel.variable}`}>
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
