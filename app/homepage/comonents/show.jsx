"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const Section = () => {
  const { scrollYProgress } = useScroll();
  
  // Track scroll to animate the gallery
  const galleryRef = useRef(null);
  const [items, setItems] = useState([]);

  // Translate gallery horizontally based on scroll
  const translateX = useTransform(scrollYProgress, [0, 1], ["0%", `-${items.length - 1}00vw`]);

  // Progress bar animation
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Parallax effect for titles
  const segmentLength = 1 / items.length;
  const titleOffsets = items.map((_, i) => {
    return useTransform(scrollYProgress, [i * segmentLength, (i + 1) * segmentLength], [200, -200]);
  });

  useEffect(() => {
    if (galleryRef.current) {
      const galleryItems = galleryRef.current.querySelectorAll("li");
      setItems(galleryItems);
    }
  }, []);

  return (
    <div>
      <motion.section className="h-screen w-screen flex items-center justify-center relative bottom-28 xs:ml-5 2xl:ml-0 will-change">
        <motion.ul ref={galleryRef} className="flex overflow-hidden">
          {/* Render gallery items */}
          {items.map((_, index) => (
            <motion.li
              key={index}
              className="w-screen flex-shrink-0"
              style={{
                transform: titleOffsets[index] && `translateX(${titleOffsets[index]}px)`,
              }}
            >
              <div className="h-full w-full bg-gray-300">
                {/* Image or content */}
                <h2 className="text-white text-3xl font-bold">Item {index + 1}</h2>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* Progress Bar */}
        <motion.div
          className="progress fixed top-0 left-0 w-full h-1 bg-red-500"
          style={{ scaleX }}
        />
      </motion.section>
    </div>
  );
};

export default Section;
