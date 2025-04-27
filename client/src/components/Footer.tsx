import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-3">Rice Variety Classifier</h3>
            <p className="text-gray-300 text-sm">
              An advanced AI-powered tool for accurate classification of rice varieties
              using computer vision and machine learning techniques.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-green-400 transition-colors">
                <a href="#">Home</a>
              </li>
              <li className="hover:text-green-400 transition-colors">
                <a href="#">About</a>
              </li>
              <li className="hover:text-green-400 transition-colors">
                <a href="#">API Documentation</a>
              </li>
              <li className="hover:text-green-400 transition-colors">
                <a href="#">Research Papers</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
            <p className="text-sm text-gray-400">
              Questions? Contact us at <br />
              <a href="mailto:info@riceclassifier.ai" className="text-green-400 hover:underline">
                info@riceclassifier.ai
              </a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} Rice Variety Classifier. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;