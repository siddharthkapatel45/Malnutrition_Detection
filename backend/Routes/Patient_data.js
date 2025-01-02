import express from "express";
import Patient from "../models/Patient.js"; // Ensure the path to your model is correct
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs
import authenticateJWT from "../Authentication/Auth.js";

import PatientImage from "../models/Patient_image.js"; 
const router = express.Router();

// API to register a patient
router.post("/", authenticateJWT,async (req, res) => {
  const { name, age, gender, region } = req.body;

  // Validate input
  if (!name || !age || !gender || !region) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the patient already exists
    const existingPatient = await Patient.findOne({ name, age, gender, region });

    if (existingPatient) {
      console.log("Patient already exists, registering again with a new ID.");
    }

    // Generate a unique patient ID
    const patientId = uuidv4();

    // Create a new patient document
    const newPatient = new Patient({
      name,
      age,
      gender,
      region,
      patientId, // Store the unique patient ID
    });

    // Save the patient to the database
    await newPatient.save();

    res.status(201).json({
      message: "Patient registered successfully!",
      patientId,
    });
  } catch (error) {
    console.error("Error saving patient:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// API to retrieve patient details by patientId from the request body
router.post("/get-patient", authenticateJWT,async (req, res) => {
  const { patientId } = req.body;

  // Validate input
  if (!patientId) {
    return res.status(400).json({ message: "Patient ID is required." });
  }

  try {
    // Find the patient by patientId
    const patient = await Patient.findOne({ patientId });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    // Return the patient details
    res.status(200).json(patient);
  } catch (error) {
    console.error("Error retrieving patient data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});
 


// Sample input for Postman
// URL: http://localhost:3000/upload
// Method: POST
// Body: raw (JSON)


// API to upload a photo
router.post("/upload", async (req, res) => {
  const { patient_id, user_id, photo } = req.body;

  // Validate input
  if (!patient_id || !user_id || !photo) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create a new PatientImage document
    const newPatientImage = new PatientImage({
      patient_id,
      user_id,
      photo,
    });

    // Save the photo to the database
    await newPatientImage.save();

    res.status(201).json({ message: "Photo uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});






export default router;