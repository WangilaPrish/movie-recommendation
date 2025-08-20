import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-gray-900 text-white py-4 mt-8 flex items-center justify-center">
            <span className="text-sm">&copy; {new Date().getFullYear()} MovieRec. All rights reserved.</span>
        </footer>
    );
};

export default Footer;
