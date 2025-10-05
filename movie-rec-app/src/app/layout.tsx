import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "FilmFindr - AI Movie Recommendations",
    description: "Discover your next favorite movie with AI-powered recommendations",
    viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${inter.className} antialiased bg-black text-white overflow-x-hidden`}>
                <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-1 w-full">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
