"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import { auth } from "../homepage/firebase/firebase.config";
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "firebase/auth";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter(); // Initialize Next.js router

  const googleProvider = new GoogleAuthProvider();

  // Handle email/password sign-up
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);
      setSuccessMessage("Account created successfully!");
      // Clear the fields
      setEmail("");
      setPassword("");
      // Redirect to homepage or sign-in page
      router.push("/signin");
    } catch (err) {
      console.error("Error signing up:", err.message);
      setError(err.message);
    }
  };

  // Handle Google Sign-Up
  const handleGoogleSignUp = async () => {
    setError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google user signed up:", result.user);
      // Redirect to homepage or sign-in page
      router.push("/");
    } catch (err) {
      console.error("Error with Google Sign-Up:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
        )}
        {successMessage && (
          <p className="mb-4 text-sm text-green-500 text-center">
            {successMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
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
              required
              className="w-full mt-1 p-2 border border-gray-700 rounded bg-gray-900 focus:ring focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded font-semibold transition"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6">
          <button
            onClick={handleGoogleSignUp}
            className="w-full py-2 bg-red-600 hover:bg-red-500 rounded font-semibold transition flex items-center justify-center space-x-2"
          >
            <span>Sign up with Google</span>
          </button>
        </div>
        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <a href="/signin" className="text-indigo-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
