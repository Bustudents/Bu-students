"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const Mohmed = () => {
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
    <div className="2xl:ml-5 xs:ml-20">
      <motion.section
        ref={sectionRef}
        initial="hiddenDown"
        animate={inView === true ? "visible" : inView}
        variants={variants}
        transition={{ duration: 0.7, delay: 0.16 }}
        className="h-screen w-screen flex items-center justify-center will-change"
      >
        <div className="flex flex-col items-center justify-center 2xl:flex-row 2xl:pt-[230px] xs:pt-0">
          {/* Image Section */}
          <motion.div
            className="image-container2 mr-10 2xl:w-[440px] 2xl:h-[440px] xs:h-[280px] xs:w-[280px] xs:order-1 2xl:order-2"
          
            variants={variants}
            initial="hiddenDown"
            animate={inView === true ? "visible" : inView}
            transition={{ duration: 0.7, delay: 0.16 }}
          >
            {/* Placeholder for lazy-loaded image */}
         
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="w-full 2xl:w-1/2 xs:order-2 2xl:order-1"
            variants={variants}
            initial="hiddenDown"
            animate={inView === true ? "visible" : inView}
            transition={{ duration: 0.7, delay: 0.16 }}
          >
            <div className="text-white flex flex-col justify-center items-center xs:mr-5 2xl:mr-32 xs:mt-10">
              <p className="text-center leading-tight font-extrabold 2xl:w-[580px] 2xl:min-w-0 xs:min-w-[300px] xs:w-auto low 2xl:pt-16 xs:pt-8 w-full 2xl:text-[45px] xs:text-[23px] ml-5 xs:mr-14">
                In the world of business, the people who are most successful are
                those who are doing what they love
              </p>
              <div className="flex justify-center items-center mt-4 2xl:mr-0 xs:mr-7 font-bold 2xl:text-[20px] xs:text-[10px] tracking-widest">
                <p>Mr. Mohamed Suliman</p>
                <hr className="vertical-line mx-4" />
                <p>Faculty Registrar</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Mohmed;
