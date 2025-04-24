'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockUsers } from '@/app/data/mockData';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">FC</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            تسجيل الدخول
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            مرحبًا بك في منصة مساعد المدرب والفريق
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="mr-3">
                  <p className="text-sm text-red-700">
                    {error}
                  </p>
                </div>
              </div>
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-900">
                تذكرني
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                نسيت كلمة المرور؟
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
            >
              تسجيل الدخول
            </Button>
          </div>
          
          <div className="text-center text-sm">
            <p className="text-gray-600">
              تستطيع تسجيل الدخول باستخدام بيانات المستخدمين التجريبية:
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div className="border rounded p-2">
                <div className="font-semibold">المدرب</div>
                <div>ahmed.hassan@team.com</div>
                <div>كلمة المرور: 123456</div>
              </div>
              <div className="border rounded p-2">
                <div className="font-semibold">اللاعب</div>
                <div>mo.salah@team.com</div>
                <div>كلمة المرور: 123456</div>
              </div>
              <div className="border rounded p-2">
                <div className="font-semibold">الطبيب</div>
                <div>dr.khalid@team.com</div>
                <div>كلمة المرور: 123456</div>
              </div>
              <div className="border rounded p-2">
                <div className="font-semibold">الإدارة</div>
                <div>amr.elganainy@team.com</div>
                <div>كلمة المرور: 123456</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm; 