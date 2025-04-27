import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import numpy as np

# -------------------------------------------------------------------
# Configuration
# -------------------------------------------------------------------
BASE_DIR      = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR     = os.path.join(BASE_DIR, "model")
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
ANALYSED_DIR  = os.path.join(BASE_DIR, "analysed")

# Ensure folders exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(ANALYSED_DIR, exist_ok=True)

# Load your model
MODEL_PATH = os.path.join(MODEL_DIR, "mymodelv1.h5")
model      = load_model(MODEL_PATH)

# Define your classes in the same order as your training labels
CLASS_NAMES = [
    "Arborio",
    "Basmati",
    "Ipsala",
    "Jasmine",
    "Karacadag"
]

# -------------------------------------------------------------------
# Flask setup
# -------------------------------------------------------------------
app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
CORS(app)

# -------------------------------------------------------------------
# Helpers
# -------------------------------------------------------------------
def preprocess_image(image_path, target_size=(224, 224)):
    """Load, resize, normalize and expand dims."""
    img = Image.open(image_path).convert("RGB")
    img = img.resize(target_size)
    arr = img_to_array(img) / 255.0
    return np.expand_dims(arr, axis=0)

# -------------------------------------------------------------------
# Routes
# -------------------------------------------------------------------
@app.route("/predict", methods=["POST"])
def predict():
    # 1. Check and save upload
    if "image" not in request.files:
        return jsonify({"error": "No image file in request"}), 400

    file       = request.files["image"]
    filename   = file.filename
    save_path  = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(save_path)

    # 2. Preprocess & predict
    img_tensor = preprocess_image(save_path)
    preds      = model.predict(img_tensor)[0]
    idx        = int(np.argmax(preds))
    confidence = float(preds[idx])
    label      = CLASS_NAMES[idx]

    # 3. Return JSON
    return jsonify({
        "predicted_class": label,
        "confidence_score": confidence
    })

# (Optional) serve analysed images
@app.route("/analysed/<path:filename>")
def serve_analysed(filename):
    return send_from_directory(ANALYSED_DIR, filename)

# -------------------------------------------------------------------
if __name__ == "__main__":
    # dev server
    app.run(host="0.0.0.0", port=5000, debug=True)
