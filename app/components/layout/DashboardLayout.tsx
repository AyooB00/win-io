'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  // Mock user object - will be replaced with real auth later
  const user = { role: 'coach' }; 
  
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Get page title based on current path
  const getPageTitle = () => {
    const pathSegments = pathname.split('/');
    const currentPath = pathSegments[pathSegments.length - 1];
    
    switch(currentPath) {
      case 'dashboard':
        return 'لوحة التحكم';
      case 'team':
        return 'تفاصيل الفريق';
      case 'matches':
        return 'المباريات';
      case 'tactics':
        return 'التحليل التكتيكي';
      case 'fitness':
        return 'الحالة البدنية';
      case 'medical':
        return 'السجل الطبي';
      case 'settings':
        return 'الإعدادات';
      default:
        return 'لوحة التحكم';
    }
  };

  // Animation class when content loads
  const contentClass = mounted 
    ? 'opacity-100 transition-opacity duration-300 ease-in' 
    : 'opacity-0';

  return (
    <div className="p-4 md:p-6 animate-fadeIn">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
            <p className="text-gray-600 mt-1">مرحبًا بك في نظام إدارة النادي</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none hover:bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </div>
            
            {/* Search */}
            <div className="hidden sm:block relative">
              <input 
                type="search" 
                placeholder="بحث..." 
                className="rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48 text-sm"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Profile */}
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <span className="font-medium">مد</span>
                {/* Profile image would go here in production */}
                {/* <Image 
                  src="/images/coach-profile.jpg" 
                  alt="Coach Profile" 
                  fill 
                  className="rounded-full object-cover"
                /> */}
              </div>
              <div className="hidden md:block">
                <h3 className="text-sm font-medium text-gray-900">المدرب أحمد</h3>
                <p className="text-xs text-gray-500">المدرب الرئيسي</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className={contentClass}>
        {children}
      </main>
    </div>
  );
}; 