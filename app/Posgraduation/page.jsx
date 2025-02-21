import React from "react";

const NoResources = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-2xl p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-700">Not ready yet !!!</h2>
        <p className="text-gray-500 mt-2">Check back later for updates.</p>
      </div>
    </div>
  );
};

export default NoResources;
