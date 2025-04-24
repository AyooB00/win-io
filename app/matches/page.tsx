'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CalendarIcon, ChartIcon } from '@/app/components/ui/Icons';

// Mock data for matches
const matches = [
  {
    id: 1,
    homeTeam: { name: 'الهلال', logo: '/teams/hilal.png', score: 2 },
    awayTeam: { name: 'النصر', logo: '/teams/nassr.png', score: 1 },
    date: '2024-03-10T18:00:00',
    venue: 'استاد الملك فهد الدولي',
    status: 'completed',
    attendance: 62000,
    highlights: 'https://example.com/highlights/1',
  },
  {
    id: 2,
    homeTeam: { name: 'الاتحاد', logo: '/teams/ittihad.png', score: 0 },
    awayTeam: { name: 'الأهلي', logo: '/teams/ahli.png', score: 0 },
    date: '2024-03-15T19:30:00',
    venue: 'استاد مدينة الملك عبدالله الرياضية',
    status: 'upcoming',
    attendance: null,
    highlights: null,
  },
  {
    id: 3,
    homeTeam: { name: 'الشباب', logo: '/teams/shabab.png', score: 3 },
    awayTeam: { name: 'الفيصلي', logo: '/teams/faisaly.png', score: 0 },
    date: '2024-03-05T20:00:00',
    venue: 'استاد الأمير فيصل بن فهد',
    status: 'completed',
    attendance: 18000,
    highlights: 'https://example.com/highlights/3',
  },
  {
    id: 4,
    homeTeam: { name: 'الهلال', logo: '/teams/hilal.png', score: null },
    awayTeam: { name: 'الاتحاد', logo: '/teams/ittihad.png', score: null },
    date: '2024-03-20T19:00:00',
    venue: 'استاد الملك فهد الدولي',
    status: 'upcoming',
    attendance: null,
    highlights: null,
  },
  {
    id: 5,
    homeTeam: { name: 'الأهلي', logo: '/teams/ahli.png', score: 1 },
    awayTeam: { name: 'الشباب', logo: '/teams/shabab.png', score: 1 },
    date: '2024-03-01T18:30:00',
    venue: 'استاد مدينة الملك عبدالله الرياضية',
    status: 'completed',
    attendance: 22000,
    highlights: 'https://example.com/highlights/5',
  },
  {
    id: 6,
    homeTeam: { name: 'النصر', logo: '/teams/nassr.png', score: null },
    awayTeam: { name: 'الفيصلي', logo: '/teams/faisaly.png', score: null },
    date: '2024-03-25T20:30:00',
    venue: 'استاد الملك فهد الدولي',
    status: 'upcoming',
    attendance: null,
    highlights: null,
  }
];

