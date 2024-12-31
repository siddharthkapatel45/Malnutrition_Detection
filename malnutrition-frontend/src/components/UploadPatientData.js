export default function UploadPatientData() {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Upload Patient Data
            </h2>
            <form className="space-y-6">
              {/* Upload Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Patient Observation Image
                </label>
                <input
                  type="file"
                  className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
    
              {/* Patient ID Field */}
              <div>
                <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">
                  Patient ID
                </label>
                <input
                  type="text"
                  id="patientId"
                  placeholder="Enter patient ID"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
    
              {/* User ID Field */}
              <div>
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                  User ID
                </label>
                <input
                  type="text"
                  id="userId"
                  placeholder="Enter user ID"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
    
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
    