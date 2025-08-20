import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
    return (
        <motion.footer
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
            className="w-full bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-4 mt-8 flex items-center justify-center shadow-lg"
        >
            <span className="text-sm">&copy; {new Date().getFullYear()} MovieRec. All rights reserved.</span>
        </motion.footer>
    );
};

export default Footer;
