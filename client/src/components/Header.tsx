import React from 'react';
import { motion } from 'framer-motion';
import { Wheat } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="bg-gradient-to-r from-white to-green-50 shadow-sm py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Wheat className="h-10 w-10 text-green-500" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center sm:text-left"
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Rice Variety Classifier
            </h1>
            <p className="text-sm text-gray-600 font-medium">Powered by Advanced AI</p>
          </motion.div>
        </div>
        <nav className="flex items-center">
          <ul className="flex space-x-8">
            <motion.li 
              whileHover={{ y: -2 }}
              className="text-gray-700 hover:text-green-500 transition-colors font-medium cursor-pointer"
            >
              Home
            </motion.li>
            <motion.li 
              whileHover={{ y: -2 }}
              className="text-gray-700 hover:text-green-500 transition-colors font-medium cursor-pointer"
            >
              About
            </motion.li>
            <motion.li 
              whileHover={{ y: -2 }}
              className="text-gray-700 hover:text-green-500 transition-colors font-medium cursor-pointer"
            >
              Contact
            </motion.li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;