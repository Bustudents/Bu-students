"use client";
import { Timestamp } from "firebase/firestore"; // Import Firestore Timestamp
import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../homepage/firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import Select from "react-select"; // Import react-select

export default function UploadEventForm() {
  const router = useRouter();
  const [date, setDate] = useState(Date.now());
  const [Specialization, setSpecialization] = useState([]);
  const [type, setType] = useState("assignment");
  const [preview, setPreview] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [canUpload, setCanUpload] = useState(false);
  const [title, setTitle] = useState(""); // Added title state
 const [firstName,setfirstName] = useState()
  
 const subjectsBySpecialization = {
    Common: ["Entrepreneurship", "Insurance", "Management Accounting 1", "Risk Management"],
    "Accounting and Finance": ["Financial Reporting", "Insurance", "Management Accounting 1", "Risk Management"],
    Accounting: ["Auditing"],
    Finance: ["E-Business", "International Finance"],
    Management: ["Management Information System", "Supply Chain Management"],
  };

  // Options for react-select
  const specializationOptions = [
    { value: "Common", label: "Common" },
    { value: "Accounting and Finance", label: "Accounting and Finance" },
    { value: "Accounting", label: "Accounting" },
    { value: "Finance", label: "Finance" },
    { value: "Management", label: "Management" },
  ];

  const typeOptions = [
    { value: "assignment", label: "Assignment" },
    { value: "presentation", label: "Presentation" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/signin");
        return;
      }
      setUser(currentUser);
      try {
        const token = await currentUser.getIdToken();
        setAuthToken(token);
  
        // Check if first name is already cached
        const cachedFirstName = localStorage.getItem("firstName");
        if (cachedFirstName) {
          setfirstName(cachedFirstName); // Use cached first name
        } else {
          const userResponse = await fetch("/api/GetSpecalization", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
  
          if (userResponse.ok) {
            const userData = await userResponse.json();
            const firstName = userData?.userData?.firstName;
            setfirstName(firstName);
  
            // Cache the first name
            localStorage.setItem("firstName", firstName);
  
            setSpecialization([...userData?.userData?.specialization || []]);
            setCanUpload(userData?.userData?.access);
          } else {
            alert("Failed to fetch user specialization.");
            router.push("/signin");
          }
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        router.push("/signin");
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (Specialization.includes("Common")) {
      setSubjects(subjectsBySpecialization.Common);
    } else {
      const selectedSubjects = new Set();
      Specialization.forEach((spec) => {
        if (subjectsBySpecialization[spec]) {
          subjectsBySpecialization[spec].forEach((subject) => selectedSubjects.add(subject));
        }
      });
      setSubjects(Array.from(selectedSubjects));
    }
  }, [Specialization]);

  const handleSpecializationChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
  
    // Ensure "Accounting and Finance" is correctly split
    let updatedSpecialization = selectedValues.includes("Accounting and Finance")
      ? ["Accounting", "Finance"]
      : selectedValues;
  
    setSpecialization(updatedSpecialization);
  };
  

  const handleSubmit = async () => {
    if (!authToken || !canUpload) {
      alert("Unauthorized! Please log in or you do not have access.");
      return;
    }

    if (!title) {
      alert("Please provide a title for the event.");
      return;
    }

    try {
      // Convert the date to a Firestore Timestamp
      const firestoreDate = Timestamp.fromMillis(date);


      const eventData = {
        date:  new Date(date), // Use the Firestore Timestamp
        Specialization, // This will store multiple specializations as separate items
        type,
        title, // Include the title in the event data
        // Add other fields here
      };

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();
      if (result.success) {
        alert("Event uploaded successfully!");
        setPreview(false); // Reset preview after successful submission
        router.push("/calnder");
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Failed to upload event:", error);
      alert("Failed to upload event. Please try again.");
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-md bg-[#98FF98] rounded-2xl shadow-xl p-6">
      <h1 className="text-3xl flex justify-center items-center font-extrabold text-center text-[#0c0c41] mb-6 tracking-wide ">
<p>  Welcome {firstName} </p> <img src="/assests/budget.png" className=" h-9 w-9 ml-3"/>
</h1>

  

        {!preview ? (
          <>
            {/* Title Input */}
            

            {/* Date Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
              <input
                type="datetime-local"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={new Date(date).toISOString().slice(0, -8)}
                onChange={(e) => setDate(new Date(e.target.value).getTime())}
              />
            </div>

            {/* Specialization Multi-Select */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
              <Select
                isMulti
                options={specializationOptions}
                value={specializationOptions.filter((option) =>
                  Specialization.includes(option.value)
                )}
                onChange={handleSpecializationChange}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            {/* Subject Dropdown */}
            <Select
  options={subjects.map((subject) => ({ value: subject, label: subject }))}
  isDisabled={!subjects.length}
  placeholder="Select Subject"
  className="react-select-container"
  classNamePrefix="react-select"
  onChange={(selectedOption) => setTitle(selectedOption.value)}
/>


            {/* Type Dropdown */}
            <div className="mb-6">
              <label className="block mt-3 text-sm font-medium text-gray-700 mb-1">Type</label>
              <Select
                options={typeOptions}
                value={typeOptions.find((option) => option.value === type)}
                onChange={(selectedOption) => setType(selectedOption.value)}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            {/* Preview Button */}
            <button
              onClick={() => setPreview(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Preview
            </button>
          </>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Preview</h2>
            <div className="space-y-3">
              <p><strong>Title:</strong> {title}</p>
              <p><strong>Date:</strong> {new Date(date).toLocaleString()}</p>
              <p><strong>Specialization:</strong> {Specialization.join(", ")}</p>
              <p><strong>Type:</strong> {type}</p>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setPreview(false)}
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}