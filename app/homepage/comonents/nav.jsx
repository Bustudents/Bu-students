"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import style from "../style";
import ListWithOverlay from "./list";
import { useRouter } from "next/navigation";

const Nav = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Add loading state
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false after auth state changes
      console.log(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      router.push("/signin");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const scrollToFooter = () => {
    const footerElement = document.getElementById("footer");
    footerElement?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div>Loading...</div>  // Show loading screen while the auth state is being checked
    );
  }

  return (
    <div className="2xl:pt-7 xs:pt-10 relative 2xl:bottom-0  mr-0 xs:bottom-[100px] 2xl:flex-row  flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex 2xl:text-[24px] xs:text-[14px] font-extrabold ml-10">
      <h1 className="text-white xs:mb-5 2xl:mb-0 xs:mt-3 2xl:mt-0 2xl:tracking-normal flex ml-4 riddle  ">B<span className="u" >u</span> -students</h1>

      </div>

      {/* Navigation Section */}
      <div className="lg:mr-20 xs:mr-20">
        <nav className="flex">
          {/* About Us Button */}
          <button
            onClick={scrollToFooter}
            className="hover:border-red-700 2xl:flex xs:hidden hover:scale-110 sign navanime hover:bg-primary 
            2xl:text-[16px] xs:text-[12px] px-6 py-2 font-extrabold 
            border-solid border-white transition-all duration-300 ease-in-out 
            text-white border-2 rounded-full flex items-center justify-center mr-7  butto"
          >
            about us
          </button>

          {/* Sign In / Logged Button */}
          {user ? (
            <button
              onClick={handleSignOut}
              className={`hover:border-red-700   2xl:flex hover:scale-110  butto px-0  
              ${style.row} border-solid p-3 border-white 
            text-white border-2 rounded-full relative 2xl:left-0 xs:left-11
              items-center 2xl:mr-24 xs:mr-0 2xl:pl-5 xs:pl-3 xs:p-3  2xl:p-3`}
            >
              <h3 className="2xl:text-[16px] xs:text-[12px] xs:w-full 2xl:w-full font-extrabold text-white xs:mr-1 2xl:mr-3   ">&nbsp;sign out&nbsp;</h3>
             
            </button>
          ) : (
            <Link href={"/signin"} >
            <button
              className={`hover:border-red-700   2xl:flex hover:scale-110  butto px-0 
                ${style.row} border-solid p-3 border-white 
              text-white border-2 rounded-full relative 2xl:left-0 xs:left-11
                items-center 2xl:mr-24 xs:mr-0 2xl:pl-4 xs:pl-2 xs:p-3  2xl:p-3`}
            >
             
                <h3 className="2xl:text-[16px]  xs:text-[12px]    xs:w-full 2xl:w-full font-extrabold text-white xs:mr-1 2xl:mr-3 pl-2   ">&nbsp;sign in&nbsp;</h3>
         
            </button>  </Link>
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
