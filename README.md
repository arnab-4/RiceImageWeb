# Rice Classification Web Application

A modern web application that uses machine learning to classify different types of rice from uploaded images. Built with React, TypeScript, and Flask with TensorFlow integration.

## 🌾 Features

- **Image Classification**: Upload rice images and get instant classification results
- **Multiple Rice Types**: Supports classification of 5 rice varieties:
  - Arborio
  - Basmati
  - Ipsala
  - Jasmine
  - Karacadag
- **Interactive Chat**: AI-powered chat functionality for rice-related queries
- **Sample Images**: Pre-loaded sample images for testing
- **PDF Reports**: Generate detailed PDF reports of classification results
- **Responsive Design**: Modern, mobile-friendly interface with smooth animations
- **Real-time Analysis**: Fast image processing with confidence scores

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **React Toastify** for notifications
- **jsPDF** for PDF generation

### Backend
- **Flask** web framework
- **TensorFlow/Keras** for machine learning
- **PIL (Pillow)** for image processing
- **Flask-CORS** for cross-origin requests

## 📁 Project Structure

```
RiceImageWeb/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/         # Main application pages
│   │   ├── assets/        # Images and static assets
│   │   └── utils/         # Utility functions
│   ├── package.json
│   └── vite.config.ts
├── server/                # Backend Flask API
│   ├── api/
│   │   ├── app.py         # Main Flask application
│   │   ├── model/         # ML model files
│   │   └── requirements.txt
│   └── vercel.json        # Deployment configuration
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- pip

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the server directory:
```bash
cd server/api
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Flask server:
```bash
python app.py
```

The backend API will be available at `http://localhost:5000`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the client directory for any environment-specific configurations:

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key
```

### Model Setup

Ensure the trained model file `mymodelv1.h5` is placed in the `server/api/model/` directory.

## 📱 Usage

1. **Upload Image**: Click the upload area or drag and drop a rice image
2. **Sample Images**: Use provided sample images to test the application
3. **View Results**: Get classification results with confidence scores
4. **Chat**: Ask questions about rice types and get AI-powered responses
5. **Generate PDF**: Download detailed reports of your classification results

## 🎯 API Endpoints

### POST `/predict`
Classify uploaded rice image

**Request:**
- `file`: Image file (multipart/form-data)

**Response:**
```json
{
  "prediction": "Basmati",
  "confidence": 0.95,
  "all_predictions": {
    "Arborio": 0.02,
    "Basmati": 0.95,
    "Ipsala": 0.01,
    "Jasmine": 0.01,
    "Karacadag": 0.01
  }
}
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
```

### Backend (Render/Heroku)
The Flask application is configured for deployment with the included `vercel.json` and `wsgi.py` files.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- TensorFlow team for the machine learning framework
- React team for the frontend framework
- All contributors and rice classification research community

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ for rice classification enthusiasts**