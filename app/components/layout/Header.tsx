'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { User } from '@/app/types';

interface HeaderProps {
  user: User;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications
  const notifications = [
    {
      id: '1',
      message: 'تمت إضافة تحليل تكتيكي جديد للمباراة القادمة',
      time: '10:30 صباحًا',
      read: false,
      link: '/tactics'
    },
    {
      id: '2',
      message: 'تم تحديث حالة اللاعب سعد سمير',
      time: 'منذ ساعتين',
      read: true,
      link: '/team'
    },
    {
      id: '3',
      message: 'اجتماع الفريق اليوم الساعة 4 مساءً',
      time: 'منذ 5 ساعات',
      read: true,
      link: '/dashboard'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showProfileMenu) setShowProfileMenu(false);
  };

  return (
    <header className="bg-white shadow-sm px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              placeholder="بحث..."
              className="form-input block w-full sm:text-sm border-gray-300 rounded-md py-2 pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-0 left-0 transform translate-x-1/4 -translate-y-1/4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 text-right">
                <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b">
                  الإشعارات
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      لا توجد إشعارات
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <Link href={notification.link} key={notification.id} passHref>
                        <div
                          className={`px-4 py-3 flex hover:bg-gray-50 ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="w-full">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
                <div className="border-t px-4 py-2">
                  <Link href="/notifications" passHref>
                    <div className="text-sm text-blue-600 hover:text-blue-800">
                      عرض كل الإشعارات
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center focus:outline-none"
            >
              <span className="ml-2 text-gray-700">{user.name}</span>
              <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-right">
                <Link href="/profile" passHref>
                  <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    الحساب الشخصي
                  </div>
                </Link>
                <Link href="/settings" passHref>
                  <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    الإعدادات
                  </div>
                </Link>
                <div className="border-t"></div>
                <button
                  className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 