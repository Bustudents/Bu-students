"use client";

import React, { useEffect, useState } from "react";
import { fetchAllEvents } from "./navig"; // Updated server-side fetch function

const Calendar = () => {
  const [date, setDate] = useState({ month: new Date().getMonth(), year: new Date().getFullYear() });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const daysInMonth = new Date(date.year, date.month + 1, 0).getDate();
  const firstDayOfMonth = new Date(date.year, date.month, 1).getDay();

  // Fetch all events on initial load
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedEvents = await fetchAllEvents(); // Fetch all events
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
  
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="text-transparent">0</div>);
    }
  
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${date.year}-${String(date.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayEvents = currentMonthEvents.filter((event) => event.date === dateString);
  
      days.push(
        <div
          key={day}
          className="group flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer transition-all bg-gray-800 hover:bg-gray-700 text-white"
        >
          <span className="2xl:text-[19px] xs:text-[12px]">{day}</span>
          {dayEvents.length > 0 && (
            <div className="relative group">
              {/* Bullet Points */}
              <ul className="flex flex-col items-center space-y-1 z-10">
                {dayEvents.map((event, index) => {
                  const eventDate = new Date(event.date);
                  const today = new Date();
                  const daysUntilDue = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
                  const circleColor =
                    daysUntilDue <= 3 && daysUntilDue >= 0&&event.assignment
                      ? "bg-red-500"
                      : event.important? "bg-[#f09636]" : "bg-white";
  
                  return (
                    <li
                      key={index}
                      className={`w-3 h-3 rounded-full ${circleColor}`}
                    ></li>
                  );
                })}
              </ul>
              {/* Tooltip */}
              <div className="absolute 2xl:ml-0 xs:ml-3 z-20 top-8  left-1/2 transform -translate-x-1/2 bg-white text-black text-sm p-3 rounded-lg shadow-lg hidden group-hover:flex flex-col space-y-2 border border-gray-300">
                {dayEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 border-b border-gray-200 pb-1 last:border-b-0 last:pb-0"
                  >
                    <span
             className={`w-3 h-3 rounded-full z-20 ${
      (() => {
        const eventDate = new Date(event.date);
        const today = new Date();
        const daysUntilDue = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
        return daysUntilDue <= 3 && daysUntilDue >= 0 &&event.assignment
          ? "bg-yellow-500"
          :  event.important? "bg-[#f09636]" : " bg-gray-400";
      })()
    }`}
                    ></span>
                    <span className="font-bold">{event.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
  
    return days;
  };
  

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <div>Loading events...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-5 text-white">
      {/* Calendar Header */}
      <div className="flex justify-between items-center w-full max-w-xl mb-4">
        <button onClick={() => changeMonth(-1)} className="px-4 py-2  text-white font-bold bg-red-600 hover:bg-red-700 rounded-lg">
        ←
        </button>
        <h2 className="2xl:text-2xl xs:text-[20px] font-bold">
          {new Date(date.year, date.month).toLocaleString("default", { month: "long" })} {date.year}
        </h2>
        <button onClick={() => changeMonth(1)} className="px-4 py-2 text-white font-bold bg-red-600 hover:bg-red-700 rounded-lg">
        →
        </button>
      </div>
  
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 w-full max-w-xl">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-bold text-red-500">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
  
      {/* Legend */}
      <div className="mt-6 w-full max-w-xl">
        <h3 className="text-lg font-bold mb-3">Legend:</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4  bg-gray-200  rounded-full"></div>
            <span>Assignments </span>
         
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#F27A66] border-gray-300 rounded-full"></div>
            <span>Assignments due in 3 days or less</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#f09636] rounded-full"></div>
            <span>exams related dates & important events</span>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Calendar;
