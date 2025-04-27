import React from 'react';
import { motion } from 'framer-motion';
import { Wheat } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="bg-white shadow-sm py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Wheat className="h-8 w-8 text-green-500" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-xl font-semibold text-gray-800">Rice Variety Classifier</h1>
            <p className="text-sm text-gray-500">Powered by AI</p>
          </motion.div>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li className="text-gray-700 hover:text-green-500 transition-colors">Home</li>
            <li className="text-gray-700 hover:text-green-500 transition-colors">About</li>
            <li className="text-gray-700 hover:text-green-500 transition-colors">Contact</li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;