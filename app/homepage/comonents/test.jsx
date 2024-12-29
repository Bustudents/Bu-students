"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function useParallax(value, start, end) {
  return useTransform(value, [0, 0.3, 0.7, 1], [start, 0, 0, end]);
}

function Section({ id, title, text, isEarlyVisible }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const fade = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  // Animation values adjusted for better responsiveness
  const titleY = useParallax(scrollYProgress, 150, -150);
  const titleZ = useParallax(scrollYProgress, 30, 60); // Less depth on mobile
  const imageY = useParallax(scrollYProgress, 0, 150);
  const imageX = useParallax(scrollYProgress, 500, -500); // Adjust for smaller screens
  const textY = useParallax(scrollYProgress, 300, -300); // Adjust for smaller screens
  const textX = useParallax(scrollYProgress, 400, -400);
  const textZ = useParallax(scrollYProgress, 20, 40); // Less depth on mobile

  return (
    <section
      ref={ref}
      style={{
        scrollSnapAlign: "start",
        scrollSnapType: "y mandatory",
        height: "150vh",
      }}
      className="flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b"
    >
      <div className="flex flex-col lg:flex-row justify-center items-center text-center lg:text-left">
        {/* Image with 3D effect */}
        <motion.div
          style={{
            y: imageY,
            x: imageX,
            opacity: fade,
            perspective: "800px", // Creating a sense of depth
            transformStyle: "preserve-3d", // Enable 3D space
          }}
          className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] overflow-hidden shadow-2xl rounded-xl mb-8 lg:mb-0"
        >
          <motion.img
            src={`/assests/${id}.jpg`}
            alt={title}
            className="top-0 rounded-2xl left-0 w-full h-full object-cover"
            style={{
              transform: "rotateY(10deg)", // Slight rotation to enhance 3D effect
            }}
          />
        </motion.div>

        {/* Related Text with Silver Effect */}
        <div className="mx-4 sm:mx-8 lg:mx-10">
          <motion.h2
            style={{
              y: titleY,
              zIndex: titleZ, // Adding depth to title
              opacity: fade,
              transition: isEarlyVisible ? "opacity 0.5s ease-in-out" : "none",
            }}
            className="relative text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 mb-6 text-4xl  sm:text-5xl lg:text-6xl font-extrabold tracking-wider uppercase shadow-2xl"
          >
            {title}
          </motion.h2>
          <motion.p
            style={{
              x: textX,
              y: textY, // Adjust Y-axis movement for mobile
              zIndex: textZ, // Adding depth to text
              opacity: fade,
              transform: "rotateX(10deg)", // Slight rotation to add depth
            }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-100 font-bold sm:text-[17px] lg:text-[37px] flex items-end justify-center h-full max-w-xl transition-all"
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
  const scaleX = useTransform(scrollYProgress, (value) => (value *1.5));


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
 className={`fixed left-0 right-0 h-[5px] bg-[#FA0000] bottom-10 ${scaleX.get() >1.5 ? "hidden" : ""}`}
        style={{ scaleX }}
      />
    </>
  );
}
