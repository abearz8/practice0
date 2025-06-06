'use client';

import { useEffect, useState } from 'react';
import { TimeRemaining } from '../types/christmas-timer';

export default function ChristmasTimer() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeToChristmas = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let christmasDate = new Date(currentYear, 11, 25); // Month is 0-based, so 11 is December
      
      // If Christmas has passed this year, get next year's date
      if (now > christmasDate) {
        christmasDate = new Date(currentYear + 1, 11, 25);
      }

      const difference = christmasDate.getTime() - now.getTime();
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    calculateTimeToChristmas();
    const timer = setInterval(calculateTimeToChristmas, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTargetYear = () => {
    const now = new Date();
    const thisYearChristmas = new Date(now.getFullYear(), 11, 25);
    return now > thisYearChristmas ? now.getFullYear() + 1 : now.getFullYear();
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-red-100 dark:bg-red-950">
      <h1 className="text-3xl font-bold mb-6 text-red-600 dark:text-red-400">Time Until Christmas {getTargetYear()}</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <span className="text-4xl font-bold text-red-500">{timeRemaining.days}</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">Days</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <span className="text-4xl font-bold text-red-500">{timeRemaining.hours}</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">Hours</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <span className="text-4xl font-bold text-red-500">{timeRemaining.minutes}</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">Minutes</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <span className="text-4xl font-bold text-red-500">{timeRemaining.seconds}</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">Seconds</span>
        </div>
      </div>
    </div>
  );
} 