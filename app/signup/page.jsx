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
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  
  const handleSubmit = async (e) => {
setIsLoading(true)
    e.preventDefault();

    // Set loading state immediately
 
    setError(null);
    setSuccessMessage("");
  
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false); // Stop loading on validation error
      return;
    }
  
    if (email !== confirmEmail) {
      setError("Emails do not match");
      setIsLoading(false); // Stop loading on validation error
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
        // Parse server error for better details
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred during signup");
      }
  
      // Success handling
      setSuccessMessage("Account created successfully!");
      setEmail("");
      setConfirmEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
      setGender("");
      setBatchNumber("");
      setSpecialization("");
      setIsGraduate(false);
      setCurrentPosition("");
      setLocation("");
      router.push("/signin");
    } catch (err) {
      setError(err.message);
      setIsLoading(false); // Stop loading on error
    } finally {
      // Ensure loading stops regardless of success or failure
      if (!error) {
        setIsLoading(false); // Stop loading when successful
      }
    }
  };
  

  return (
    <div className={`min-h-screen flex items-center justify-center ${  isLoading? "opacity-50" :isLoading || error ? "opacity-100": isLoading? "opacity-50" : "opacity-100"
    } bg-gray-900 text-white`}>
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
   
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
              onPaste={(e) => e.preventDefault()}              
              required
              className="w-full mt-1 p-2 border border-gray-700 rounded bg-gray-900 focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
         
         
          <div>
            <label
              htmlFor="confirmEmail"
              className="block text-sm font-medium"
            >
              Confirm email
            </label>
            <input
              type="email"
              id="confirmEmail"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              onPaste={(e) => e.preventDefault()}
              required
              className="w-full mt-1 p-2 border border-gray-700 rounded bg-gray-900 focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Confirm your email"
            />
          </div>
         
         
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onPaste={(e) => e.preventDefault()}
              required
              className="w-full mt-1 p-2 border border-gray-700 rounded bg-gray-900 focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onPaste={(e) => e.preventDefault()}
              required
              className="w-full mt-1 p-2 border border-gray-700 rounded bg-gray-900 focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Confirm your password"
            />
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
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
          <label htmlFor="batchNumber" className="block text-sm font-medium">
  Batch Number
</label>
<select
  id="batchNumber"
  value={batchNumber}
  onChange={(e) => setBatchNumber(e.target.value)}
  required
  className="w-full mt-1 p-2 border border-gray-700 rounded bg-gray-900 focus:ring focus:ring-indigo-500 focus:outline-none"
>
<option value="">select a batch number</option>

  {Array.from({ length: 19 }, (_, i) => 19 - i).map((number) => (
    <option key={number} value={number}>
      {number}
    </option>
  ))}
</select>

          </div>
          <div>
            <label
              htmlFor="specialization"
              className="block text-sm font-medium"
            >
              Specialization
            </label>
            <select
              id="specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-700 rounded bg-gray-900 focus:ring focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Select Specialization</option>
              <option value="Finance">Finance</option>
              <option value="Accounting">Accounting</option>
              <option value="Marketing">Marketing</option>
              <option value="Management">Management</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Are you a graduate?
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value={true}
                  checked={isGraduate === true}
                  onChange={() => setIsGraduate(true)}
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value={false}
                  checked={isGraduate === false}
                  onChange={() => setIsGraduate(false)}
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
          {isGraduate && (
            <>
              <div>
                <label
                  htmlFor="currentPosition"
                  className="block text-sm font-medium"
                >
                  Current Position (optional)
                </label>
                <input
                  type="text"
                  id="currentPosition"
                  value={currentPosition}
                  onChange={(e) => setCurrentPosition(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-700 rounded bg-gray-900 focus:ring focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter your current position"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium">
                  Location (optional)
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-700 rounded bg-gray-900 focus:ring focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter your location"
                />
              </div>
            </>
          )}
          <p className="text-sm text-gray-400 mt-2">
            Providing more information helps us create a better community and
            enhances your profile!
          </p>
       
          {error && (
          <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
        )}
        {successMessage && (
          <p className="mb-4 text-sm text-green-500 text-center">
            {successMessage}
          </p>
        )}
            <button
    type="submit"
    disabled={isLoading} // Disable button when loading
    className={`w-full py-2 ${
      isLoading
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-500"
    } rounded font-semibold transition`}
  >
    {isLoading ? "Submitting..." : "Sign Up"}
  </button>
</form>
      </div>
    </div>
  );
};

export default SignUpPage;
