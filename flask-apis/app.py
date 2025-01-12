from flask import Flask, jsonify, request
from datetime import datetime
import base64
import cv2
import math
import numpy as np
import csv
from paddleocr import PaddleOCR

app = Flask(__name__)

chart_files = {
    "male": {
        "0-2": "./charts/0-2_male.csv",
        "2-5": "./charts/2-5_male.csv"
    },
    "female": {
        "0-2": "./charts/0-2_female.csv",
        "2-5": "./charts/2-5_female.csv"
    }
}

# Malnutrition checker function
def malnutrition_status_checker(age, gender, height, weight):
    age = int(age)
    age_group = "0-2" if age < 2 else "2-5"
    filename = chart_files[gender][age_group]

    height = str(round(float(height) * 2) / 2)
    weight = str(round(float(weight), 1))

    if age_group == "0-2" and (float(height) > 110 or float(height) < 45):
        return "NA"
    if age_group == "2-5" and (float(height) > 120 or float(height) < 65):
        return "NA"

    with open(filename, 'r') as csv_file:
        table = csv.reader(csv_file)
        for row in table:
            if row[0] == "Height":
                continue
            if float(row[0]) == float(height):
                if float(weight) <= 0:
                    return "NA"
                if float(weight) < float(row[4]) or float(weight) > float(row[10]):
                    return "Severe Malnutrition"
                elif float(weight) < float(row[5]) or float(weight) > float(row[9]):
                    return "Moderate Malnutrition"
                elif float(weight) < float(row[6]) or float(weight) > float(row[8]):
                    return "Mild Malnutrition"
                else:
                    return "Proper Nutrition"

# Function to find diagonal width of an object in an image
def FindDiagonal(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    ret, corners = cv2.findChessboardCorners(gray, (7, 10), None)

    # If chessboard corners are not found, return None or handle it
    if not ret or corners is None:
        print("Warning: Chessboard corners not found. Make sure the image contains a clear chessboard pattern.")
        return None  # Return None or handle it differently as needed
    
    # Initialize values only if chessboard corners are found
    xmax = ymax = 0
    xmin = ymin = 1e18
    for i in corners:
        xmax = max(xmax, i.item(0))
        ymax = max(ymax, i.item(1))
        xmin = min(xmin, i.item(0))
        ymin = min(ymin, i.item(1))
    print("Diagonal width found:", math.dist([xmax, ymax], [xmin, ymin]))
    diagonal = math.dist([xmax, ymax], [xmin, ymin])
    return diagonal


# Function to calculate focal length from the reference image
def Focal_Length_Finder(measured_distance, real_width, width_in_rf_image):
    focal_length = (width_in_rf_image * measured_distance) / real_width
    return focal_length

@app.route('/sidd', methods=["GET"])
def sidd():
    return "Hello Siddharth"

@app.route('/', methods=["POST"])
# @app.route('/', methods=["POST"
def charRecogAndDistDetect():
    try:
        data = request.get_json()

        if "image" not in data or "calib_image" not in data:
            return jsonify({"error": "Image and calibration image are required"}), 400

        # Decode the base64 image
        decoded = base64.b64decode(data["image"])
        nparr = np.frombuffer(decoded, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            return jsonify({"error": "Failed to load image"}), 400
        print("Image loaded successfully!")

        # Preprocess image for OCR
    # Preprocess image for OCR
        # Ensure the image has the correct number of channels before processing
        if len(img.shape) == 3:  # Color image with 3 channels (RGB/BGR)
                img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
                print("Converted color image to grayscale.")
        elif len(img.shape) == 2:  # Grayscale image with 1 channel
                print("Image is already in grayscale.")
        else:
                print("Unexpected image format!")

        # Perform thresholding to prepare the image for OCR or further analysis
        _, img = cv2.threshold(img, 128, 255, cv2.THRESH_BINARY)

        # Save the preprocessed image to check
        cv2.imwrite('preprocessed_image.jpg', img)



        # OCR processing
        ocr = PaddleOCR(use_angle_cls=False)
        result = ocr.ocr(img, cls=False)
        print("OCR result: ", result)

        if not result or result == [[]]:
            return jsonify({"error": "OCR failed to detect any text"}), 400

        output = result[0][0][1][0]
        print("Detected text:", output)

        # Decode the calibration image
        calib = base64.b64decode(data["calib_image"])
        nparr = np.frombuffer(calib, np.uint8)
        calib_img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if calib_img is None:
            return jsonify({"error": "Failed to load calibration image"}), 400
        print("Calibration image loaded successfully!")

        # Find the diagonal of reference image
        ref_image_face_width = FindDiagonal(calib_img)
        Known_distance = float(data["calib_length"])
        Known_width = float(data["diag_length"])

        Focal_length_found = Focal_Length_Finder(Known_distance, Known_width, ref_image_face_width)
        print('Focal length found:', Focal_length_found)

        # Find distance of object in the actual image
        face_width_in_frame = FindDiagonal(img)
        Distance = Distance_finder(Focal_length_found, Known_width, face_width_in_frame)
        print('Distance:', Distance)

        weight = float(output)
        height = Distance

        # Calculate BMI
        him = height / 100
        bmi = weight / (him * him)

        # Get malnutrition status
        age = data["age"]
        gender = data["gender"]
        status = malnutrition_status_checker(age, gender, height, weight)

        print("Weight: ", weight)
        print("Height: ", height)
        print("BMI: ", bmi)
        print("Malnutrition Status: ", status)

        height = round(height, 2)
        return jsonify({'weight': weight, 'height': height, 'bmi': bmi, 'malnutrition_status': status}), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True, port=8080)
