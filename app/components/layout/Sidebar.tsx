'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { UserRole } from '@/app/types';

interface SidebarProps {
  userRole: UserRole;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
  badge?: {
    count: number;
    color: string;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Set mounted to handle hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems: NavItem[] = [
    {
      label: 'لوحة التحكم',
      path: '/dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
      roles: ['coach', 'player', 'medical', 'admin'],
    },
    {
      label: 'تفاصيل الفريق',
      path: '/team',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
      roles: ['coach', 'admin'],
    },
    {
      label: 'المباريات',
      path: '/matches',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      ),
      roles: ['coach', 'player', 'admin'],
      badge: {
        count: 2,
        color: 'bg-green-500'
      }
    },
    {
      label: 'التحليل التكتيكي',
      path: '/tactics',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      roles: ['coach'],
    },
    {
      label: 'الحالة البدنية',
      path: '/fitness',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
          <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
        </svg>
      ),
      roles: ['player', 'medical', 'coach'],
      badge: {
        count: 3,
        color: 'bg-yellow-500'
      }
    },
    {
      label: 'السجل الطبي',
      path: '/medical',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
        </svg>
      ),
      roles: ['medical', 'coach'],
    },
    {
      label: 'الإعدادات',
      path: '/settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      ),
      roles: ['admin', 'coach', 'player', 'medical'],
    },
  ];

  const filteredNavItems = navItems.filter((item) => item.roles.includes(userRole));

  if (!mounted) {
    // Return empty div to avoid hydration issues
    return <div className="hidden lg:block w-64 bg-white"></div>;
  }

  return (
    <div 
      className={`bg-white border-l border-gray-200 h-screen shadow-sm transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo & Toggle */}
        <div className="px-4 py-5 flex items-center justify-between border-b border-gray-100">
          <div className={`flex items-center ${collapsed ? 'justify-center w-full' : ''}`}>
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              FC
            </div>
            {!collapsed && <h1 className="mr-3 text-xl font-bold text-blue-900">مساعد الفريق</h1>}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 p-1 rounded-full hover:bg-gray-100 focus:outline-none"
            aria-label={collapsed ? "توسيع القائمة" : "طي القائمة"}
          >
            {collapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 mt-6 px-2 overflow-y-auto">
          <ul className="space-y-1">
            {filteredNavItems.map((item) => {
              const isActive = pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link href={item.path}>
                    <div
                      className={`
                        flex items-center px-4 py-3 rounded-md cursor-pointer transition-colors
                        ${isActive 
                          ? 'bg-blue-50 text-blue-600 font-medium' 
                          : 'text-gray-600 hover:bg-gray-50'
                        }
                      `}
                    >
                      <span className={`${collapsed ? 'mx-auto' : 'ml-0 mr-3'} ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                        {item.icon}
                      </span>
                      
                      {!collapsed && (
                        <div className="flex items-center justify-between w-full">
                          <span>{item.label}</span>
                          
                          {item.badge && (
                            <span className={`${item.badge.color} text-white text-xs font-medium px-2 py-0.5 rounded-full`}>
                              {item.badge.count}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {collapsed && item.badge && (
                        <span className={`${item.badge.color} absolute top-0 right-0 h-2 w-2 rounded-full`}></span>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Footer / User Info */}
        <div className="mt-auto px-4 py-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
              مد
            </div>
            {!collapsed && (
              <div className="mr-3">
                <h3 className="text-sm font-medium text-gray-900">المدرب أحمد</h3>
                <p className="text-xs text-gray-500">المدرب الرئيسي</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 