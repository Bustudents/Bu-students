"use client"
import { useState } from "react";

const CourseOutline = () => {
  const [activeSemester, setActiveSemester] = useState(null);

  const semesters = {
    6: ["Advanced Algorithms", "Distributed Systems", "Software Engineering"],
    7: ["Machine Learning", "Cloud Computing", "Data Visualization"],
    8: ["AI Ethics", "Blockchain Technology", "Capstone Project"]
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center text-red-500 mb-6">Course Outline</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {Object.keys(semesters).map((sem) => (
          <button
            key={sem}
            onClick={() => setActiveSemester(activeSemester === sem ? null : sem)}
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
            Subjects for Semester {activeSemester}
          </h2>
          <ul className="space-y-2 max-w-md mx-auto">
            {semesters[activeSemester].map((subject, index) => (
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
  );
};

export default CourseOutline;
