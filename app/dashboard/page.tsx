'use client';

import React from 'react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { StatCard } from '@/app/components/dashboard/StatCard';
import { 
  UserGroupIcon, 
  MedicalIcon, 
  BanIcon, 
  CalendarIcon, 
  GoalIcon, 
  ShieldIcon, 
  LockIcon, 
  ChartIcon 
} from '@/app/components/ui/Icons';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="إجمالي اللاعبين"
            value="24"
            icon={<UserGroupIcon className="w-6 h-6" />}
            change={{ type: 'increase', value: "2" }}
            description="زيادة 2 لاعبين هذا الشهر"
          />
          <StatCard
            title="اللاعبين المصابين"
            value="3"
            icon={<MedicalIcon className="w-6 h-6" />}
            change={{ type: 'decrease', value: "1" }}
            description="تحسن حالة لاعب واحد"
          />
          <StatCard
            title="المباريات القادمة"
            value="5"
            icon={<CalendarIcon className="w-6 h-6" />}
            change={{ type: 'neutral', value: "0" }}
            description="خلال الـ 30 يوم القادمة"
          />
          <StatCard
            title="الأهداف المسجلة"
            value="42"
            icon={<GoalIcon className="w-6 h-6" />}
            change={{ type: 'increase', value: "8" }}
            description="زيادة 8 أهداف هذا الموسم"
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">النشاط الأخير</h2>
          <div className="space-y-4">
            {[
              {
                title: 'تم تسجيل هدف جديد',
                description: 'أحمد سجل هدف في المباراة الأخيرة',
                time: 'منذ ساعتين',
                icon: <GoalIcon className="w-5 h-5 text-green-500" />
              },
              {
                title: 'تحديث الحالة البدنية',
                description: 'تم تحديث حالة محمد البدنية',
                time: 'منذ 4 ساعات',
                icon: <MedicalIcon className="w-5 h-5 text-blue-500" />
              },
              {
                title: 'جدولة مباراة جديدة',
                description: 'تم إضافة مباراة ضد فريق النصر',
                time: 'منذ يوم',
                icon: <CalendarIcon className="w-5 h-5 text-purple-500" />
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="mt-1">{activity.icon}</div>
                <div>
                  <h3 className="font-medium">{activity.title}</h3>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions and Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">إجراءات سريعة</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <span>إضافة لاعب جديد</span>
                <UserGroupIcon className="w-5 h-5" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                <span>جدولة مباراة</span>
                <CalendarIcon className="w-5 h-5" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                <span>تحديث الحالة البدنية</span>
                <MedicalIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">المباريات القادمة</h2>
            <div className="space-y-3">
              {[
                { team: 'النصر', date: '2024-03-15', time: '20:00', logo: '/images/teams/team1.png' },
                { team: 'الهلال', date: '2024-03-20', time: '19:30', logo: '/images/teams/team2.png' },
                { team: 'الاتحاد', date: '2024-03-25', time: '21:00', logo: '/images/teams/team3.png' }
              ].map((match, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-xs">
                    {match.team.substring(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium">{match.team}</p>
                    <p className="text-sm text-gray-600">{match.date} - {match.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">إحصائيات سريعة</h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span>معدل الأهداف</span>
                  <span className="font-medium">2.1</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span>معدل التمريرات</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span>معدل التملك</span>
                  <span className="font-medium">58%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
