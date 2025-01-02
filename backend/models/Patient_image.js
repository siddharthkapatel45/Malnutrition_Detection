import mongoose from 'mongoose';

const patientImageSchema = new mongoose.Schema({
      patient_id: {
        type: String, // Change from ObjectId to String
        required: true,
      },
      user_id: {
        type: String, // Change from ObjectId to String
        required: true,
      },
      photo: {
        type: String,
        required: true,
      },
    });
    

const PatientImage = mongoose.model('PatientImage', patientImageSchema);

export default PatientImage;