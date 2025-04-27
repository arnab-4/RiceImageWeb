import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageUploader from "../components/ImageUploader";
import SampleImages from "../components/SampleImages";
import ResultDisplay from "../components/ResultDisplay";
import ButtonGradient from "../assets/svg/ButtonGradient";
import { generatePDF } from "../utils/pdfGenerator";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const serverLink = "https://riceimageweb.onrender.com";
const classNames = ['Arborio', 'Basmati', 'Ipsala', 'Jasmine', 'Karacadag'];

const RiceClassification: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const resetState = () => {
    setSelectedImage(null);
    setPrediction(null);
    setConfidence(null);
    setOriginalFile(null);
  };

  const handleImageSelect = async (file: File) => {
    try {
      // Reset prediction state
      setPrediction(null);
      setConfidence(null);
      
      // Create and set image URL
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setOriginalFile(file);
      
      // Analyze the image
      await analyzeImage(file);
    } catch (error) {
      console.error("Error handling image selection:", error);
      toast.error("Failed to process the selected image");
    }
  };

  const handleSampleSelect = async (imageUrl: string) => {
    try {
      // Reset prediction state
      setPrediction(null);
      setConfidence(null);
      setSelectedImage(imageUrl);
      
      // Fetch the image and convert to a blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], `sample-${Date.now()}.jpg`, { type: blob.type });
      setOriginalFile(file);
      
      // Analyze the image
      await analyzeImage(file);
    } catch (error) {
      console.error("Error handling sample selection:", error);
      toast.error("Failed to process the sample image");
    }
  };

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(`${serverLink}/predict`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          "Accept": "application/json"
        },
        timeout: 60000 // 30 second timeout
      });

      const { predicted_class, confidence_score } = response.data;
      
      if (!predicted_class || confidence_score === undefined) {
        throw new Error("Invalid response format from server");
      }

      setPrediction(predicted_class);
      setConfidence(confidence_score);
      toast.success("Analysis completed successfully!");
    } catch (error) {
      console.error("Error during image analysis:", error);
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          toast.error("Request timed out. Please try again.");
        } else if (error.response) {
          // Server responded with error
          toast.error(`Server error: ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          // Request made but no response
          toast.error("Could not connect to the server. Please check if it's running.");
        } else {
          toast.error("Error analyzing the image. Please try again.");
        }
      } else {
        toast.error("Error analyzing the image. Please try again.");
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGeneratePDF = () => {
    if (selectedImage && prediction && confidence !== null) {
      generatePDF({
        imageUrl: selectedImage,
        prediction,
        confidence
      })
        .then(() => {
          toast.success("PDF report generated successfully!");
        })
        .catch(error => {
          console.error("Error generating PDF:", error);
          toast.error("Failed to generate PDF report");
        });
    } else {
      toast.warn("Cannot generate report: classification data is incomplete");
    }
  };

  return (
    <>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Rice Variety Classifier</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upload an image of rice grains and our AI will identify the variety with high accuracy.
              Perfect for agricultural research, quality control, and educational purposes.
            </p>
          </motion.div>

          {!selectedImage ? (
            <>
              <motion.div variants={itemVariants}>
                <ImageUploader onImageSelect={handleImageSelect} />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <SampleImages onSampleSelect={handleSampleSelect} />
              </motion.div>
            </>
          ) : (
            <motion.div variants={itemVariants}>
              <ResultDisplay
                selectedImage={selectedImage}
                prediction={prediction}
                confidence={confidence}
                isAnalyzing={isAnalyzing}
                onGeneratePDF={handleGeneratePDF}
                onReset={resetState}
              />
            </motion.div>
          )}
          
          <motion.div 
            variants={itemVariants}
            className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-3">About Rice Variety Classification</h2>
            <p className="text-gray-700 mb-4">
              Rice variety identification is crucial for quality control, trade regulation, and research purposes.
              Our AI-powered system uses advanced computer vision and deep learning algorithms to accurately
              classify different rice varieties based on visual characteristics like shape, size, and texture.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-gray-800 mb-2">Supported Rice Varieties</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  {classNames.map((variety, index) => (
                    <li key={index}>{variety}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-gray-800 mb-2">Best Practices for Images</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>Use good lighting conditions</li>
                  <li>Place rice grains against a contrasting background</li>
                  <li>Ensure grains are separated and visible</li>
                  <li>Capture from a consistent distance</li>
                  <li>Avoid shadows and reflections</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
      <ButtonGradient />
    </>
  );
};

export default RiceClassification;