
import React from 'react';
import Link from 'next/link';
import { FaCalendarAlt, FaClipboardList, FaBook, FaUsers, FaChalkboardTeacher, FaCloud } from 'react-icons/fa';

const features = [
  {
    icon: <FaCalendarAlt className="text-purple-400 text-4xl" />, 
    title: "Academic Calendar",
    description: "Stay updated with important academic dates and events.",
     herf:"/calnder"
  },
 
  {
    icon: <FaBook className="text-purple-400 text-4xl" />, 
    title: "Course Materials",
    description: "Download and manage study materials for your courses.",
        herf:"/Resources"
 
  },
  {
    icon: <FaUsers className="text-purple-400 text-4xl" />, 
    title: "course outline",
    description: "Explore up coming semeters subjects",
      herf:"/courseoutline"
  
  },
  {
    icon: <FaChalkboardTeacher className="text-purple-400 text-4xl" />, 
    title: "Post graduation guide",
    description: "Coming soon",
      herf:"/Posgraduation"
  },
 
];

const Features = () => {
  return (
    <section className="py-16  text-white" id="features">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-12">
          Website Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link key={index} href= {`${feature.herf}`}>
            <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-lg op  transform transition-all hover:scale-105 hover:shadow-2xl">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
