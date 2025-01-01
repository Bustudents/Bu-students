"use client"
import React, { useState, useEffect } from "react";

export const Hero = ({ stat }) => {
  const [is2XL, setIs2XL] = useState(false);

  // Check screen size to set rendering condition
  useEffect(() => {
    const checkScreenSize = () => {
      setIs2XL(window.innerWidth >= 1536); // Tailwind's 2xl breakpoint (1536px)
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div className="mr-0 max-w-full">
      {is2XL && (
        <div className="2xl:flex xs:hidden mr-0 overflow-x-hidden z-5 text-white text-[64px] pt-40 font-sans font-extrabold flex-col items-center justify-center">
          <div key={stat.id} className="flex flex-col justify-start">
            <div className="flex row">
              <h2 className="mr-5">Faculty of </h2>
              <h2 className="text-[#FA0000]">Business</h2>
            </div>
            <h2>Administration</h2>
          </div>
        </div>
      )}

  
        <div className="2xl:pt-44 flex flex-col xs:pt-[150px] items-center justify-center">
        {!is2XL && (<div className="2xl:hidden xs:ml-10 lg:ml-0 items-center justify-center xs:visible flex flex-col pt-20 text-[40px] font-extrabold">
            <div>Faculty of</div>
            <div className="Buss">Business</div> 
            <div>Administration</div>
          </div>)}
          <div className="flex xs:ml-12 lg:ml-0 z-5 flex-row justify-center items-center xs:scale-75 2xl:scale-100 2xl:pt-0 xs:pt-10">
            <div className="flex items-center justify-center flex-col 2xl:mr-5 xs:mr-4">
              <div className="flex flex-row m-5 justify-center items-center mb-1 flex-shrink">
                <h1 className="stat font-extrabold text-[20px] 2xl:text-[20px] xs:text-[15px]">
                  {stat.Batches}
                </h1>
                <img
                  src="/assests/mingcute_certificate-line.png"
                  alt="Batches Icon"
                />
              </div>
              <h1 className="font-black 2xl:text-[20px] xs:text-[12px]">
                Batches
              </h1>
            </div>
            <hr className="vertical-line" />
            <div className="flex items-center z-5 ml-[-20px] justify-center flex-col 2xl:mr-5 xs:mr-0">
              <div className="flex flex-row m-5 justify-center items-center mb-1">
                <h1 className="stat 2xl:text-[20px] xs:text-[15px] font-extrabold">
                  {stat.bachler} +
                </h1>
                <img
                  className="max-h-7"
                  src="/assests/game-icons_graduate-cap (1).png"
                  alt="Bachelor Graduates Icon"
                />
              </div>
              <h1 className="font-black 2xl:text-[20px] xs:text-[12px] xs:w-[140px] 2xl:w-full">
                Bachelor graduates
              </h1>
            </div>
            <hr className="vertical-line" />
            <div className="flex items-center z-5 justify-center flex-col ml-[-20px] ">
              <div className="flex flex-row m-5 justify-center items-center mb-1">
                <h1 className="stat text-[20px] font-extrabold 2xl:text-[20px] xs:text-[14px]">
                  {stat.master} +
                </h1>
                <img
                  src="/assests/tabler_certificate.png"
                  alt="Master Graduates Icon"
                />
              </div>
              <h1 className="font-black 2xl:text-[20px] xs:text-[12px] xs:w-[120px] 2xl:w-full">
                Masters graduates
              </h1>
            </div>
          </div>
        </div>
  
    </div>
  );
};

export default Hero;
