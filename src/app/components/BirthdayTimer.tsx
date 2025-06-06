'use client';

import { useEffect, useState } from 'react';
import { TimeRemaining } from '../types/christmas-timer';

export default function BirthdayTimer() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeToBirthday = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let birthdayDate = new Date(currentYear, 3, 17); // Month is 0-based, so 3 is April
      
      // If birthday has passed this year, get next year's date
      if (now > birthdayDate) {
        birthdayDate = new Date(currentYear + 1, 3, 17);
      }

      const difference = birthdayDate.getTime() - now.getTime();
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    calculateTimeToBirthday();
    const timer = setInterval(calculateTimeToBirthday, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTargetYear = () => {
    const now = new Date();
    const thisYearBirthday = new Date(now.getFullYear(), 3, 17);
    return now > thisYearBirthday ? now.getFullYear() + 1 : now.getFullYear();
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-blue-100 dark:bg-blue-950">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">Time Until April 17th, {getTargetYear()}</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <span className="text-4xl font-bold text-blue-500">{timeRemaining.days}</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">Days</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <span className="text-4xl font-bold text-blue-500">{timeRemaining.hours}</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">Hours</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <span className="text-4xl font-bold text-blue-500">{timeRemaining.minutes}</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">Minutes</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <span className="text-4xl font-bold text-blue-500">{timeRemaining.seconds}</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">Seconds</span>
        </div>
      </div>
    </div>
  );
} 