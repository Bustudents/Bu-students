"use client";
import { Timestamp } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../homepage/firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import Select from "react-select";
import exp from "constants";
import { Calendar } from "lucide-react";

const subjectsBySpecialization = {
  Common: ["Entrepreneurship", "Insurance", "Management Accounting 1", "Risk Management"],
  "Accounting and Finance": ["Financial reporting"],
  Accounting: ["Auditing"],
  Finance: ["E-Business", "International Finance"],
  Management: ["Management Information System", "Supply Chain Management"],
};

const specializationOptions = [
  { value: "common", label: "Common" },
  { value: "Accounting and Finance", label: "Accounting and Finance" },
  { value: "Accounting", label: "Accounting" },
  { value: "Finance", label: "Finance" },
  { value: "Management", label: "Management" },
];

const typeOptions = [
  { value: "assignment", label: "Assignment" },
  { value: "presentation", label: "Presentation" },
  { value: "general", label: "General" },
];

export default function UploadEventForm() {
  const router = useRouter();
  const [date, setDate] = useState(Date.now());
  const [specialization, setSpecialization] = useState([]);
  const [type, setType] = useState("assignment");
  const [preview, setPreview] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [canUpload, setCanUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [general, setGeneral] = useState(false);

  useEffect(() => {
    const cachedGeneral = localStorage.getItem("general") === "true";
  
    setGeneral(cachedGeneral); // Set initial value from cache
  
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/signin");
        return;
      }
      setUser(currentUser);
      try {
        const token = await currentUser.getIdToken();
        setAuthToken(token);
  
        const userResponse = await fetch("/api/GetSpecalization", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (userResponse.ok) {
          const userData = await userResponse.json();
          const isGeneral = userData?.userData?.general;
         const isFirstname=userData?.userData?.firstName
          
         setSpecialization([...userData?.userData?.specialization || []]);
          setFirstName(isFirstname);
          setGeneral(isGeneral);
          setCanUpload(userData?.userData?.access);
          localStorage.setItem("firstName", isFirstname);
          // Cache the general value for future use
          localStorage.setItem("general", isGeneral);
        } else {
          alert("Failed to fetch user specialization.");
          router.push("/signin");
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        router.push("/signin");
      }
    });
  
    return () => unsubscribe();
  }, [router]);
  
  useEffect(() => {
    const allSubjects = new Set();
    Object.values(subjectsBySpecialization).forEach((subjectList) => {
      subjectList.forEach((subject) => allSubjects.add(subject));
    });
    setSubjects(Array.from(allSubjects));
  }, []);

  const handleSpecializationChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    const updatedSpecialization = selectedValues.includes("Accounting and Finance")
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
      const eventData = {
        date: new Date(date),
        specialization,
        type,
        title,
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
        setPreview(false);
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
      <div className={`w-full max-w-md ${general ? "bg-purple-500" : "bg-[#98FF98]"} rounded-2xl shadow-xl p-6`}>
        <h1 className="lg:text-2xl flex justify-center items-center font-extrabold text-center text-[#0c0c41] mb-6 tracking-wide">
          <p className="z-20">Welcome {firstName}</p>
          <img src={general ? "/assests/killua.png" : "/assests/budget.png"} className={`${general ? "z-10 h-[80px] w-[80px]" : "z-10 h-10 w-10 ml-3"}`} />
        </h1>

        {!preview ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
              <input
                type="datetime-local"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={new Date(date).toISOString().slice(0, -8)}
                onChange={(e) => setDate(new Date(e.target.value).getTime())}
              />
            </div>

            <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Specialization
  </label>
  <Select
    isMulti
    options={specializationOptions}
    value={specializationOptions.filter((option) =>
      specialization.includes(option.value)
    )}
    onChange={handleSpecializationChange}
    className="react-select-container"
    classNamePrefix="react-select"
  />
</div>

<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    {general ? "Enter Title" : "Select Subject"}
  </label>
  {general ? (
    <input
      type="text"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Enter a title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  ) : (
    <Select
      options={subjects.map((subject) => ({ value: subject, label: subject }))}
      isDisabled={!subjects.length}
      placeholder="Select Subject"
      className="react-select-container"
      classNamePrefix="react-select"
      onChange={(selectedOption) => setTitle(selectedOption.value)}
    />
  )}
</div>

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

            <button
              onClick={() => setPreview(true)}
              className={`w-full ${general? "bg-pink-800":"bg-blue-600"} text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300`}
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
              <p><strong>Specialization:</strong> {specialization.join(", ")}</p>
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

