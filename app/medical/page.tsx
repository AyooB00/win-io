'use client';

import React, { useState } from 'react';
import { MedicalIcon, UserGroupIcon, ChartIcon } from '@/app/components/ui/Icons';
import { mockMedicalRecords, mockPlayers } from '@/app/data/mockData';

export default function MedicalPage() {
  const [filter, setFilter] = useState<'all' | 'injured' | 'available'>('all');
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null);

  // Filter records based on selected filter
  const filteredRecords = mockMedicalRecords.filter(record => {
    if (filter === 'all') return true;
    if (filter === 'injured') return record.status === 'injured' || record.status === 'recovering';
    return record.status === 'available';
  });

  // Find the selected record
  const recordDetail = selectedRecord 
    ? mockMedicalRecords.find(record => record.id === selectedRecord)
    : null;

  // Find player details for the selected record
  const playerDetail = recordDetail
    ? mockPlayers.find(player => player.id === recordDetail.playerId)
    : null;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'injured':
        return 'bg-red-100 text-red-700';
      case 'recovering':
        return 'bg-yellow-100 text-yellow-700';
      case 'available':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'injured':
        return 'مصاب';
      case 'recovering':
        return 'في مرحلة التعافي';
      case 'available':
        return 'متاح';
      default:
        return 'غير محدد';
    }
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'غير محدد';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="p-6 max-w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">السجل الطبي</h1>
          <p className="text-gray-500">إدارة ومتابعة الحالة الصحية للاعبين</p>
        </div>
        <div className="mt-4 lg:mt-0">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 rtl:space-x-reverse">
            <MedicalIcon className="w-5 h-5" />
            <span>إضافة تقرير طبي</span>
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
            جميع اللاعبين
          </button>
          <button
            onClick={() => setFilter('injured')}
            className={`px-4 py-2 rounded-md ${
              filter === 'injured'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            المصابين
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-4 py-2 rounded-md ${
              filter === 'available'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            المتاحين
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Medical Records List */}
        <div className="col-span-1 lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">سجلات اللاعبين الطبية</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      اللاعب
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      آخر تشخيص
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      تاريخ التعافي المتوقع
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      مستوى اللياقة
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      إجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        لا توجد سجلات متاحة ضمن الفلتر المحدد
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((record) => (
                      <tr 
                        key={record.id}
                        onClick={() => setSelectedRecord(record.id)}
                        className={`hover:bg-gray-50 cursor-pointer ${
                          selectedRecord === record.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-sm font-medium">{record.playerName.substring(0, 2)}</span>
                            </div>
                            <div className="mr-4">
                              <div className="text-sm font-medium text-gray-900">
                                {record.playerName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                            {getStatusLabel(record.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.diagnosis}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(record.expectedRecovery)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-2 flex-shrink-0">
                              <span className={`inline-block h-2 w-2 rounded-full ${
                                record.fitnessLevel > 80 ? 'bg-green-500' : 
                                record.fitnessLevel > 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}></span>
                            </div>
                            <div>
                              <div className="text-sm text-gray-900">{record.fitnessLevel}%</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-800 ml-2">عرض</button>
                          <button className="text-gray-600 hover:text-gray-800">تحديث</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Medical Record Details */}
        <div className="col-span-1">
          {recordDetail && playerDetail ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-5 border-b">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-lg font-medium">{playerDetail.name.substring(0, 2)}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{playerDetail.name}</h2>
                    <p className="text-gray-500 text-sm">
                      {playerDetail.position} | #{playerDetail.number}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="mb-6">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(recordDetail.status)}`}>
                    {getStatusLabel(recordDetail.status)}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-gray-500">التشخيص</h3>
                    <p className="font-medium">{recordDetail.diagnosis}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm text-gray-500">تاريخ التشخيص</h3>
                      <p className="font-medium">{formatDate(recordDetail.diagnosisDate)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500">تاريخ التعافي المتوقع</h3>
                      <p className="font-medium">{formatDate(recordDetail.expectedRecovery)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500 mb-2">مستوى اللياقة</h3>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            recordDetail.fitnessLevel > 80 ? 'bg-green-500' : 
                            recordDetail.fitnessLevel > 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} 
                          style={{ width: `${recordDetail.fitnessLevel}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{recordDetail.fitnessLevel}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500">ملاحظات</h3>
                    <p className="text-gray-700 mt-1">{recordDetail.notes}</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t flex space-x-2 rtl:space-x-reverse">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded">تحديث الحالة</button>
                  <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded flex items-center">
                    <ChartIcon className="w-5 h-5 ml-1" />
                    تقرير مفصل
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <MedicalIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">اختر سجل طبي</h3>
              <p className="text-gray-500">الرجاء اختيار سجل طبي من القائمة لعرض التفاصيل</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 