'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from '../types/navigation';

const navItems: NavItem[] = [
  { label: 'Christmas', href: '/' },
  { label: 'Easter', href: '/easter' }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center space-x-8 h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center px-4 h-full border-b-2 text-sm font-medium transition-colors
                  ${isActive 
                    ? 'border-red-500 text-red-500 dark:border-red-400 dark:text-red-400' 
                    : 'border-transparent text-gray-500 hover:text-red-500 hover:border-red-300 dark:text-gray-300 dark:hover:text-red-400'
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
} 