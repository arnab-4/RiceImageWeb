import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 40, 
  color = 'text-green-500' 
}) => {
  return (
    <div className="flex justify-center items-center py-4">
      <motion.div
        className={`w-${size} h-${size} rounded-full border-4 border-t-transparent ${color} border-opacity-70`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;