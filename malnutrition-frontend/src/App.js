import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Uploadimage from "./components/Uploadimage";
import PatientRegistration from "./components/PatientRegistration";
import UploadPatientData from "./components/UploadPatientData";
import Patienttable from "./components/PatientTable";
import Navbar from "./components/Navbar";
function App() {
  return (
    
    <>
        <Router>
    <Navbar/>

          <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Uploadimage" element={<Uploadimage/>} />
        <Route path="/patient" element={<PatientRegistration/>} />
        <Route path="/patientdata" element={<UploadPatientData/>} />
        <Route path="/table" element={<Patienttable/>} />
       
          </Routes>
    </Router>
    </>
   
  );
}

export default App;
