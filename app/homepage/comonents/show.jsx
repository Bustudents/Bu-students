"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const Section = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const previousY = useRef(0);

  const variants = {
    visible: { opacity: 1, y: 0 },
    hiddenDown: { opacity: 0, y: 50 },
    hiddenUp: { opacity: 0, y: -50 },
  };

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentY = entry.boundingClientRect.y;

        if (entry.isIntersecting) {
          setInView(true);
        } else {
          if (currentY < previousY.current) {
            // Scrolling down
            setInView("hiddenDown");
          } else {
            // Scrolling up
            setInView("hiddenUp");
          }
        }

        previousY.current = currentY;
      },
      { threshold: 0.05 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <motion.section
        ref={sectionRef}
        initial="hiddenDown"
        animate={inView === true ? "visible" : inView}
        variants={variants}
        transition={{ duration: 0.5, delay: 0.16 }}
        className="h-screen w-screen flex items-center justify-center relative bottom-28 xs:ml-5 2xl:ml-0 will-change"
      >
        <div className="flex flex-col items-center justify-center flex-shrink 2xl:flex-row pt-[230px]">
          {/* Image Section */}
          <motion.div
            className="mr-28"
            variants={variants}
            initial="hiddenDown"
            animate={inView === true ? "visible" : inView}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            <div className="image-container 2xl:w-[440px] 2xl:h-[440px] xs:h-[280px] xs:w-[280px]">
             
            </div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="w-full 2xl:w-1/2 pl-4"
            variants={variants}
            initial="hiddenDown"
            animate={inView === true ? "visible" : inView}
            transition={{ duration: 0.4, delay: 0.16 }}
          >
            <div className="text-white flex flex-col relative right-7 2xl:mt-0 xs:mt-10">
              <h1 className="2xl:text-[45px] xs:text-[30px] font-black tracking-tight ml-5 mb-5">
                Vision
              </h1>
              <p className="leading-tight font-extrabold 2xl:w-[525px] 2xl:mr-0 xs:mr-5 xs:w-auto 2xl:text-[45px] xs:text-[23px] ml-5">
                The <span className="text-[#FA0000]">primary</span> <br />
                purpose of founding this faculty was to provide{" "}
                <span className="text-[#FA0000]">high quality</span> education
                in business-related disciplines.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Section;
