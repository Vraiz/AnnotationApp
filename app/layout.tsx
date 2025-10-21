import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalHeader from "./components/Globalheader";
import ModalProvider from "./components/providers/ModalProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emoji Sentiment Research",
  description: "Exploring emoji sentiment in Filipino online communication.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ModalProvider />
        <GlobalHeader />
        {children}
        <footer className="footer">© 2025 De La Salle University — CeLT Lab</footer>
      </body>
    </html>
  );
}
