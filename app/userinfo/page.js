"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import { auth } from "../homepage/firebase/firebase.config";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          router.push("/");
          return;
        }

        // Retrieve the current user's ID token
        const authToken = await currentUser.getIdToken();
        if (!authToken) {
          router.push("/");
          return;
        }

        const headers = {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        };

        const response = await fetch("/api/GetSpecalization", {
          method: "GET",
          headers,
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUserData(data?.userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  if (loading) return <div className="text-center flex items-center justify-center text-white  relative xs:top-96 lg:top-72">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        {/* Stylized Full Name */}
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg tracking-wide">
          {`${userData?.firstName?.charAt(0).toUpperCase() + userData?.firstName?.slice(1)} ${userData?.lastName?.charAt(0).toUpperCase() + userData?.lastName?.slice(1)}`}
        </h1>

        <div className="mt-4 space-y-3">
          <p className="text-lg font-semibold">📧 Email:</p>
          <p className="text-gray-300">{userData?.email}</p>

          <p className="text-lg font-semibold mt-3">🎓 Specialization:</p>
          <p className="text-gray-300">{userData?.specialization || "Not specified"}</p>
        </div>

        <button
          onClick={handleSignOut}
          className="mt-6 w-full py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition duration-300"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
