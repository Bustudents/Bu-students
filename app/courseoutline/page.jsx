"use client";
import { useState } from "react";

const CourseOutline = () => {
  const [activeSemester, setActiveSemester] = useState(null);
  const [activeSpecialization, setActiveSpecialization] = useState(null);

  const semesters = {
    6: {
      "AC/FI": ["Accounting Information System", "Advanced Financial Systems", "Company Law", "Cost Accounting 2", "E-Commerce", "Managerial Economics", "Research Methodology"],
      "MG/MK": ["Cost Accounting 2", "E-Commerce","Human Resource Management", "Managerial Economics","Project Management","Research Methodology"]
    },
    7: {
      "Accounting": ["Auditing", "Entrepreneurship", "Financial Reporting","Insurance","Management Accounting 1","Risk Management"],
      "Finance": ["E-Business", "Entrepreneurship", "Insurance", "International Finance","Financial Reporting","Management Accounting 1","Risk Management"],
      "Management": ["E-Business", "Entrepreneurship", "Insurance","Management Accounting 1","Management Information Systemm","Risk Management","Supply Chain Management"],
      "Marketing": ["Entrepreneurship", "International Marketing", "Management Accounting","Marketing Research","Public Relations","Sales Management","Strategic Marketing","Supply Chain Management"]
    },
    8: {
      "Accounting": ["Auditing 2", "Corporate Finance", "Management Accounting 2", "Selected Topics in Accounting","Strategic Management","Taxation and Zakat Accounting"],
      "Finance": ["E-Banking","Capital Markets and Derivatives", "Corporate Finance", "Management Accounting 2","Selected Topics in Finance","Strategic Management"],
      "Management": ["Corporate Finance", "Industrial Relations", "International Management","Management Accounting 2","Strategic Management","Total Quality Management"],
      "Marketing": ["E-Marketing", "Consumer behaviour", "Corporate Finance","Marketing of Services","Strategic Management","Total Quality Management"]
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center text-red-500 mb-6">Course Outline</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {Object.keys(semesters).map((sem) => (
          <button
            key={sem}
            onClick={() => {
              setActiveSemester(activeSemester === sem ? null : sem);
              setActiveSpecialization(null); // Reset specialization when changing semester
            }}
            className={`w-32 p-4 border rounded-lg text-center transition-colors duration-200 ${
              activeSemester === sem ? "bg-red-500 border-red-700" : "bg-gray-800 border-gray-700 hover:bg-gray-700"
            }`}
          >
            Semester {sem}
          </button>
        ))}
      </div>

      {activeSemester && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-red-400 text-center mb-4">
            Specializations for Semester {activeSemester}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.keys(semesters[activeSemester]).map((specialization) => (
              <button
                key={specialization}
                onClick={() =>
                  setActiveSpecialization(
                    activeSpecialization === specialization ? null : specialization
                  )
                }
                className={`w-40 p-4 border rounded-lg text-center transition-colors duration-200 ${
                  activeSpecialization === specialization
                    ? "bg-red-500 border-red-700"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                }`}
              >
                {specialization}
              </button>
            ))}
          </div>

          {activeSpecialization && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-red-400 text-center mb-4">
                Subjects for {activeSpecialization} Specialization
              </h3>
              <ul className="space-y-2 max-w-md mx-auto">
                {semesters[activeSemester][activeSpecialization].map((subject, index) => (
                  <li
                    key={index}
                    className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors"
                  >
                    {subject}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseOutline;
