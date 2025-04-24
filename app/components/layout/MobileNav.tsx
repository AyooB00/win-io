'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { UserRole } from '@/app/types';

interface MobileNavProps {
  userRole: UserRole;
}

export const MobileNav: React.FC<MobileNavProps> = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Set mounted to handle hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    {
      label: 'لوحة التحكم',
      path: '/dashboard',
      roles: ['coach', 'player', 'medical', 'admin'],
      badge: null,
    },
    {
      label: 'تفاصيل الفريق',
      path: '/team',
      roles: ['coach', 'admin'],
      badge: null,
    },
    {
      label: 'المباريات',
      path: '/matches',
      roles: ['coach', 'player', 'admin'],
      badge: { count: 2, color: 'bg-green-500' },
    },
    {
      label: 'التحليل التكتيكي',
      path: '/tactics',
      roles: ['coach'],
      badge: null,
    },
    {
      label: 'الحالة البدنية',
      path: '/fitness',
      roles: ['player', 'medical', 'coach'],
      badge: { count: 3, color: 'bg-yellow-500' },
    },
    {
      label: 'السجل الطبي',
      path: '/medical',
      roles: ['medical', 'coach'],
      badge: null,
    },
    {
      label: 'الإعدادات',
      path: '/settings',
      roles: ['admin', 'coach', 'player', 'medical'],
      badge: null,
    },
  ];

  const filteredNavItems = navItems.filter((item) => item.roles.includes(userRole));

  // Avoid hydration issues
  if (!mounted) return null;

  return (
    <div className="lg:hidden relative z-20">
      <div className="flex items-center justify-between py-3 px-4 border-b border-gray-200 bg-white">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg mr-3">
            FC
          </div>
          <h1 className="text-xl font-bold text-blue-900">مساعد الفريق</h1>
        </div>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none p-2 rounded-md hover:bg-gray-100"
          aria-expanded={isOpen}
          aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu drawer */}
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Mobile menu sliding panel */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl transition-transform animate-fadeIn">
            <div className="h-full flex flex-col overflow-y-auto">
              {/* Header */}
              <div className="px-4 py-5 flex items-center justify-between border-b border-gray-200">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  FC
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                  aria-label="إغلاق القائمة"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              
              {/* Navigation items */}
              <div className="flex-1 py-6 px-4">
                <nav className="space-y-2">
                  {filteredNavItems.map((item) => (
                    <Link key={item.path} href={item.path}>
                      <div
                        onClick={() => setIsOpen(false)}
                        className={`
                          flex items-center justify-between px-4 py-3 rounded-md cursor-pointer transition-colors
                          ${pathname === item.path 
                            ? 'bg-blue-50 text-blue-600 font-medium' 
                            : 'text-gray-600 hover:bg-gray-50'
                          }
                        `}
                      >
                        <span className="text-base">{item.label}</span>
                        {item.badge && (
                          <span className={`${item.badge.color} text-white text-xs font-medium px-2 py-0.5 rounded-full`}>
                            {item.badge.count}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>
              
              {/* User profile section */}
              <div className="mt-auto border-t border-gray-200 px-4 py-5">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    مد
                  </div>
                  <div className="mr-3">
                    <h3 className="text-sm font-medium text-gray-900">المدرب أحمد</h3>
                    <p className="text-xs text-gray-500">المدرب الرئيسي</p>
                  </div>
                </div>
                
                <button 
                  className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileNav;
