"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [isGraduate, setIsGraduate] = useState(false);
  const [currentPosition, setCurrentPosition] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setSuccessMessage("");

    const errors = {};
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      errors.email = "Please enter a valid email address.";
    }
    if (email !== confirmEmail) {
      errors.confirmEmail = "Email addresses do not match.";
    }
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) {
      errors.password =
        "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number.";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    if (!name.trim()) {
      errors.name = "Name is required.";
    }
    if (!gender) {
      errors.gender = "Gender is required.";
    }
    if (!batchNumber.trim()) {
      errors.batchNumber = "Batch number is required.";
    }
    if (!specialization.trim()) {
      errors.specialization = "Specialization is required.";
    }
    if (isGraduate && !currentPosition.trim()) {
      errors.currentPosition = "Current position is required for graduates.";
    }
    if (!location.trim()) {
      errors.location = "Location is required.";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    const userData = {
      email,
      name,
      password,
      gender,
      batchNumber,
      specialization,
      isGraduate,
      currentPosition: isGraduate ? currentPosition : "",
      location,
    };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      setSuccessMessage("Account created successfully!");
      router.push("/signin");
    } catch (err) {
      setError({ general: err.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        {error.general && (
          <p className="mb-4 text-sm text-red-500 text-center">
            {error.general}
          </p>
        )}
        {successMessage && (
          <p className="mb-4 text-sm text-green-500 text-center">
            {successMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-700 rounded bg-gray-900 focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your name"
            />
            {error.name && (
              <p className="text-sm text-red-500 mt-1">{error.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-700 rounded bg-gray-900 focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your email"
              onPaste={(e) => e.preventDefault()}
            />
            {error.email && (
              <p className="text-sm text-red-500 mt-1">{error.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirmEmail" className="block text-sm font-medium">
              Confirm Email
            </label>
            <input
              type="email"
              id="confirmEmail"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-700 rounded bg-gray-900 focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Re-enter your email"
              onPaste={(e) => e.preventDefault()}
            />
            {error.confirmEmail && (
              <p className="text-sm text-red-500 mt-1">{error.confirmEmail}</p>
            )}
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-700 rounded bg-gray-900 focus:ring focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            
            </select>
            {error.gender && (
              <p className="text-sm text-red-500 mt-1">{error.gender}</p>
            )}
          </div>
          <div>
            <label htmlFor="batchNumber" className="block text-sm font-medium">
              Batch Number
            </label>
            <input
              type="text"
              id="batchNumber"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-700 rounded bg-gray-900 focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your batch number"
            />
            {error.batchNumber && (
              <p className="text-sm text-red-500 mt-1">{error.batchNumber}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="specialization"
              className="block text-sm font-medium"
            >
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-700 rounded bg-gray-900 focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your specialization"
            />
            {error.specialization && (
              <p className="text-sm text-red-500 mt-1">
                {error.specialization}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">
              Are you a graduate?
            </label>
            <div className="flex items-center space-x-4 mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value={true}
                  checked={isGraduate === true}
                  onChange={() => setIsGraduate(true)}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value={false}
                  checked={isGraduate === false}
                  onChange={() => setIsGraduate(false)}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
          {isGraduate && (
            <div>
              <label
                htmlFor="currentPosition"
                className="block text-sm font-medium"
              >
                Current Position
              </label>
              <input
                type="text"
                id="currentPosition"
                value={currentPosition}
                onChange={(e) => setCurrentPosition(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-700 rounded bg-gray-900 focus:ring focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter your current position"
              />
              {error.currentPosition && (
                <p className="text-sm text-red-500 mt-1">
                  {error.currentPosition}
                </p>
              )}
            </div>
          )}
          <div>
            <label htmlFor="location" className="block text-sm font-medium">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-700 rounded bg-gray-900 focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your location"
            />
            {error.location && (
              <p className="text-sm text-red-500 mt-1">{error.location}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded font-semibold transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
