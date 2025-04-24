'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChartIcon, UserGroupIcon } from '@/app/components/ui/Icons';
import { mockPlayers } from '@/app/data/mockData';

export default function FitnessPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'players' | 'schedule'>('overview');
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  
  // Find the selected player
  const playerDetail = selectedPlayer 
    ? mockPlayers.find(player => player.id === selectedPlayer) 
    : null;

  // Calculate team average fitness
  const averageFitness = Math.round(
    mockPlayers.reduce((sum, player) => sum + player.stats.fitnessLevel, 0) / mockPlayers.length
  );
  
  // Sort players by fitness level
  const sortedPlayers = [...mockPlayers].sort((a, b) => 
    b.stats.fitnessLevel - a.stats.fitnessLevel
  );

  // Get fitness status color
  const getFitnessColor = (level: number) => {
    if (level >= 90) return 'text-green-500';
    if (level >= 75) return 'text-yellow-500';
    if (level >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="p-6 max-w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">الحالة البدنية</h1>
          <p className="text-gray-500">متابعة اللياقة البدنية للاعبين والفريق</p>
        </div>
        <div className="mt-4 lg:mt-0">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 rtl:space-x-reverse">
            <ChartIcon className="w-5 h-5" />
            <span>تقرير جديد</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white p-2 rounded-lg shadow mb-6">
        <div className="flex">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            نظرة عامة
          </button>
          <button
            onClick={() => setActiveTab('players')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
              activeTab === 'players'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            اللاعبين
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
              activeTab === 'schedule'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            جدول التدريبات
          </button>
        </div>
      </div>

      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Team Fitness Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">ملخص اللياقة البدنية للفريق</h2>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">{averageFitness}%</div>
                  <div className="text-sm text-gray-500 mt-1">متوسط اللياقة</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-500">{sortedPlayers[0].stats.fitnessLevel}%</div>
                  <div className="text-sm text-gray-500 mt-1">أعلى لياقة</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500">
                    {sortedPlayers[sortedPlayers.length - 1].stats.fitnessLevel}%
                  </div>
                  <div className="text-sm text-gray-500 mt-1">أدنى لياقة</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>المستوى الممتاز (90-100%)</span>
                    <span>{mockPlayers.filter(p => p.stats.fitnessLevel >= 90).length} لاعبين</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-500 h-2.5 rounded-full" 
                      style={{ 
                        width: `${(mockPlayers.filter(p => p.stats.fitnessLevel >= 90).length / mockPlayers.length) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>المستوى الجيد (75-89%)</span>
                    <span>{mockPlayers.filter(p => p.stats.fitnessLevel >= 75 && p.stats.fitnessLevel < 90).length} لاعبين</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-yellow-500 h-2.5 rounded-full" 
                      style={{ 
                        width: `${(mockPlayers.filter(p => p.stats.fitnessLevel >= 75 && p.stats.fitnessLevel < 90).length / mockPlayers.length) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>المستوى المتوسط (60-74%)</span>
                    <span>{mockPlayers.filter(p => p.stats.fitnessLevel >= 60 && p.stats.fitnessLevel < 75).length} لاعبين</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-orange-500 h-2.5 rounded-full" 
                      style={{ 
                        width: `${(mockPlayers.filter(p => p.stats.fitnessLevel >= 60 && p.stats.fitnessLevel < 75).length / mockPlayers.length) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>المستوى المنخفض (أقل من 60%)</span>
                    <span>{mockPlayers.filter(p => p.stats.fitnessLevel < 60).length} لاعبين</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-red-500 h-2.5 rounded-full" 
                      style={{ 
                        width: `${(mockPlayers.filter(p => p.stats.fitnessLevel < 60).length / mockPlayers.length) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Fitness Trend */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">تطور اللياقة البدنية</h2>
              <div className="flex justify-center items-center p-10 bg-gray-50 rounded-lg">
                <div className="w-full h-60 flex items-end justify-between">
                  {['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'].map((month, index) => {
                    // Simulate a fitness trend with random values that generally increase
                    const height = 70 + Math.floor(Math.random() * 15) + (index * 2);
                    return (
                      <div key={month} className="flex flex-col items-center flex-1">
                        <div 
                          className="w-4/5 bg-blue-600 rounded-t-md" 
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="text-xs mt-2 text-gray-500">{month}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          {/* Top Performers */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">أفضل اللاعبين لياقة</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {sortedPlayers.slice(0, 5).map((player, index) => (
                    <div 
                      key={player.id}
                      onClick={() => setActiveTab('players') || setSelectedPlayer(player.id)}
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="ml-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">{player.name}</div>
                        <div className="text-sm text-gray-500">{player.position}</div>
                      </div>
                      <div className={`text-lg font-bold ${getFitnessColor(player.stats.fitnessLevel)}`}>
                        {player.stats.fitnessLevel}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Players Tab Content */}
      {activeTab === 'players' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Players List */}
          <div className="col-span-1 lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">لياقة اللاعبين</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        اللاعب
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        المركز
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        مستوى اللياقة
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الحالة
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        إجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedPlayers.map((player) => (
                      <tr 
                        key={player.id}
                        onClick={() => setSelectedPlayer(player.id)}
                        className={`hover:bg-gray-50 cursor-pointer ${
                          selectedPlayer === player.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-sm font-medium">{player.name.substring(0, 2)}</span>
                            </div>
                            <div className="mr-4">
                              <div className="text-sm font-medium text-gray-900">
                                {player.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                #{player.number}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {player.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-32 bg-gray-200 rounded-full h-2 ml-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  player.stats.fitnessLevel >= 90 ? 'bg-green-500' : 
                                  player.stats.fitnessLevel >= 75 ? 'bg-yellow-500' : 
                                  player.stats.fitnessLevel >= 60 ? 'bg-orange-500' : 'bg-red-500'
                                }`} 
                                style={{ width: `${player.stats.fitnessLevel}%` }}
                              ></div>
                            </div>
                            <div className={`text-sm font-medium ${getFitnessColor(player.stats.fitnessLevel)}`}>
                              {player.stats.fitnessLevel}%
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            player.medicalRecord?.status === 'injured' ? 'bg-red-100 text-red-800' : 
                            player.medicalRecord?.status === 'recovering' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {player.medicalRecord?.status === 'injured' ? 'مصاب' : 
                             player.medicalRecord?.status === 'recovering' ? 'في مرحلة التعافي' : 
                             'متاح'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-800 ml-2">تفاصيل</button>
                          <button className="text-gray-600 hover:text-gray-800">تحديث</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Player Fitness Details */}
          <div className="col-span-1">
            {playerDetail ? (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="h-36 bg-gradient-to-r from-blue-500 to-blue-700 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-24 w-24 rounded-full bg-white bg-opacity-90 flex items-center justify-center shadow-lg">
                      <div className={`text-3xl font-bold ${getFitnessColor(playerDetail.stats.fitnessLevel)}`}>
                        {playerDetail.stats.fitnessLevel}%
                      </div>
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#f3f4f6" strokeWidth="2"></circle>
                        <circle 
                          cx="18" 
                          cy="18" 
                          r="16" 
                          fill="none" 
                          stroke={playerDetail.stats.fitnessLevel >= 90 ? '#10B981' : 
                                  playerDetail.stats.fitnessLevel >= 75 ? '#FBBF24' : 
                                  playerDetail.stats.fitnessLevel >= 60 ? '#F97316' : '#EF4444'} 
                          strokeWidth="2" 
                          strokeDasharray={`${playerDetail.stats.fitnessLevel}, 100`} 
                          strokeLinecap="round" 
                          transform="rotate(-90 18 18)"
                        ></circle>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold">{playerDetail.name}</h2>
                    <p className="text-gray-500">{playerDetail.position} | #{playerDetail.number}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">العمر</p>
                        <p className="font-medium">{playerDetail.age} سنة</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">الوزن</p>
                        <p className="font-medium">{playerDetail.weight} كجم</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">الطول</p>
                        <p className="font-medium">{playerDetail.height} سم</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">الحالة</p>
                        <p className={`font-medium ${
                          playerDetail.medicalRecord?.status === 'injured' ? 'text-red-500' : 
                          playerDetail.medicalRecord?.status === 'recovering' ? 'text-yellow-500' : 
                          'text-green-500'
                        }`}>
                          {playerDetail.medicalRecord?.status === 'injured' ? 'مصاب' : 
                           playerDetail.medicalRecord?.status === 'recovering' ? 'في مرحلة التعافي' : 
                           'متاح'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-semibold mb-3">مؤشرات اللياقة</h3>
                      <div className="space-y-3">
                        {[
                          { name: 'القوة', value: Math.floor(Math.random() * 20) + 70 },
                          { name: 'السرعة', value: Math.floor(Math.random() * 20) + 70 },
                          { name: 'التحمل', value: Math.floor(Math.random() * 20) + 70 },
                          { name: 'المرونة', value: Math.floor(Math.random() * 20) + 70 }
                        ].map(metric => (
                          <div key={metric.name}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">{metric.name}</span>
                              <span className="font-medium text-sm">{metric.value}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  metric.value >= 90 ? 'bg-green-500' : 
                                  metric.value >= 75 ? 'bg-yellow-500' : 
                                  metric.value >= 60 ? 'bg-orange-500' : 'bg-red-500'
                                }`} 
                                style={{ width: `${metric.value}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t flex space-x-2 rtl:space-x-reverse">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded">برنامج تدريبي</button>
                    <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded">تحديث اللياقة</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <ChartIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium mb-2">اختر لاعب</h3>
                <p className="text-gray-500">الرجاء اختيار لاعب من القائمة لعرض تفاصيل اللياقة</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Schedule Tab Content */}
      {activeTab === 'schedule' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">جدول التدريبات</h2>
          </div>
          <div className="p-6">
            <div className="flex justify-end mb-4">
              <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
                إضافة تدريب
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                { 
                  day: 'الأحد', 
                  date: '2024-03-05', 
                  sessions: [
                    { time: '09:00 - 11:00', type: 'لياقة بدنية', location: 'الملعب الرئيسي' },
                    { time: '16:00 - 17:30', type: 'تكتيك', location: 'صالة التدريب' }
                  ]
                },
                { 
                  day: 'الإثنين', 
                  date: '2024-03-06', 
                  sessions: [
                    { time: '09:00 - 10:30', type: 'تمارين استرجاع', location: 'الملعب الرئيسي' }
                  ]
                },
                { 
                  day: 'الثلاثاء', 
                  date: '2024-03-07', 
                  sessions: [
                    { time: '09:00 - 11:00', type: 'تكتيك هجومي', location: 'الملعب الرئيسي' },
                    { time: '16:00 - 17:30', type: 'تمارين قوة', location: 'صالة اللياقة' }
                  ]
                },
                { 
                  day: 'الأربعاء', 
                  date: '2024-03-08', 
                  sessions: [
                    { time: '09:00 - 11:00', type: 'تكتيك دفاعي', location: 'الملعب الرئيسي' }
                  ]
                },
                { 
                  day: 'الخميس', 
                  date: '2024-03-09', 
                  sessions: [
                    { time: '10:00 - 12:00', type: 'مباراة تجريبية', location: 'الملعب الرئيسي' }
                  ]
                }
              ].map((schedule, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-3 border-b">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{schedule.day}</h3>
                      <span className="text-sm text-gray-500">{schedule.date}</span>
                    </div>
                  </div>
                  <div className="divide-y">
                    {schedule.sessions.map((session, sessionIndex) => (
                      <div key={sessionIndex} className="p-4 hover:bg-gray-50">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{session.type}</p>
                            <p className="text-sm text-gray-500">{session.location}</p>
                          </div>
                          <div className="text-sm text-blue-600">{session.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 