import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    }
  }, [onImageSelect]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageSelect(files[0]);
    }
  }, [onImageSelect]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div
        className={`border-3 border-dashed rounded-2xl p-10 text-center transition-all duration-300 ${
          isDragging 
            ? 'border-green-500 bg-green-50 shadow-lg scale-102' 
            : 'border-gray-300 hover:border-green-400 hover:shadow-md'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center mb-6 shadow-lg"
          >
            {isDragging ? (
              <ImageIcon className="h-10 w-10 text-white" />
            ) : (
              <Upload className="h-10 w-10 text-white" />
            )}
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {isDragging ? 'Drop your image here' : 'Upload an image'}
          </h3>
          <p className="text-lg text-gray-600 mb-4">
            Drag & drop or click to browse
          </p>
          <p className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
            Supports: JPG, PNG, WEBP (Max 5MB)
          </p>
        </label>
      </div>
    </motion.div>
  );
};

export default ImageUploader;