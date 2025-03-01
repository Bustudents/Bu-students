"use client"
import React, { useState } from "react";

const resources = {
  "General Courses": {
    link: "https://drive.google.com/general_courses",
    subjects: {
      Entrepreneurship: {
        assignments: "https://drive.google.com/drive/folders/1hpqJEee0uDL3OhmeML1ynrHTO5YKpc1o?usp=drive_link",
        lectures: "https://drive.google.com/drive/folders/1oPPESTrS-OqQaNp0znru22O3hrtb6BSL?usp=drive_link",
      },
      Insurance: {
        assignments: "https://drive.google.com/drive/folders/1zobCv4Jb1Fpm-6JLGRlufw_79S-UakeU?usp=drive_link",
        lectures: "https://drive.google.com/drive/folders/1-NRPpLPM6YPCtG1bDGyqZSNFgE0JeOnK?usp=drive_link",
      },
      "Management Accounting 1": {
        assignments: "https://drive.google.com/drive/folders/1cSfoJav-K8Vhf268wmFpPTpPW0vfWiJs?usp=drive_link",
        lectures: "https://drive.google.com/drive/folders/1uDUHnam76AmPK9K2LlT0fn4sYF1rAIpy?usp=drive_link",
      },
      "Risk Management": {
        assignments: "https://drive.google.com/drive/folders/1rso1Iuog812dOFo8SbTHP2XvqdWvHqNO?usp=drive_link",
        lectures: "https://drive.google.com/drive/folders/1xVwxiCYRaE9a3WsrEAfzLLunVIkhnKXy?usp=drive_link",
      },
    },
  },
  "A & F": {
    link: "https://drive.google.com/accounting_finance",
    subjects: {
      "Financial Reporting": {
        assignments: "https://drive.google.com/drive/folders/1cO-_XEtkgn-dLFlsBqeGyfgFS2hbBgvU?usp=drive_link",
        lectures: "https://drive.google.com/drive/folders/1lL7TlGidHVFOTw8v5V7mfUm9Ouopaxgm?usp=drive_link",
      },
    },
  },
  
  
  "M & F": {
    link: "https://drive.google.com/accounting_finance",
    subjects: {
      "E-Business": {
        assignments: "https://drive.google.com/drive/folders/1dCrdq74e7leIdJ-pRpAwNKoW2J34QLWm?usp=drive_link",
        lectures: "https://drive.google.com/drive/folders/1-qEqLFUTdiafb06TUbstBO397C75Govc?usp=drive_link",
      },
    },
  },
  
  
  
  Accounting: {
    link: "https://drive.google.com/accounting",
    subjects: {
      Auditing: {
        assignments: "https://drive.google.com/drive/folders/1AT17E5J5QZMdGatjKn5X7t3c73pON431?usp=drive_link",
        lectures: "https://drive.google.com/drive/folders/1h9_wPcPXYxN9peG5rX2y0DvYzrtaZq9K?usp=drive_link",
      },
    },
  },
  Finance: {
    link: "https://drive.google.com/finance",
    subjects: {
      
      "International Finance": {
        assignments: "https://drive.google.com/drive/folders/1QQuPtKYLbG-4D6hJHln02uxXntWlsJEn?usp=drive_link",
        lectures: "https://drive.google.com/drive/folders/17CTckCSqbedNmC_ZgD2hHc7LUVQMYl7y?usp=drive_link",
      },
    },
  },
  Management: {
    link: "https://drive.google.com/management",
    subjects: {
      "Management Information System": {
        assignments: "https://drive.google.com/drive/folders/1IXDNDfEfQXh3iO_AayqWwJQCn_SwNJYj?usp=drive_link",
        lectures: "https://drive.google.com/drive/folders/1FVVwQBGDVBMwFzdWEBL1iLLEBpA98-ct?usp=drive_link",
      },
      "Supply Chain Management": {
        assignments: "https://drive.google.com/drive/folders/1JvLqFN2U-O0bUopaB_01V5Wg4dcmERH9?usp=drive_link",
        lectures: "https://drive.google.com/drive/folders/1evP-tOUm5WZ8gK7zMEovyCxuAQKco5cd?usp=drive_link",
      },
    },
  },
};

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState("General Courses"); // Default category

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">📚 Course Resources</h2>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {Object.keys(resources).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedCategory === category ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Subject List */}
        {selectedCategory && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700">{selectedCategory}</h3>
            <ul className="mt-3 space-y-4">
              {Object.keys(resources[selectedCategory].subjects).map((subject) => (
                <li key={subject} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <h4 className="text-lg font-medium text-gray-800">{subject}</h4>
                  <div className="mt-2 flex gap-4">
                    <a
                      href={resources[selectedCategory].subjects[subject].assignments}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:underline"
                    >
                      📄 Assignments
                    </a>
                    <a
                      href={resources[selectedCategory].subjects[subject].lectures}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      📚 Lectures
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
