import { useState, memo, useEffect } from "react";
import Link from "next/link";

// Memoize the list items to avoid unnecessary re-renders
const ListItem = memo(({ children, ...props }) => (
  <li
    className="listitem w-screen border solid border-white rounded-full p-5 border-l-1 border-r-0 border-t-0 rounded-r-none border-b-0 mb-5 pr-2 hover:bg-red-700 hover:bg-opacity-80"
    {...props}
  >
    {children}
  </li>
));

ListItem.displayName = "ListItem";

export default function ListWithOverlay() {
  const [menuState, setMenuState] = useState({
    isListVisible: false,
    isAnimating: false,
    isSubMenuVisible: false,
  });

  // Handle list visibility with animation logic
  const toggleList = () => {
    if (menuState.isListVisible) {
      setMenuState((prevState) => ({
        ...prevState,
        isAnimating: true, // Start the slide-out animation
      }));
    } else {
      setMenuState((prevState) => ({
        ...prevState,
        isListVisible: true, // Show the list immediately
        isAnimating: false, // Disable animation
      }));
    }
  };

  // Use effect to reset the list visibility after animation ends
  useEffect(() => {
    if (menuState.isAnimating) {
      const timer = setTimeout(() => {
        setMenuState((prevState) => ({
          ...prevState,
          isListVisible: false, // Hide the list after animation
          isAnimating: false,   // Reset animation state
        }));
      }, 500); // Duration of the animation

      return () => clearTimeout(timer);
    }
  }, [menuState.isAnimating]);

  const toggleSubMenu = () => {
    setMenuState((prevState) => ({
      ...prevState,
      isSubMenuVisible: !prevState.isSubMenuVisible,
    }));
  };

  return (
    <div className="mr-0">
      <button
        onClick={toggleList}
        className="text-[30px] text-white mr-0 hover:scale-125 transition-all duration-200 ease-in-out"
      >
        ☰
      </button>

      {(menuState.isListVisible || menuState.isAnimating) && (
        <>
          <div className="overlay" onClick={toggleList}></div>

          <div
            className={`list text-white pt-5 font-bold tracking-wide ${
              menuState.isListVisible && !menuState.isAnimating
                ? "slide-in"
                : "slide-out"
            }`}
            style={{
              perspective: "1000px", // Adds 3D effect
              transformStyle: "preserve-3d", // Ensure child elements are affected by 3D transforms
            }}
          >
            <button
              onClick={toggleList}
              className="text-xl hover:border-red text-[30px] border solid border-white p-3 pb-1 pt-1 mb-5 ml-28 hover:scale-125 transition-all duration-100 ease-in-out"
            >
              X
            </button>
            <ul>
              <ListItem
                onMouseEnter={toggleSubMenu}
                onMouseLeave={toggleSubMenu}
              >
                Resources
                {menuState.isSubMenuVisible && (
                  <ul className="absolute top-[-7px] left-[-100px]  text-white rounded-lg p-3 ">
                    <li className="p-2 hover:bg-red-700 rounded">
                      <a
                        href="https://drive.google.com/drive/folders/11_fAFjM-RTU1qP5i0ZEDZx_k9P1u0v_U"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        AC/FI
                      </a>
                    </li>
                    <li className="p-2 hover:bg-red-700 rounded">
                      <a
                        href="https://drive.google.com/drive/folders/1-H9miQjKuvJ8ydr9K20Mc4fEg_6OAAmm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        MG/MK
                      </a>
                    </li>
                    <li className="p-2 hover:bg-red-700 rounded">
                      <a
                        href="https://drive.google.com/drive/folders/1-T2jpNcjPt68tMGDeagp3bBk-tFjB3R0"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        AFGK
                      </a>
                    </li>
                  </ul>
                )}
              </ListItem>

              <Link href={"/courseoutline"} target="_blank">
                <ListItem>Course outline</ListItem>
              </Link>

              <Link href="/calnder" target="_blank">
                <ListItem>Calendar</ListItem>
              </Link>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
