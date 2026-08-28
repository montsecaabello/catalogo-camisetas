import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CarritoProvider } from "./components/CarritoContext";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
export const metadata = {
  title: 'Gol Shirt',
  description: 'Catálogo de camisetas de fútbol',
  openGraph: {
    title: 'Gol Shirt',
    description: 'Catálogo de camisetas de fútbol',
    images: ['/logo-gol-shirt.png'],
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={geistSans.variable + " " + geistMono.variable}>
      <body>
  <CarritoProvider>
    {children}
  </CarritoProvider>
</body>
    </html>
  );
}