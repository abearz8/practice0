'use client';

import { useEffect, useState } from 'react';
import { TimeRemaining } from '../types/christmas-timer';

function getNextEasterDate(year: number): Date {
  // Easter calculation algorithm (Meeus/Jones/Butcher algorithm)
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1; // 0-based month
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  
  return new Date(year, month, day);
}

export default function EasterTimer() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeToEaster = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let easterDate = getNextEasterDate(currentYear);
      
      // If Easter has passed this year, get next year's date
      if (now > easterDate) {
        easterDate = getNextEasterDate(currentYear + 1);
      }

      const difference = easterDate.getTime() - now.getTime();
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    calculateTimeToEaster();
    const timer = setInterval(calculateTimeToEaster, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-purple-100 dark:bg-purple-950">
      <h1 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">
        Time Until Easter {getNextEasterDate(new Date().getFullYear() > getNextEasterDate(new Date().getFullYear()).getTime() ? new Date().getFullYear() + 1 : new Date().getFullYear()).getFullYear()}
      </h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <span className="text-4xl font-bold text-purple-500">{timeRemaining.days}</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">Days</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <span className="text-4xl font-bold text-purple-500">{timeRemaining.hours}</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">Hours</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <span className="text-4xl font-bold text-purple-500">{timeRemaining.minutes}</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">Minutes</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <span className="text-4xl font-bold text-purple-500">{timeRemaining.seconds}</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">Seconds</span>
        </div>
      </div>
    </div>
  );
} 