'use client';

import React, { useState } from 'react';
import {DashboardLayout} from '@/app/components/layout/DashboardLayout';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { mockPlayers, getMedicalRecordsByPlayerId } from '@/app/data/mockData';
import Link from 'next/link';

const MedicalPage = () => {
  const [filter, setFilter] = useState<'all' | 'injured' | 'available'>('all');
  
  // Filter players based on selection
  const filteredPlayers = mockPlayers.filter(player => {
    if (filter === 'all') return true;
    if (filter === 'injured') return player.medicalRecord?.status === 'injured';
    return player.medicalRecord?.status === 'available';
  });
  
  // Helper to get recovery days remaining
  const getRecoveryDaysRemaining = (player: typeof mockPlayers[0]) => {
    if (player.medicalRecord?.status !== 'injured') return null;
    
    const latestRecord = getMedicalRecordsByPlayerId(player.id)[0];
    if (!latestRecord?.expectedRecovery) return null;
    
    const recoveryDate = new Date(latestRecord.expectedRecovery);
    const today = new Date();
    
    const diffTime = recoveryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-wrap gap-2">
        <Button 
          variant={filter === 'all' ? 'primary' : 'outline'} 
          onClick={() => setFilter('all')}
        >
          جميع اللاعبين
        </Button>
        <Button 
          variant={filter === 'injured' ? 'primary' : 'outline'} 
          onClick={() => setFilter('injured')}
        >
          اللاعبون المصابون
        </Button>
        <Button 
          variant={filter === 'available' ? 'primary' : 'outline'} 
          onClick={() => setFilter('available')}
        >
          اللاعبون الجاهزون
        </Button>
      </div>
      
      <Card title="السجل الطبي للفريق"
        headerAction={
          <Button variant="primary" size="sm">
            إضافة تقرير طبي
          </Button>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  اللاعب
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المركز
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  آخر تشخيص
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تاريخ العودة المتوقع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الجاهزية البدنية
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlayers.map((player) => {
                const latestRecord = getMedicalRecordsByPlayerId(player.id)[0] || null;
                const recoveryDays = getRecoveryDaysRemaining(player);
                
                return (
                  <tr key={player.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="font-medium text-blue-800">{player.jerseyNumber}</span>
                        </div>
                        <div className="mr-4">
                          <div className="text-sm font-medium text-gray-900">{player.name}</div>
                          <div className="text-sm text-gray-500">{player.age} سنة</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {player.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        player.medicalRecord?.status === 'available' ? 'bg-green-100 text-green-800' :
                        player.medicalRecord?.status === 'injured' ? 'bg-red-100 text-red-800' :
                        player.medicalRecord?.status === 'recovering' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {player.medicalRecord?.status === 'available' ? 'جاهز' :
                         player.medicalRecord?.status === 'injured' ? 'مصاب' :
                         player.medicalRecord?.status === 'recovering' ? 'يتعافى' : 'غير متاح'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {latestRecord ? latestRecord.diagnosis : 'لا يوجد'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {latestRecord && player.medicalRecord?.status === 'injured' && latestRecord.expectedRecovery ? (
                        <div>
                          <div>{formatDate(latestRecord.expectedRecovery)}</div>
                          {recoveryDays !== null && recoveryDays > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              متبقي {recoveryDays} يوم
                            </div>
                          )}
                        </div>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full h-2 bg-gray-200 rounded-full mr-2">
                          <div 
                            className={`h-full rounded-full ${
                              player.stats.fitnessLevel >= 80 ? 'bg-green-500' :
                              player.stats.fitnessLevel >= 60 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${player.stats.fitnessLevel}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{player.stats.fitnessLevel}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Link href={`/medical/player/${player.id}`} passHref>
                          <Button size="sm" variant="outline">
                            عرض السجل
                          </Button>
                        </Link>
                        <Link href={`/medical/update/${player.id}`} passHref>
                          <Button size="sm" variant="primary">
                            تحديث
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default MedicalPage; 