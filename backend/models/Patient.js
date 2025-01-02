// const mongoose = require('mongoose');
import mongoose from "mongoose";
const patientSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      age: {
            type: Number,
            required: true
      },
      gender: {
            type: String,
            enum: ['Male', 'Female'],
            required: true
      },
      region: {
            type: String,
            required: true
      },
      patientId:{
            type: String,
            required: true

      }
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;