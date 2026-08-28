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

export const metadata: Metadata = {
  title: "Gol Shirt",
  description: "Camisetas de fútbol premium",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Gol Shirt",
    description: "Camisetas de fútbol premium",
    images: [
      {
        url: "/logo-gol-shirt.png",
        width: 1200,
        height: 630,
        alt: "Gol Shirt",
      },
    ],
  },
};

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