export default function MatchesPage() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);

  // Format date and time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Filter matches based on selected filter
  const filteredMatches = matches.filter(match => {
    if (filter === 'all') return true;
    return match.status === filter;
  });

  const selectedMatchDetails = selectedMatch 
    ? matches.find(match => match.id === selectedMatch)
    : null;

  return (
    <div className="p-6 max-w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">المباريات</h1>
          <p className="text-gray-500">عرض وإدارة جدول المباريات</p>
        </div>
        <div className="mt-4 lg:mt-0">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 rtl:space-x-reverse">
            <CalendarIcon className="w-5 h-5" />
            <span>إضافة مباراة جديدة</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            كل المباريات
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-md ${
              filter === 'upcoming'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            المباريات القادمة
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-md ${
              filter === 'completed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            المباريات المنتهية
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Matches List */}
        <div className="col-span-1 lg:col-span-2">
          <div className="space-y-4">
            {filteredMatches.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <CalendarIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium mb-2">لا توجد مباريات</h3>
                <p className="text-gray-500">لا توجد مباريات متاحة ضمن الفلتر المحدد</p>
              </div>
            ) : (
              filteredMatches.map((match) => (
                <div 
                  key={match.id}
                  onClick={() => setSelectedMatch(match.id)}
                  className={`bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer ${
                    selectedMatch === match.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="mb-3 flex justify-between items-center">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <CalendarIcon className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-600">{formatDate(match.date)}</span>
                    </div>
                    <div className="text-sm px-2 py-1 rounded-full font-medium 
                      ${match.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}"
                    >
                      {match.status === 'completed' ? 'انتهت' : 'قادمة'}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {/* Home Team */}
                    <div className="flex flex-col items-center w-1/3">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                        <span className="text-lg font-bold">{match.homeTeam.name.substring(0, 2)}</span>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-sm">{match.homeTeam.name}</p>
                      </div>
                    </div>
                    
                    {/* Score */}
                    <div className="flex items-center justify-center w-1/3">
                      {match.status === 'completed' ? (
                        <div className="bg-gray-100 px-6 py-2 rounded-lg text-center">
                          <div className="text-2xl font-bold">
                            {match.homeTeam.score} - {match.awayTeam.score}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">النتيجة النهائية</div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-xl font-medium">{formatTime(match.date)}</div>
                          <div className="text-xs text-gray-500 mt-1">وقت المباراة</div>
                        </div>
                      )}
                    </div>
                    
                    {/* Away Team */}
                    <div className="flex flex-col items-center w-1/3">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                        <span className="text-lg font-bold">{match.awayTeam.name.substring(0, 2)}</span>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-sm">{match.awayTeam.name}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{match.venue}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Match Details */}
        <div className="col-span-1">
          {selectedMatchDetails ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center relative p-4">
                <div className="absolute top-0 right-0 m-4">
                  <div className="text-sm px-3 py-1 rounded-full bg-white bg-opacity-20 text-white font-medium">
                    {selectedMatchDetails.status === 'completed' ? 'انتهت' : 'قادمة'}
                  </div>
                </div>
                
                <div className="flex items-center justify-between w-full text-white">
                  {/* Home Team */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2">
                      <span className="text-lg font-bold text-blue-700">
                        {selectedMatchDetails.homeTeam.name.substring(0, 2)}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{selectedMatchDetails.homeTeam.name}</p>
                    </div>
                  </div>
                  
                  {/* Score */}
                  <div className="flex flex-col items-center">
                    {selectedMatchDetails.status === 'completed' ? (
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-1">
                          {selectedMatchDetails.homeTeam.score} - {selectedMatchDetails.awayTeam.score}
                        </div>
                        <div className="text-xs opacity-80">النتيجة النهائية</div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-1">VS</div>
                        <div className="text-sm opacity-80">{formatTime(selectedMatchDetails.date)}</div>
                      </div>
                    )}
                  </div>
                  
                  {/* Away Team */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2">
                      <span className="text-lg font-bold text-blue-700">
                        {selectedMatchDetails.awayTeam.name.substring(0, 2)}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{selectedMatchDetails.awayTeam.name}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <CalendarIcon className="w-5 h-5 text-gray-500 ml-2" />
                    <h3 className="font-semibold text-lg">تفاصيل المباراة</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 text-sm">التاريخ</p>
                      <p className="font-medium">{formatDate(selectedMatchDetails.date)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">الوقت</p>
                      <p className="font-medium">{formatTime(selectedMatchDetails.date)}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500 text-sm">الملعب</p>
                      <p className="font-medium">{selectedMatchDetails.venue}</p>
                    </div>
                    {selectedMatchDetails.status === 'completed' && selectedMatchDetails.attendance && (
                      <div className="col-span-2">
                        <p className="text-gray-500 text-sm">الحضور</p>
                        <p className="font-medium">{selectedMatchDetails.attendance.toLocaleString()} متفرج</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {selectedMatchDetails.status === 'completed' && (
                  <div className="mb-6 border-t pt-4">
                    <div className="flex items-center mb-4">
                      <ChartIcon className="w-5 h-5 text-gray-500 ml-2" />
                      <h3 className="font-semibold text-lg">إحصائيات المباراة</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1 text-sm">
                          <span>{Math.floor(Math.random() * 30) + 40}%</span>
                          <span>الاستحواذ</span>
                          <span>{Math.floor(Math.random() * 30) + 40}%</span>
                        </div>
                        <div className="flex h-2 rounded-full overflow-hidden">
                          <div className="bg-blue-600" style={{ width: '55%' }}></div>
                          <div className="bg-red-600" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1 text-sm">
                          <span>{Math.floor(Math.random() * 10) + 5}</span>
                          <span>التسديدات</span>
                          <span>{Math.floor(Math.random() * 10) + 5}</span>
                        </div>
                        <div className="flex h-2 rounded-full overflow-hidden">
                          <div className="bg-blue-600" style={{ width: '65%' }}></div>
                          <div className="bg-red-600" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1 text-sm">
                          <span>{Math.floor(Math.random() * 5) + 2}</span>
                          <span>الركنيات</span>
                          <span>{Math.floor(Math.random() * 5) + 2}</span>
                        </div>
                        <div className="flex h-2 rounded-full overflow-hidden">
                          <div className="bg-blue-600" style={{ width: '40%' }}></div>
                          <div className="bg-red-600" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex pt-4 space-x-2 rtl:space-x-reverse">
                  {selectedMatchDetails.status === 'upcoming' ? (
                    <>
                      <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded">إدارة التشكيلة</button>
                      <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded">التنبؤ بالتشكيلة</button>
                    </>
                  ) : (
                    <>
                      <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded">تحليل المباراة</button>
                      {selectedMatchDetails.highlights && (
                        <button className="px-3 py-2 bg-red-600 text-white rounded flex items-center">
                          <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                          الأهداف
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <CalendarIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">اختر مباراة</h3>
              <p className="text-gray-500">الرجاء اختيار مباراة من القائمة لعرض التفاصيل</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 