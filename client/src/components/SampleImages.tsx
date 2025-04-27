import React from 'react';
import { motion } from 'framer-motion';
// Import local images from assets folder
import IpsalaImg from '../assets/Ipsala (10049).jpg';
import BasmatiImg from '../assets/Basmati (1).jpg';
import JasmineImg from '../assets/Jasmine (10003).jpg';
interface SampleImage {
  id: number;
  name: string;
  asset: string;
  type: string;
}

interface SampleImagesProps {
  onSampleSelect: (imageUrl: string) => void;
}

const SampleImages: React.FC<SampleImagesProps> = ({ onSampleSelect }) => {
  const sampleImages: SampleImage[] = [
    {
      id: 1,
      name: 'Arborio Rice',
      asset: IpsalaImg,
      type: 'Arborio'
    },
    {
      id: 2,
      name: 'Basmati Rice',
      asset: BasmatiImg,
      type: 'Basmati'
    },
    {
      id: 3,
      name: 'Jasmine Rice',
      asset: JasmineImg,
      type: 'Jasmine'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">Try with Sample Images</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {sampleImages.map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            className="overflow-hidden rounded-2xl shadow-lg bg-white cursor-pointer transform transition-all duration-300"
            onClick={() => onSampleSelect(img.asset)}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={img.asset}
                alt={img.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{img.name}</h3>
              <p className="text-sm text-gray-600">Type: {img.type}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SampleImages;