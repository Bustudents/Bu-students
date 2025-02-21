"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function useParallax(scrollYProgress, start, end) {
  return useTransform(scrollYProgress, [0, 0.5, 0.9, 1], [start, 0, 0, end]);
}

function Section({ id, title, text }) {
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
      style={{ scrollSnapAlign: "start", scrollSnapType: "y mandatory", height: "215vh" }}
      className="flex flex-col xs:mt-[-700px] 2xl:mt-[-500px] h-min justify-center ml-10 items-center relative overflow-hidden bg-gradient-to-b"
    >
      <div className="flex flex-col lg:flex-row justify-center  items-center text-center lg:text-left">
        {/* Image with 3D effect */}
        <motion.div
          style={{ y: imageY, x: imageX, opacity: fade, perspective: "800px", transformStyle: "preserve-3d" }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }} // Smoother spring animation
          className="w-[250px] h-[250px]  sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] overflow-hidden shadow-2xl rounded-xl mb-8 lg:mb-0"
        >
          <div className="absolute inset-0  bg-gradient-to-r from-red-500 to-purple-950 rounded-xl opacity-20" />
          <motion.img
            src={`/assests/${id}.png`}
            alt={title}
            className="top-0   rounded-2xl left-0 w-full mr-20 h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          />
        </motion.div>

        {/* Title and Text with Enhanced Gradient */}
        <div className="mx-4 sm:mx-8 lg:mx-10">
          <motion.h2
            style={{ y: titleY, zIndex: titleZ, opacity: fade }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="relative text-transparent bg-clip-text bg-gradient-to-r  from-blue-300 via-purple-700 to-red-300 text-5xl font-extrabold "
          >
            {title}
          </motion.h2>
          <motion.p
            style={{ x: textX, y: textY, zIndex: textZ, opacity: fade }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="text-transparent xs:max-w-[350px] lg:max-w-[520px]  bg-clip-text bg-gradient-to-r from-gray-400 to-gray-100 font-bold text-[20px] sm:text-[40px] lg:text-[37px] flex items-end justify-center h-full max-w-xl transition-all"
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
    { id: "19p", title: "To whom", text: "Bacth 19 students who rely on organized materials, streamlined course outlines, and academic tools." },
    { id: "download", title: "Objective", text: "Providing structured educational resources, supporting academic growth, and enhancing digital accessibility for students and faculty." },
    { id: "approach", title: "Approach", text: "Utilizing modern web technologies to ensure seamless navigation, accessibility, and continuous improvement of academic resources." },
  ]; 

  return (
    <>
      {sections.map((section) => (
        <Section key={section.id} {...section} />
      ))}

      {/* Scroll progress bar */}
      <motion.div
        className="fixed left-0 right-0 h-[5px] bg-[#FA0000] bottom-10"
        style={{ scaleX, opacity }}
      />
    </>
  );
}
