import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav className="w-full bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
            <Link href="/">
                <span className="text-xl font-bold tracking-tight">MovieRec</span>
            </Link>
            <div className="flex gap-6">
                <Link href="/favorites" className="hover:underline">Favorites</Link>
                <Link href="/about" className="hover:underline">About</Link>
            </div>
        </nav>
    );
};

export default Navbar;
