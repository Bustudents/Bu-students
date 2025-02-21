import React from 'react';


const Features = () => {
  return (
    <section className="py-16 h-screen bg-gray-100" id="features">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600 mb-12">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl opacity-0 animate-fadeIn">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl">
                <i className="fas fa-cogs"></i>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Customizable Dashboard</h3>
            <p className="text-gray-600">
              Easily personalize your workspace and get the information that matters most to you.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl opacity-0 animate-fadeIn">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl">
                <i className="fas fa-users"></i>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Collaborative Tools</h3>
            <p className="text-gray-600">Share and work on projects with your team in real-time.</p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl opacity-0 animate-fadeIn">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl">
                <i className="fas fa-chart-line"></i>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Advanced Analytics</h3>
            <p className="text-gray-600">Gain valuable insights and make data-driven decisions.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
