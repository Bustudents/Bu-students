"use client"
import React, { useEffect, useState } from 'react';
import { fetchEvents } from './navig'; // Import server-side fetch function

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents(currentMonth, currentYear).then(events => setEvents(events));
  }, [currentMonth, currentYear]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="text-transparent">0</div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const event = events.find(event => event.date === dateString);

      days.push(
        <div
          key={day}
          className={`flex flex-col items-center justify-center p-2 rounded-lg text-white 
          ${event ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-800 hover:bg-gray-700'}
          cursor-pointer transition-all`}
        >
          <span>{day}</span>
          {event && <span className="text-xs mt-1 xs:text-[7px] 2xl:text-[10px] font-extrabold ">{event.title}</span>}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (direction) => {
    const newMonth = currentMonth + direction;
    if (newMonth < 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else if (newMonth > 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-5 text-white">
      <div className="flex justify-between items-center w-full max-w-xl mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
        >
          Previous
        </button>
        <h2 className="text-2xl font-bold 2xl:text-[25px] xs:text-[16px]">
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 w-full max-w-xl">
        {daysOfWeek.map(day => (
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
