"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import { auth } from "../homepage/firebase/firebase.config";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "firebase/auth";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter(); // Initialize Next.js router

  const googleProvider = new GoogleAuthProvider();

  // Load saved email and password from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  // Save email and password to localStorage on change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    localStorage.setItem("email", e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    localStorage.setItem("password", e.target.value);
  };

  // Handle email/password sign-in
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      setSuccessMessage("Signed in successfully!");
      // Clear the fields and remove from localStorage
      setEmail("");
      setPassword("");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      // Redirect to homepage
      router.push("/"); 
    } catch (err) {
      console.error("Error signing in:", err.message);
      setError(err.message);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google user signed in:", result.user);
      // Clear the fields and remove from localStorage
      setEmail("");
      setPassword("");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      // Redirect to homepage
      router.push("/"); 
    } catch (err) {
      console.error("Error with Google Sign-In:", err.message);
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
              onChange={handleEmailChange}
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
              onChange={handlePasswordChange}
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
        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-2 bg-red-600 hover:bg-red-500 rounded font-semibold transition flex items-center justify-center space-x-2"
          >
            <span>Sign in with Google</span>
          </button>
        </div>
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
