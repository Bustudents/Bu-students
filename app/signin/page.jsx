"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import { auth } from "../homepage/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter(); // Initialize Next.js router

  // Handle email/password sign-in
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      setSuccessMessage("Signed in successfully!");
      // Clear the fields
      setEmail("");
      setPassword("");
      // Redirect to homepage
      router.push("/"); 
    } catch (err) {
      console.error("Error signing in:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
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
            Sign In
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-400">
          {`Don't have an account? `}
          <a href="/signup" className="text-indigo-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
