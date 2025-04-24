'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';
import { mockUsers } from '@/app/data/mockData';

const UserTypeCard = ({ 
  title, 
  email, 
  icon, 
  onClick 
}: { 
  title: string; 
  email: string; 
  icon: string; 
  onClick: () => void 
}) => {
  return (
    <div 
      className="border rounded-lg p-3 flex flex-col items-center gap-2 transition-all hover:shadow-md hover:bg-blue-50/50 cursor-pointer bg-white dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700/50"
      onClick={onClick}
    >
      <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-white text-lg">
        {icon}
      </div>
      <div className="font-semibold text-center text-gray-800 dark:text-gray-200">{title}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{email}</div>
    </div>
  );
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  
  const router = useRouter();
  
  const handleLoginWithUserType = (userEmail: string) => {
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      // Find the user based on email
      const user = mockUsers.find(user => user.email.toLowerCase() === userEmail.toLowerCase());
      
      if (user) {
        // In a real app, you would set user in context/store
        console.log('User authenticated:', user);
        
        // Redirect based on role
        if (user.role === 'coach') {
          router.push('/dashboard');
        } else if (user.role === 'player') {
          router.push('/dashboard');
        } else if (user.role === 'medical') {
          router.push('/medical');
        } else if (user.role === 'admin') {
          router.push('/dashboard');
        }
      } else {
        setError('حدث خطأ في تسجيل الدخول');
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      // Simple mock authentication
      const user = mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
      
      if (user && password === '123456') { // Simple password for demo
        // In a real app, you would set user in context/store
        console.log('User authenticated:', user);
        
        // Redirect based on role
        if (user.role === 'coach') {
          router.push('/dashboard');
        } else if (user.role === 'player') {
          router.push('/dashboard');
        } else if (user.role === 'medical') {
          router.push('/medical');
        } else if (user.role === 'admin') {
          router.push('/dashboard');
        }
      } else {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900" dir="rtl">
      <div className="max-w-md w-full space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-center text-xl font-bold text-gray-900 dark:text-white">
          تسجيل الدخول
        </h2>
        
        {showLogin ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border-r-4 border-red-500 p-3 rounded-md">
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}
            
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  البريد الإلكتروني
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
                  placeholder="البريد الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  كلمة المرور
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              تسجيل الدخول
            </Button>
            
            <div className="text-center">
              <button 
                type="button" 
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                onClick={() => setShowLogin(false)}
              >
                الدخول السريع كمستخدم
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border-r-4 border-red-500 p-3 rounded-md">
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              <UserTypeCard
                title="المدرب"
                email="coach@example.com"
                icon="👨‍💼"
                onClick={() => handleLoginWithUserType('coach@example.com')}
              />
              <UserTypeCard
                title="اللاعب"
                email="ahmed@example.com"
                icon="⚽"
                onClick={() => handleLoginWithUserType('ahmed@example.com')}
              />
              <UserTypeCard
                title="الطبيب"
                email="doctor@example.com"
                icon="👨‍⚕️"
                onClick={() => handleLoginWithUserType('doctor@example.com')}
              />
              <UserTypeCard
                title="الإدارة"
                email="admin@example.com"
                icon="👑"
                onClick={() => handleLoginWithUserType('admin@example.com')}
              />
            </div>
            
            <div className="text-center">
              <button 
                type="button" 
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                onClick={() => setShowLogin(true)}
              >
                تسجيل الدخول باستخدام البريد الإلكتروني
              </button>
            </div>
            
            {isLoading && (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">جاري تسجيل الدخول...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm; 