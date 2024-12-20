"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import style from "../style";
import ListWithOverlay from "./list";
import { useRouter } from "next/navigation";

const Nav = () => {
  const [user, setUser] = useState(null);
  const router = useRouter(); // Initialize Next.js router

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });

    return () => unsubscribe(); // Clean up subscription
  }, []);

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      router.push("/signin"); // Redirect to sign-in page after sign-out
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  // Scroll to footer
  const scrollToFooter = () => {
    const footerElement = document.getElementById("footer");
    footerElement?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pt-7 relative 2xl:bottom-0 xs:bottom-[100px] xs:flex-col 2xl:flex-row  flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex 2xl:text-[24px] xs:text-[16px] font-extrabold ml-10">
        <h1 className="text-white xs:mb-5 2xl:mb-0 xs:mt-3 2xl:mt-0 xs:tracking-[17px] 2xl:tracking-normal flex 2xl:ml-0 xs:ml-[-30px]">Bu-students</h1>
      </div>

      {/* Navigation Section */}
      <div className="mr-20">
        <nav className="flex">
          {/* About Us Button */}
          <button
            onClick={scrollToFooter}
            className="hover:border-red-700 2xl:flex xs:hidden hover:scale-110 sign navanime hover:bg-primary 
            2xl:text-[16px] xs:text-[12px] px-6 py-2 font-extrabold 
            border-solid border-white transition-all duration-300 ease-in-out 
            text-white border-2 rounded-full flex items-center justify-center mr-7"
          >
            about us
          </button>

          {/* Sign In / Logged Button */}
          {user ? (
            <button
              onClick={handleSignOut}
              className={`hover:border-red-700 2xl:flex  hover:scale-110 px-5 py-2 
              ${style.row} border-solid p-3 border-white transition-all 
              duration-300 ease-in-out text-white border-2 rounded-full
              items-center mr-24`}
            >
              <h3 className="2xl:text-[16px] xs:text-[10px] xs:w-[50px] 2xl:w-full  font-extrabold text-white mr-2   ">sign out</h3>
              <img src="/assests/Vector (2).png " className="2xl:h-3 2xl:w-3 xs:h-2 xs:w-2" />
            </button>
          ) : (
            <button
              className={`hover:border-red-700 2xl:flex hover:scale-110 px-5 py-2 
              ${style.row} border-solid p-3 border-white transition-all 
              duration-300 ease-in-out text-white border-2 rounded-full
              items-center mr-24`}
            >
              <Link href={"/signin"}>
                <h3 className="2xl:text-[16px]  xs:text-[14px]   xs:w-[50px] 2xl:w-full font-extrabold text-white mr-3">sign in</h3>
              </Link>
              <img src="/assests/Vector (2).png" className="2xl:h-3 2xl:w-3 xs:h-2 xs:w-2" />
            </button>
          )}

          {/* Overlay List Component */}
          <div className="relative 2xl:left-0 xs:left-16">
            <ListWithOverlay />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
