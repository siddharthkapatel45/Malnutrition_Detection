import React from 'react';

const UploadImage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="border p-8 rounded-lg shadow-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 w-96 h-64">
        <label className="block mb-4 text-lg font-bold text-white">Upload Calibration Image</label>
        <input type="file" className="block w-full border border-gray-300 p-3 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
      </div>
    </div>
  );
};

export default UploadImage;