"use client";
import { FaInfoCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import style from "../style";
import ListWithOverlay from "./list";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

const Nav = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(() => {
    return typeof window !== "undefined" ? localStorage.getItem("userName") || "User" : "User";
  });

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async (currentUser) => {
      try {
        const authToken = await currentUser.getIdToken();
        if (!authToken) return router.push("/signin");

        const response = await fetch("/api/GetSpecalization", {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (response.ok) {
          const data = await response.json();
          const userName = data?.userData?.firstName || "User";
          
          // Only update state & localStorage if the name is different
          if (userName !== name) {
            setName(userName);
            localStorage.setItem("userName", userName);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setName("User");
        localStorage.removeItem("userName");
      } else {
        setUser(currentUser);
        fetchUserData(currentUser);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="2xl:pt-7 xs:pt-10 relative 2xl:bottom-0 mr-0 xs:bottom-[100px] 2xl:flex-row flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex 2xl:text-[24px] xs:text-[14px] font-extrabold ml-10">
        <h1 className="text-white xs:mb-5 2xl:mb-0 xs:mt-3 2xl:mt-0 2xl:tracking-normal flex ml-4 riddle">
          B<span className="u">u</span> -students
        </h1>
      </div>

      {/* Navigation Section */}
      <div className="lg:mr-20 xs:mr-20">
        <nav className="flex">
          {/* About Us Button */}
          <button
            onClick={() =>
              document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:bg-red-700 2xl:flex xs:hidden hover:scale-110 sign navanime hover:bg-primary 
            2xl:text-[16px] xs:text-[12px] px-6 py-2 font-extrabold 
            border-solid border-white transition-all duration-300 ease-in-out 
            text-white border-2 rounded-full flex items-center justify-center mr-7 butto"
          >
            <FaInfoCircle className="mr-2" /> About Us
          </button>

          {/* Sign In / Logged-in Button */}
          {user ? (
            <Link href="/userinfo">
              <button
                className={`hover:bg-none 2xl:flex hover:scale-110 butto px-0  
                ${style.row} border-solid p-3 border-white 
                text-white border-2 rounded-full relative 2xl:left-0 xs:left-11
                items-center 2xl:mr-24 xs:mr-0 2xl:pl-5 xs:pl-3 xs:p-3 2xl:p-3 bg-red-50`}
              >
                <h3 className="2xl:text-[18px] xs:text-[14px] font-bold text-transparent 
                  bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 
                  drop-shadow-lg tracking-wide px-4 py-1 rounded-lg"
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </h3>
              </button>
            </Link>
          ) : (
            <Link href="/signin">
              <button
                className={`hover:bg-red-700 hover:scale-110 butto transition-all duration-300 
                flex items-center border-solid border-white text-white border-2 
                rounded-full px-4 py-2 relative 2xl:left-0 xs:left-11 
                2xl:mr-24 xs:mr-6 2xl:p-3 xs:p-2`}
              >
                <LogIn className="w-5 h-5 text-white" />
                <h3 className="text-[14px] font-extrabold p-2 text-white">Sign In</h3>
              </button>
            </Link>
          )}

          {/* Overlay List Component */}
          <div className="relative 2xl:left-0 xs:left-16 top-0">
            <ListWithOverlay />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
