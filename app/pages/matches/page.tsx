'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { mockMatches } from '@/app/data/mockData';
import Link from 'next/link';
import Image from 'next/image';

const MatchesPage = () => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  
  // Filter matches based on selection
  const filteredMatches = mockMatches.filter(match => {
    if (filter === 'all') return true;
    return filter === match.status;
  });

  // Format date to readable format
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Format time from date
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-wrap gap-2">
        <Button 
          variant={filter === 'all' ? 'primary' : 'outline'} 
          onClick={() => setFilter('all')}
        >
          جميع المباريات
        </Button>
        <Button 
          variant={filter === 'upcoming' ? 'primary' : 'outline'} 
          onClick={() => setFilter('upcoming')}
        >
          المباريات القادمة
        </Button>
        <Button 
          variant={filter === 'completed' ? 'primary' : 'outline'} 
          onClick={() => setFilter('completed')}
        >
          المباريات السابقة
        </Button>
      </div>
      
      <div className="space-y-6">
        {filteredMatches.length === 0 ? (
          <Card>
            <div className="py-8 text-center text-gray-500">
              لا توجد مباريات متاحة
            </div>
          </Card>
        ) : (
          filteredMatches.map((match) => {
            const isCompleted = match.status === 'completed';
            
            return (
              <Card key={match.id} className="hover:shadow-md transition-shadow">
                <div className="border-b pb-3 flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-blue-600">{match.competition || 'مباراة ودية'}</span>
                    <div className="text-gray-500 text-sm mt-1">
                      {formatDate(match.date)} · {formatTime(match.date)}
                    </div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      match.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                      match.status === 'live' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {match.status === 'upcoming' ? 'قادمة' : 
                       match.status === 'live' ? 'مباشر' : 'انتهت'}
                    </span>
                  </div>
                </div>
                
                <div className="py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-16 h-16 relative">
                        {match.homeTeam.logo ? (
                          <Image
                            src={match.homeTeam.logo}
                            alt={match.homeTeam.name}
                            width={64}
                            height={64}
                            className="object-contain"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-lg font-semibold">{match.homeTeam.name.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div className="mr-4">
                        <h3 className="font-bold text-lg">{match.homeTeam.name}</h3>
                        <p className="text-gray-500 text-sm">
                          {isCompleted ? 'المضيف' : 'فريق الأرض'}
                        </p>
                      </div>
                    </div>
                    
                    {isCompleted && match.result ? (
                      <div className="flex items-center">
                        <div className="text-center mx-4">
                          <div className="text-2xl font-bold">
                            {match.result.homeTeamScore} - {match.result.awayTeamScore}
                          </div>
                          <div className="text-xs text-gray-500">النتيجة النهائية</div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xl font-semibold text-gray-400">vs</div>
                    )}
                    
                    <div className="flex items-center">
                      <div className="ml-4 text-left">
                        <h3 className="font-bold text-lg">{match.awayTeam.name}</h3>
                        <p className="text-gray-500 text-sm">
                          {isCompleted ? 'الضيف' : 'الفريق الزائر'}
                        </p>
                      </div>
                      <div className="w-16 h-16 relative">
                        {match.awayTeam.logo ? (
                          <Image
                            src={match.awayTeam.logo}
                            alt={match.awayTeam.name}
                            width={64}
                            height={64}
                            className="object-contain"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-lg font-semibold">{match.awayTeam.name.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4 flex items-center justify-between">
                  <div className="text-gray-500">
                    {match.venue}
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/matches/${match.id}`} passHref>
                      <Button size="sm">التفاصيل</Button>
                    </Link>
                    {match.status === 'upcoming' && (
                      <Link href={`/tactics/${match.id}`} passHref>
                        <Button variant="success" size="sm">التحليل التكتيكي</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
};

export default MatchesPage; 