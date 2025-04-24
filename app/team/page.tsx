'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { UserGroupIcon, ChartIcon, ShieldIcon, GoalIcon } from '@/app/components/ui/Icons';

// Mock data for players
const players = [
  {
    id: 1,
    name: 'أحمد محمد',
    position: 'مهاجم',
    number: 10,
    age: 28,
    height: 182,
    weight: 76,
    nationality: 'مصري',
    joinedDate: '2020-08-15',
    goals: 18,
    assists: 7,
    matches: 34,
    fitnessLevel: 92
  },
  {
    id: 2,
    name: 'خالد العمري',
    position: 'مدافع',
    number: 4,
    age: 26,
    height: 187,
    weight: 82,
    nationality: 'سعودي',
    joinedDate: '2019-06-20',
    goals: 2,
    assists: 1,
    matches: 30,
    fitnessLevel: 88
  },
  {
    id: 3,
    name: 'محمود إبراهيم',
    position: 'وسط',
    number: 8,
    age: 25,
    height: 178,
    weight: 72,
    nationality: 'سوداني',
    joinedDate: '2021-01-10',
    goals: 5,
    assists: 12,
    matches: 32,
    fitnessLevel: 95
  },
  {
    id: 4,
    name: 'طارق يوسف',
    position: 'حارس مرمى',
    number: 1,
    age: 30,
    height: 190,
    weight: 85,
    nationality: 'سعودي',
    joinedDate: '2018-07-05',
    goals: 0,
    assists: 0,
    matches: 36,
    fitnessLevel: 87
  },
  {
    id: 5,
    name: 'علي الشمراني',
    position: 'مهاجم',
    number: 9,
    age: 24,
    height: 180,
    weight: 75,
    nationality: 'سعودي',
    joinedDate: '2021-08-10',
    goals: 12,
    assists: 4,
    matches: 28,
    fitnessLevel: 94
  },
  {
    id: 6,
    name: 'فارس الدوسري',
    position: 'مدافع',
    number: 3,
    age: 27,
    height: 185,
    weight: 80,
    nationality: 'سعودي',
    joinedDate: '2020-01-15',
    goals: 1,
    assists: 2,
    matches: 33,
    fitnessLevel: 90
  }
];

// Player positions for filtering
const positions = ['الكل', 'مهاجم', 'وسط', 'مدافع', 'حارس مرمى'];

export default function TeamPage() {
  const [selectedPosition, setSelectedPosition] = useState('الكل');
  const [sortBy, setSortBy] = useState('name');
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

  // Filter and sort players
  const filteredPlayers = players
    .filter(player => selectedPosition === 'الكل' || player.position === selectedPosition)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'goals') return b.goals - a.goals;
      if (sortBy === 'fitnessLevel') return b.fitnessLevel - a.fitnessLevel;
      return 0;
    });

  // Find the selected player
  const playerDetail = selectedPlayer ? players.find(p => p.id === selectedPlayer) : null;

  return (
    <div className="p-6 max-w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">تفاصيل الفريق</h1>
          <p className="text-gray-500">إدارة اللاعبين وعرض الإحصائيات</p>
        </div>
        <div className="mt-4 lg:mt-0">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 rtl:space-x-reverse">
            <UserGroupIcon className="w-5 h-5" />
            <span>إضافة لاعب جديد</span>
          </button>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="space-x-2 rtl:space-x-reverse">
            <span className="text-gray-700">تصفية:</span>
            {positions.map(position => (
              <button
                key={position}
                onClick={() => setSelectedPosition(position)}
                className={`px-3 py-1 rounded-md ${
                  selectedPosition === position
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {position}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-gray-700">ترتيب حسب:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-md px-2 py-1"
            >
              <option value="name">الاسم</option>
              <option value="goals">الأهداف</option>
              <option value="fitnessLevel">اللياقة البدنية</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Players List */}
        <div className="col-span-1 lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlayers.map(player => (
              <div 
                key={player.id}
                onClick={() => setSelectedPlayer(player.id)}
                className={`bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${
                  selectedPlayer === player.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="h-48 bg-gray-200 relative">
                  {/* In production, use actual player images */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-400 text-5xl font-bold">
                      {player.number}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{player.name}</h3>
                  <p className="text-gray-600 mb-2">{player.position} | #{player.number}</p>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <GoalIcon className="w-4 h-4 text-green-500 ml-1" />
                      <span>{player.goals}</span>
                    </div>
                    <div className="flex items-center">
                      <ChartIcon className="w-4 h-4 text-blue-500 ml-1" />
                      <span>{player.fitnessLevel}%</span>
                    </div>
                    <div className="flex items-center">
                      <ShieldIcon className="w-4 h-4 text-purple-500 ml-1" />
                      <span>{player.matches}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Player Details */}
        <div className="col-span-1">
          {playerDetail ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-56 bg-gray-200 relative">
                {/* In production, use actual player image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-gray-400 text-6xl font-bold">
                    {playerDetail.number}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold mb-4">{playerDetail.name}</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 text-sm">المركز</p>
                      <p className="font-medium">{playerDetail.position}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">الرقم</p>
                      <p className="font-medium">#{playerDetail.number}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">العمر</p>
                      <p className="font-medium">{playerDetail.age} سنة</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">الطول</p>
                      <p className="font-medium">{playerDetail.height} سم</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">الوزن</p>
                      <p className="font-medium">{playerDetail.weight} كغ</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">الجنسية</p>
                      <p className="font-medium">{playerDetail.nationality}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3">الإحصائيات</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">الأهداف</span>
                          <span className="font-medium">{playerDetail.goals}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${Math.min(playerDetail.goals * 4, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">التمريرات الحاسمة</span>
                          <span className="font-medium">{playerDetail.assists}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${Math.min(playerDetail.assists * 5, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">المباريات</span>
                          <span className="font-medium">{playerDetail.matches}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${Math.min(playerDetail.matches * 2, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">اللياقة البدنية</span>
                          <span className="font-medium">{playerDetail.fitnessLevel}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full" 
                            style={{ width: `${playerDetail.fitnessLevel}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex space-x-2 rtl:space-x-reverse">
                    <button className="px-3 py-2 bg-blue-600 text-white rounded flex-1">تعديل البيانات</button>
                    <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded">عرض التقرير</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="text-gray-400 mb-4">
                <UserGroupIcon className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-medium mb-2">اختر لاعبًا</h3>
              <p className="text-gray-500">الرجاء اختيار لاعب من القائمة لعرض التفاصيل</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 