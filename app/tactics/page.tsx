'use client';

import React from 'react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import Image from 'next/image';

export default function TacticsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">التحليل التكتيكي للفريق</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Field Visualization */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">التشكيل الأساسي</h3>
            <div className="bg-green-700 h-96 rounded-lg relative overflow-hidden">
              {/* This would be replaced with an actual field visualization component */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-lg">رسم التشكيل التكتيكي هنا</p>
              </div>
              
              {/* Field lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border-2 border-white/30 w-3/4 h-4/5 rounded-md"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border-2 border-white/30 w-1/3 h-1/5 absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border-2 border-white/30 w-1/3 h-1/5 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border-2 border-white/30 w-40 h-40 rounded-full"></div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                حفظ التشكيل
              </button>
              <div className="flex gap-2">
                <button className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300">
                  4-3-3
                </button>
                <button className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300">
                  4-4-2
                </button>
                <button className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300">
                  3-5-2
                </button>
                <button className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300">
                  5-3-2
                </button>
              </div>
            </div>
          </div>
          
          {/* Tactics Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">معلومات التشكيل</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">التشكيل:</span>
                  <span className="font-medium">4-3-3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">أسلوب اللعب:</span>
                  <span className="font-medium">هجومي</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">السيطرة:</span>
                  <span className="font-medium">60%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">متوسط العرض:</span>
                  <span className="font-medium">35 متر</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">متوسط العمق:</span>
                  <span className="font-medium">45 متر</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">ملاحظات تكتيكية</h3>
              <div className="space-y-3">
                <textarea 
                  className="w-full border border-gray-300 rounded-md p-3 h-32"
                  placeholder="أضف ملاحظاتك التكتيكية هنا..."
                ></textarea>
                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                  حفظ الملاحظات
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Tactics Analysis */}
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">تحليلات تكتيكية سابقة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">مباراة ضد الهلال</h4>
                    <p className="text-sm text-gray-600 mt-1">15 فبراير 2023</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    4-2-3-1
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-700">
                  تحليل تكتيكي للمباراة الأخيرة ضد الهلال. تميز الأداء بالسيطرة في وسط الملعب.
                </p>
                <button className="mt-3 text-blue-600 text-sm font-medium hover:text-blue-800">
                  عرض التفاصيل
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 