import React from 'react';

const Patienttable = () => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Patient"
          className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Table */}
      <table className="table-auto w-full border-collapse border border-gray-300 text-sm text-gray-700">
        <thead>
          <tr className="bg-indigo-600 text-white">
            <th className="border border-gray-300 p-3 text-left">Patient ID</th>
            <th className="border border-gray-300 p-3 text-left">Name</th>
            <th className="border border-gray-300 p-3 text-left">Gender</th>
            <th className="border border-gray-300 p-3 text-left">Age</th>
            <th className="border border-gray-300 p-3 text-left">Height</th>
            <th className="border border-gray-300 p-3 text-left">Weight</th>
            <th className="border border-gray-300 p-3 text-left">Nutritional Status</th>
            <th className="border border-gray-300 p-3 text-left">BMI</th>
            <th className="border border-gray-300 p-3 text-left">Observation Date</th>
            <th className="border border-gray-300 p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample Data Row */}
          <tr className="odd:bg-gray-100 hover:bg-indigo-50 transition-colors">
            <td className="border border-gray-300 p-3">1</td>
            <td className="border border-gray-300 p-3">John Doe</td>
            <td className="border border-gray-300 p-3">Male</td>
            <td className="border border-gray-300 p-3">25</td>
            <td className="border border-gray-300 p-3">175 cm</td>
            <td className="border border-gray-300 p-3">70 kg</td>
            <td className="border border-gray-300 p-3">Healthy</td>
            <td className="border border-gray-300 p-3">22.9</td>
            <td className="border border-gray-300 p-3">2024-12-24</td>
            <td className="border border-gray-300 p-3">
              <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-400">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Patienttable;