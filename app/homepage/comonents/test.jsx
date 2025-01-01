"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function useParallax(scrollYProgress, start, end) {
  return useTransform(scrollYProgress, [0, 0.5, 0.9, 1], [start, 0, 0, end]);
}

function Section({ id, title, text, isEarlyVisible }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  // Create transforms using the custom hook
  const fade = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);

  const titleY = useParallax(scrollYProgress, 150, -150);
  const titleZ = useParallax(scrollYProgress, 30, 60);
  const imageY = useParallax(scrollYProgress, 0, 100);
  const imageX = useParallax(scrollYProgress, 300, -300);
  const textY = useParallax(scrollYProgress, 200, -200);
  const textX = useParallax(scrollYProgress, 300, -300);
  const textZ = useParallax(scrollYProgress, 20, 40);

  return (
    <section
     
    ref={ref}
      style={{
        scrollSnapAlign: "start",
        scrollSnapType: "y mandatory",
        height: "215vh", // Reduced height for less spacing
      }}
      className="flex flex-col xs:mt-[-700px] 2xl:mt-[-600px] h-min justify-center ml-10 items-center relative overflow-hidden bg-gradient-to-b"
    >
      <div className="flex flex-col lg:flex-row justify-center items-center text-center lg:text-left">
        {/* Image with 3D effect */}
        <motion.div
          style={{
            y: imageY,
            x: imageX,
            opacity: fade,
            perspective: "800px",
            transformStyle: "preserve-3d",
          }}
          transition={{ duration: 1.5, ease: "easeOut" }} // Slower animation
          className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] overflow-hidden shadow-2xl rounded-xl mb-8 lg:mb-0"
        >
          <motion.img
            src={`/assests/${id}.jpg`}
            alt={title}
            className="top-0 rounded-2xl left-0 w-full h-full object-cover"
            style={{
              transform: "rotateY(10deg)",
            }}
          />
        </motion.div>

        {/* Related Text with Silver Effect */}
        <div className="mx-4 sm:mx-8 lg:mx-10">
          <motion.h2
            style={{
              y: titleY,
              zIndex: titleZ,
              opacity: fade,
            }}
            transition={{ duration: 1.5, ease: "easeOut" }} // Slower animation
            className="relative text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500  text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-wider uppercase shadow-2xl"
          >
            {title}
          </motion.h2>
          <motion.p
            style={{
              x: textX,
              y: textY,
              zIndex: textZ,
              opacity: fade,
            }}
            transition={{ duration: 1.5, ease: "easeOut" }} // Slower animation
            className="text-transparent   xs:max-w-[350px]  lg:max-w-[520px] bg-clip-text bg-gradient-to-r mb-2 from-gray-400 to-gray-100 font-bold  text-[22px] sm:text-[40px] lg:text-[37px] flex items-end justify-center h-full max-w-xl transition-all"
          >
            {text}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export default function Sc() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, (value) => Math.min(value, 0.8));
  const opacity = useTransform(scaleX, (value) => (value === 0.8 ? 0 : 1));
  

  const sections = [
    {
      id: "vision",
      title: "Vision",
      text: "Providing high-quality education that empowers students with the knowledge, skills, and values needed for success in business-related disciplines.",
      isEarlyVisible: true,
    },
    {
      id: "mission",
      title: "Mission",
      text: "Providing high-quality education that equips students with the knowledge, skills, and values to succeed in their careers.",
      isEarlyVisible: false,
    },
    {
      id: "value",
      title: "Value",
      text: "Fostering a culture of integrity, excellence, and innovation, empowering students to succeed and make a positive impact in the world.",
      isEarlyVisible: false,
    },
  ];

  return (
    <>
      {/* Render Sections */}
      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          text={section.text}
          isEarlyVisible={section.isEarlyVisible}
        />
      ))}

      {/* Scroll progress bar */}
      <motion.div
        className={`fixed left-0 right-0 h-[5px] bg-[#FA0000] bottom-10 `}
        style={{ scaleX,opacity }}
      />
    </>
  );
}
