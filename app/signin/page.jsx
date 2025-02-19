"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import { auth } from "../homepage/firebase/firebase.config";
import { signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "firebase/auth";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter(); // Initialize Next.js router

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        // Force refresh the token and store it in localStorage
        const token = await user.getIdToken(true);
        localStorage.setItem("authToken", token);
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Polling function to check email verification
  const checkEmailVerification = async (user) => {
    const interval = setInterval(async () => {
      await user.reload();
      if (user.emailVerified) {
        clearInterval(interval);
        // Force refresh the token and store it in localStorage
        const token = await user.getIdToken(true);
        localStorage.setItem("authToken", token);
        router.push("/");
      }
    }, 3000); // Check every 3 seconds
  };

  // Handle email/password sign-in
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setIsLoading(true); // Set loading state

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed in:", user);

      // Check if email is verified
      if (!user.emailVerified) {
        if (!emailSent) { // Prevent resending email if already sent
          await sendEmailVerification(user);
          setEmailSent(true);
          setSuccessMessage("We sent an email to you. Please verify your email.");
        }
        setIsLoading(false);
        checkEmailVerification(user); // Start polling for email verification
        return;
      }

      // Get the Firebase ID token and store it in localStorage
      const token = await user.getIdToken(true);
      localStorage.setItem("authToken", token);

      // Set success message
      setSuccessMessage("Signed in successfully!");

      // Clear the fields
      setEmail("");
      setPassword("");
      setIsLoading(false); // Stop loading

      // Redirect to homepage
      router.push("/");
    } catch (err) {
      console.error("Error signing in:", err.message);
      setError("Email or password is incorrect");
      setIsLoading(false); // Stop loading on error
    }
  };

  return (
    <div className={`min-h-screen flex items-center ${isLoading ? "opacity-50" : "opacity-100"} justify-center bg-gray-900 text-white`}>
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
        )}
        {successMessage && (
          <p className="mb-4 text-sm text-green-500 text-center">{successMessage}</p>
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
            disabled={isLoading || emailSent} // Disable button during loading or if email is sent
            className={`w-full py-2 ${isLoading || emailSent ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"} rounded font-semibold transition`}
          >
            {emailSent ? "We sent an email to you" : isLoading ? "Signing In..." : "Sign In"}
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