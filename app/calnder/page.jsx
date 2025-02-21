"use client";

import React, { useEffect, useState } from "react";
import { fetchAllEvents } from "./navig"; // Updated server-side fetch function
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../homepage/firebase/firebase.config";
import EventLegend from "./legend"
const Calendar = () => {
  const router = useRouter();
  const [date, setDate] = useState({ month: new Date().getMonth(), year: new Date().getFullYear() });
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysInMonth = new Date(date.year, date.month + 1, 0).getDate();
  const firstDayOfMonth = new Date(date.year, date.month, 1).getDay();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/signin");
        return;
      }

      setUser(currentUser);

      try {
        const authToken = await currentUser.getIdToken();
        if (!authToken) {
          router.push("/signin");
          return;
        }

        // Fetch all events using the provided function
        const allEvents = await fetchAllEvents();
        console.log("Fetched Events:", allEvents); // Debugging

        setEvents(allEvents || []);
      } catch (error) {
        console.error("Error fetching events:", error);
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const changeMonth = (direction) => {
    setDate((prev) => {
      const newMonth = prev.month + direction;
      if (newMonth < 0) return { month: 11, year: prev.year - 1 };
      if (newMonth > 11) return { month: 0, year: prev.year + 1 };
      return { ...prev, month: newMonth };
    });
  };

  const renderDays = () => {
    const days = [];
    const currentMonthEvents = events.filter((event) => {
      const [eventYear, eventMonth] = event.date.split("-").map(Number);
      return eventYear === date.year && eventMonth === date.month + 1;
    });
  
    const today = new Date();
  
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="text-transparent">0</div>);
    }
  
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${date.year}-${String(date.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayEvents = currentMonthEvents.filter((event) => event.date === dateString);
      const isToday = today.getDate() === day && today.getMonth() === date.month && today.getFullYear() === date.year;
  
      days.push(
        <div 
          key={day} 
          className={`group flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer transition-all 
            ${isToday ? "bg-none bg-opacity-60  text-white font-bold" : "bg-gray-800 hover:bg-gray-700 text-white"}`}
        >
          <span className="2xl:text-[19px] xs:text-[12px]">{day}</span>
          {dayEvents.length > 0 && (
            <div className="relative group">
     <ul className="flex flex-col items-center space-y-1 z-10">
  {dayEvents.map((event, index) => {
    let eventColor = "bg-white"; // Default color

    const today = new Date(); 
    const eventDate = new Date(event.date); // Convert event.date to a Date object

    // Calculate the difference in days
    const timeDifference = eventDate - today;
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24); // Convert milliseconds to days

    if (event.important) {
      eventColor = "bg-[#f09636]"; // Important events (Orange)
    } else if (event.assignment) {
      eventColor = dayDifference <= 3 ? "bg-red-500" : "bg-blue-500"; 
    }

    return (
      <li key={index} className={`w-3 h-3 rounded-full ${eventColor}`}></li>
    );
  })}
</ul>

             
<div className="absolute 2xl:ml-0 xs:ml-3 z-20 top-8  left-1/2 transform -translate-x-1/2 bg-white text-black text-sm p-3 rounded-lg shadow-lg hidden group-hover:flex flex-col space-y-2 border border-gray-300">
  {dayEvents.map((event, index) => {
    let eventColor = "bg-gray-400"; // Default color

    const today = new Date();
    const eventDate = new Date(event.date); // Convert event.date to a Date object

    // Calculate the difference in days
    const timeDifference = eventDate - today;
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24); // Convert milliseconds to days

    if (event.important) {
      eventColor = "bg-[#f09636]"; // Important events (Orange)
    } else if (event.assignment) {
      eventColor = dayDifference <= 3 ? "bg-red-500" : "bg-blue-500"; 
    }

    return (
      <div key={index} className="flex items-center space-x-2 border-b border-gray-200 pb-1  last:border-b-0 last:pb-0">
        <span className={`w-3 h-3 rounded-full ${eventColor}`}></span>
        <span className="font-bold">{event.title}</span>
      </div>
    );
  })}
</div>

            </div>
          )}
        </div>
      );
    }
  
    return days;
  };
  

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center text-white">Loading events...</div>;
  }

  return (
   
   
   
   <div className="flex  2xl:justify-center min-h-screen   lg:items-center xs:items-stretch justify-center   bg-gray-900  2xl:flex-row  xs:flex-col">
   
   <div className="bg-gray-900 mr-16  relative xs:bottom-14 lg:bottom-0 xs:ml-0 lg:ml-20  z-1 h-max w-full flex flex-col  items-center   justify-center 2xl:scale-[110%] xs:scale-100 xs:justify-normal 2xl:justify-center p-5 text-white">
   <div className="text-center xs:visible lg:hidden  mt-10 mb-20">
  <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-400 to-purple-400 shadow-lg">
    Calendar Events
  </h1>

</div>

     
     
      <div className="flex justify-between items-center w-full max-w-xl mb-4">
        <button onClick={() => changeMonth(-1)} className="px-4 py-2 text-white font-bold bg-red-600 hover:bg-red-700 rounded-lg">←</button>
        <h2 className="2xl:text-2xl xs:text-[20px] font-bold">{new Date(date.year, date.month).toLocaleString("default", { month: "long" })} {date.year}</h2>
        <button onClick={() => changeMonth(1)} className="px-4 py-2 text-white font-bold bg-red-600 hover:bg-red-700 rounded-lg">→</button>
      </div>

      <div className="grid grid-cols-7 gap-2 w-full max-w-xl">
        {daysOfWeek.map((day) => <div key={day} className="text-center font-bold text-red-500">{day}</div>)}
        {renderDays()}
      </div>
     
    </div>
 <div className="z-20   xs:mt-0 lg:mt-16 xs:mr-0 xs:ml-5 lg:ml-40 lg:scale-150 lg:mr-20 relative xs:right-0 lg:right-20 mt-0  bg-gray-900  ">   <EventLegend/></div>
    </div>
);
};

export default Calendar;