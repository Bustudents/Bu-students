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
      return eventYear === date.year && eventMonth === date.month + 1; // Match year and month
    });

    // Empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="text-transparent">0</div>);
    }

    // Actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${date.year}-${String(date.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const event = currentMonthEvents.find((event) => event.date === dateString);

      days.push(
        <div
          key={day}
          className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer transition-all ${
            event ? "bg-red-600 hover:bg-red-700" : "bg-gray-800 hover:bg-gray-700"
          } text-white`}
        >
          <span className="2xl:text-[19px] xs:text-[12px] ">{day}</span>
          {event && <span className="2xl:text-xs xs:text-[7px]  mt-1 font-extrabold">{event.title}</span>}
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
      <div className="flex justify-between items-center w-full max-w-xl mb-4">
        <button onClick={() => changeMonth(-1)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg">
          Previous
        </button>
        <h2 className="text-2xl font-bold">
          {new Date(date.year, date.month).toLocaleString("default", { month: "long" })} {date.year}
        </h2>
        <button onClick={() => changeMonth(1)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg">
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 w-full max-w-xl">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-bold text-red-500">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
