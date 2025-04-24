'use client';

import React, { useState } from 'react';
import {DashboardLayout} from '@/app/components/layout/DashboardLayout';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import Image from 'next/image';
import { mockPlayers, mockTeams } from '@/app/data/mockData';
import Link from 'next/link';

const TeamPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const team = mockTeams[0]; // Assuming the first team is the current team
  
  // Filter players based on selected filter
  const filteredPlayers = mockPlayers.filter(player => {
    if (selectedFilter === 'all') return true;
    return player.medicalRecord?.status === selectedFilter;
  });
  
  // Group players by position
  const playersByPosition: Record<string, typeof mockPlayers> = {
    'حراس المرمى': filteredPlayers.filter(p => p.position.includes('حارس')),
    'المدافعون': filteredPlayers.filter(p => p.position.includes('مدافع')),
    'لاعبو الوسط': filteredPlayers.filter(p => 
      p.position.includes('وسط') || 
      p.position.includes('ارتكاز') || 
      p.position.includes('صانع ألعاب')
    ),
    'المهاجمون': filteredPlayers.filter(p => 
      p.position.includes('مهاجم') || 
      p.position.includes('جناح')
    ),
  };
  
  // Status indicator component
  const StatusIndicator = ({ status }: { status: string }) => {
    const statusStyles: Record<string, string> = {
      available: 'bg-green-500',
      injured: 'bg-red-500',
      suspended: 'bg-yellow-500',
      resting: 'bg-gray-400',
    };
    
    const statusLabels: Record<string, string> = {
      available: 'جاهز',
      injured: 'مصاب',
      suspended: 'موقوف',
      resting: 'راحة',
    };
    
    return (
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full ${statusStyles[status]} ml-2`}></div>
        <span className="text-sm text-gray-600">{statusLabels[status]}</span>
      </div>
    );
  };
  
  return (
    <DashboardLayout>
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-16 h-16 relative">
              {team.logo ? (
                <Image
                  src={team.logo}
                  alt={team.name}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              ) : (
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">{team.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <div className="mr-4">
              <h2 className="text-xl font-bold">{team.name}</h2>
              <p className="text-gray-500">{team.stadium}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className={selectedFilter === 'all' ? 'bg-gray-100' : ''} onClick={() => setSelectedFilter('all')}>
              الكل ({mockPlayers.length})
            </Button>
            <Button variant="outline" size="sm" className={selectedFilter === 'available' ? 'bg-gray-100' : ''} onClick={() => setSelectedFilter('available')}>
              جاهز ({mockPlayers.filter(p => p.medicalRecord?.status === 'available').length})
            </Button>
            <Button variant="outline" size="sm" className={selectedFilter === 'injured' ? 'bg-gray-100' : ''} onClick={() => setSelectedFilter('injured')}>
              مصاب ({mockPlayers.filter(p => p.medicalRecord?.status === 'injured').length})
            </Button>
            <Button variant="outline" size="sm" className={selectedFilter === 'recovering' ? 'bg-gray-100' : ''} onClick={() => setSelectedFilter('recovering')}>
              يتعافى ({mockPlayers.filter(p => p.medicalRecord?.status === 'recovering').length})
            </Button>
          </div>
        </div>
      </Card>
      
      {Object.entries(playersByPosition).map(([position, players]) => (
        players.length > 0 && (
          <Card key={position} title={position} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {players.map((player) => (
                <Link key={player.id} href={`/player/${player.id}`} passHref>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold">
                        {player.jerseyNumber}
                      </div>
                      <div className="mr-3">
                        <h3 className="font-medium">{player.name}</h3>
                        <div className="flex items-center mt-1">
                          <StatusIndicator status={player.medicalRecord?.status || 'unavailable'} />
                          <span className="mx-2">•</span>
                          <span className="text-sm text-gray-500">{player.position}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between">
                      <div className="text-sm text-gray-500">
                        الجاهزية: <span className="font-medium">{player.stats.fitnessLevel}%</span>
                      </div>
                      <div className="text-sm">
                        {player.stats.goals} أهداف | {player.stats.assists} تمريرات حاسمة
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        )
      ))}
    </DashboardLayout>
  );
};

export default TeamPage; 