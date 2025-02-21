import { useState, memo, useEffect } from "react";
import Link from "next/link";

// Memoize the list items to avoid unnecessary re-renders
const ListItem = memo(({ children, ...props }) => (
  <li
    className="listitem w-screen border solid border-white rounded-full p-5 border-l-1 border-r-0 border-t-0 rounded-r-none border-b-0 mb-5 pr-2 hover:bg-gradient-to-r from-blue-400  to-purple-500  hover:bg-opacity-80"
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
        isAnimating: true,
      }));

      // Delay hiding the list until after the animation
      setTimeout(() => {
        setMenuState((prevState) => ({
          ...prevState,
          isListVisible: false,
          isAnimating: false,
        }));
      }, 300); // Increased duration to match the animation time
    } else {
      setMenuState((prevState) => ({
        ...prevState,
        isListVisible: true,
        isAnimating: false,
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
      }, 300); // Match the animation time for smooth transition

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
        className="text-[30px] text-white mr-0 butto hover:scale-125 transition-all duration-200 ease-in-out"
      >
        ☰
      </button>

      {(menuState.isListVisible || menuState.isAnimating) && (
        <>
          <div className="overlay" onClick={toggleList}></div>

          <div
            className={`list text-white pt-5 font-bold tracking-wide ${
              menuState.isAnimating
                ? "slide-out"
                : menuState.isListVisible
                ? "slide-in"
                : ""
            }`}
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
              // Make sure visibility is controlled based on state to prevent flickering
              visibility: menuState.isListVisible || menuState.isAnimating ? "visible" : "hidden",
              opacity: menuState.isAnimating ? 0 : 1, // Fade out during animation
            }}
          >
            <button
              onClick={toggleList}
              className="text-xl hover:border-red text-[30px] border solid border-white p-3 pb-1 pt-1 mb-5 ml-28 hover:scale-125 transition-all duration-20 ease-in-out"
            >
              X
            </button>
            <ul>
            <Link href="/calnder" >
                <ListItem>Calendar</ListItem>
              </Link>
           
            <Link href={"/Resources"} >
              <ListItem
            
              >
                Resources
             

              </ListItem>
</Link>
              <Link href={"/courseoutline"} >
                <ListItem>Course outline</ListItem>
              </Link>

              <Link href={"/Posgraduation"} >
                <ListItem>Post graduation</ListItem>
              </Link>

             
           
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
