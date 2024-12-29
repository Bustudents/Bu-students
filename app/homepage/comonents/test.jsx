"use client"
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Sc() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, (value) => value * 1.5);

  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Subscribe to changes in scaleX
    const unsubscribe = scaleX.onChange((value) => {
      setIsHidden(value > 1.5); // Hide when scaleX exceeds 1.5
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [scaleX]);

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
      {!isHidden && (
        <motion.div
          className="fixed left-0 right-0 h-[5px] bg-[#FA0000] bottom-10"
          style={{ scaleX }}
        />
      )}
    </>
  );
}
