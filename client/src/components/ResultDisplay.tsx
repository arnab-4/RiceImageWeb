import React from 'react';
import { motion } from 'framer-motion';
import { FileDown, RefreshCw } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface ResultDisplayProps {
  selectedImage: string | null;
  prediction: string | null;
  confidence: number | null;
  isAnalyzing: boolean;
  onGeneratePDF: () => void;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  selectedImage,
  prediction,
  confidence,
  isAnalyzing,
  onGeneratePDF,
  onReset
}) => {
  if (!selectedImage) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="sm:w-1/3">
          <div className="rounded-xl overflow-hidden border border-gray-100 aspect-square shadow-md">
            <img
              src={selectedImage}
              alt="Selected Rice Sample"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="sm:w-2/3">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Analysis Results</h3>
          
          {isAnalyzing ? (
            <div className="flex flex-col items-center my-8">
              <LoadingSpinner />
              <p className="mt-4 text-gray-600 font-medium">Analyzing rice variety...</p>
            </div>
          ) : prediction ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Identification</span>
                </div>
                <p className="text-3xl font-bold text-green-600 mb-4">{prediction}</p>
                
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Confidence</span>
                  <span className="text-sm font-medium text-gray-800">
                    {confidence !== null ? `${(confidence * 100).toFixed(2)}%` : 'N/A'}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${confidence ? confidence * 100 : 0}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full"
                  />
                </div>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onGeneratePDF}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                >
                  <FileDown size={20} />
                  <span>Download Report</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onReset}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-semibold border border-gray-200"
                >
                  <RefreshCw size={20} />
                  <span>Try Another</span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <p className="text-gray-500 italic">Results will appear here after analysis</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ResultDisplay;