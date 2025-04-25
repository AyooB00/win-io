import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { Match } from '@/app/types';
import { getTeamById } from '@/app/data/mockData';

interface UpcomingMatchesProps {
  matches: Match[];
}

export const UpcomingMatches: React.FC<UpcomingMatchesProps> = ({ matches }) => {
  // Function to format date nicely
  const formatMatchDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const matchDate = new Date(date);
    matchDate.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dateFormatter = new Intl.DateTimeFormat('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    const timeFormatter = new Intl.DateTimeFormat('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
    });
    
    let dateText;
    if (matchDate.getTime() === today.getTime()) {
      dateText = 'اليوم';
    } else if (matchDate.getTime() === tomorrow.getTime()) {
      dateText = 'غدًا';
    } else {
      dateText = dateFormatter.format(date);
    }
    
    return {
      date: dateText,
      time: timeFormatter.format(date),
    };
  };
  
  // Sort matches by date
  const sortedMatches = [...matches].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  
  return (
    <Card 
      title="المباريات القادمة"
      headerAction={
        <Link href="/matches" passHref>
          <Button variant="outline" size="sm">
            عرض الكل
          </Button>
        </Link>
      }
    >
      <div className="space-y-4">
        {sortedMatches.length === 0 ? (
          <p className="text-gray-500 text-center py-4">لا توجد مباريات قادمة</p>
        ) : (
          sortedMatches.map((match) => {
            const homeTeam = match.homeTeam;
            const awayTeam = match.awayTeam;
            const { date, time } = formatMatchDate(match.date);
            
            return (
              <div 
                key={match.id} 
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm font-medium text-gray-500">{match.competition}</div>
                  <div className="text-sm text-blue-600">{date} · {time}</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 relative">
                      {homeTeam?.logo ? (
                        <Image
                          src={homeTeam.logo}
                          alt={homeTeam.name}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm">{homeTeam?.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <span className="mr-3 font-medium">{homeTeam?.name}</span>
                  </div>
                  
                  <div className="text-gray-500 font-medium">vs</div>
                  
                  <div className="flex items-center">
                    <span className="ml-3 font-medium">{awayTeam?.name}</span>
                    <div className="w-10 h-10 relative">
                      {awayTeam?.logo ? (
                        <Image
                          src={awayTeam.logo}
                          alt={awayTeam.name}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm">{awayTeam?.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 border-t pt-3 flex justify-between">
                  <div className="text-sm text-gray-500">{match.venue}</div>
                  <div>
                    <Link href={`/matches/${match.id}`} passHref>
                      <Button variant="outline" size="sm">
                        التفاصيل
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};

export default UpcomingMatches;