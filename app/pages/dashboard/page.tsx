'use client';

import React from 'react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import StatCard from '@/app/components/dashboard/StatCard';
import UpcomingMatches from '@/app/components/dashboard/UpcomingMatches';
import { Card } from '@/app/components/ui/Card';
import { getUpcomingMatches, mockPlayers } from '@/app/data/mockData';
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

const CoachDashboard = () => {
  // Get upcoming matches
  const upcomingMatches = getUpcomingMatches();
  
  // Count players by status
  const playerStatusCounts = {
    available: mockPlayers.filter(p => p.status === 'available').length,
    injured: mockPlayers.filter(p => p.status === 'injured').length,
    suspended: mockPlayers.filter(p => p.status === 'suspended').length,
  };
  
  // Mock team form data (last 5 matches)
  const teamForm = ['W', 'W', 'D', 'L', 'W']; // Win, Draw, Loss
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="اللاعبون المتاحون" 
            value={playerStatusCounts.available.toString()} 
            icon={<UserGroupIcon className="h-6 w-6" />} 
            change={+2}
            description="من الأسبوع الماضي"
          />
          <StatCard 
            title="لاعبون مصابون" 
            value={playerStatusCounts.injured.toString()} 
            icon={<MedicalIcon className="h-6 w-6" />} 
            change={-1}
            description="من الأسبوع الماضي"
            valueColor="text-yellow-500"
          />
          <StatCard 
            title="لاعبون موقوفون" 
            value={playerStatusCounts.suspended.toString()} 
            icon={<BanIcon className="h-6 w-6" />} 
            change={0}
            description="من الأسبوع الماضي"
            valueColor="text-red-500"
          />
          <StatCard 
            title="المباريات القادمة" 
            value={upcomingMatches.length.toString()} 
            icon={<CalendarIcon className="h-6 w-6" />} 
            description="في الشهر القادم"
          />
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Team Form */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">نتائج الفريق</h3>
                <div className="flex items-center space-x-2 space-x-reverse mb-2">
                  {teamForm.map((result, index) => (
                    <div 
                      key={index}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        result === 'W' ? 'bg-green-500' : 
                        result === 'D' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 text-sm">آخر 5 مباريات</p>
              </div>
            </Card>
          </div>

          {/* Upcoming Matches */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">المباريات القادمة</h3>
                <UpcomingMatches matches={upcomingMatches.slice(0, 3)} />
              </div>
            </Card>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="أهداف مسجلة" 
            value="18" 
            icon={<GoalIcon className="h-6 w-6" />} 
            change={+3}
            description="من الشهر الماضي"
            valueColor="text-green-500"
          />
          <StatCard 
            title="أهداف مستقبلة" 
            value="7" 
            icon={<ShieldIcon className="h-6 w-6" />} 
            change={-2}
            description="من الشهر الماضي"
            valueColor="text-indigo-500"
          />
          <StatCard 
            title="الشباك النظيفة" 
            value="5" 
            icon={<LockIcon className="h-6 w-6" />} 
            change={+1}
            description="من الشهر الماضي"
            valueColor="text-blue-500"
          />
          <StatCard 
            title="متوسط الاستحواذ" 
            value="58%" 
            icon={<ChartIcon className="h-6 w-6" />} 
            change={+3}
            description="من الشهر الماضي"
            valueColor="text-purple-500"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CoachDashboard; 