"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../homepage/firebase/firebase.config";
import { 
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  onAuthStateChanged 
} from "firebase/auth";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        if (user.emailVerified) {
          const token = await user.getIdToken(true);
          localStorage.setItem("authToken", token);
          router.push("/");
        }
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Polling function to check email verification every 5 seconds
  const checkEmailVerification = async (currentUser) => {
    const interval = setInterval(async () => {
      await currentUser.reload(); // Refresh user data
      if (currentUser.emailVerified) {
        clearInterval(interval); // Stop checking
        const token = await currentUser.getIdToken(true);
        localStorage.setItem("authToken", token);
        router.push("/");
      }
    }, 3000); // Check every 5 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);

      if (!user.emailVerified) {
        // Send email immediately if not sent before
        if (!verificationSent) {
          await sendEmailVerification(user);
          setVerificationSent(true);
          setSuccessMessage("Verification email sent! Please check your inbox.");
        }
        checkEmailVerification(user);
      } else {
        const token = await user.getIdToken(true);
        localStorage.setItem("authToken", token);
        setSuccessMessage("Signed in successfully!");
        setEmail("");
        setPassword("");
        router.push("/");
      }
    } catch (err) {
      console.error("Error signing in:", err.message);
      setError("Incorrect email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (user && !user.emailVerified) {
      try {
        await sendEmailVerification(user);
        setVerificationSent(true);
        setSuccessMessage("Verification email resent! Check your inbox.");
      } catch (err) {
        console.error("Error resending email:", err.message);
        setError("Failed to resend verification email.");
      }
    }
  };

  return (
    <div className={`min-h-screen flex items-center ${isLoading ? "opacity-50" : "opacity-100"} justify-center bg-gray-900 text-white`}>
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        {error && <p className="mb-4 text-sm text-red-500 text-center">{error}</p>}
        {successMessage && <p className="mb-4 text-sm text-green-500 text-center">{successMessage}</p>}
        
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
            disabled={isLoading} 
            className={`w-full py-2 ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"} rounded font-semibold transition`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Resend Email Button */}
        {user && !user.emailVerified && (
          <div className="mt-4 text-center">
            <button 
              onClick={handleResendEmail} 
              disabled={verificationSent} 
              className={`text-indigo-500 hover:underline ${verificationSent ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {verificationSent ? "Verification Email Sent" : "Resend Email"}
            </button>
          </div>
        )}

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
