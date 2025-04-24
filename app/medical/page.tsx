'use client';

import React, { useState } from 'react';
import { MedicalIcon, UserGroupIcon, ChartIcon } from '@/app/components/ui/Icons';
import { mockMedicalRecords, mockPlayers } from '@/app/data/mockData';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define interfaces for type safety
interface MedicalRecord {
  id: string;
  playerId: string;
  playerName: string;
  status: 'available' | 'injured' | 'recovering';
  diagnosis: string;
  diagnosisDate: Date;
  expectedRecovery: Date | null;
  fitnessLevel: number;
  notes: string;
}

interface Player {
  id: string;
  name: string;
  position: string;
  jerseyNumber?: number;
}

// Define enum for medical status
enum MedicalStatus {
  All = 'all',
  Injured = 'injured',
  Recovering = 'recovering',
  Available = 'available'
}

// Define type for filters
interface Filters {
  status: MedicalStatus;
  sort: string;
}

// Arabic translation for status
const medicalStatusArabic = {
  [MedicalStatus.All]: 'الكل',
  [MedicalStatus.Injured]: 'مصاب',
  [MedicalStatus.Recovering]: 'في مرحلة التعافي',
  [MedicalStatus.Available]: 'متاح'
};

export default function MedicalPage() {
  // Define state for filters
  const [filters, setFilters] = useState<Filters>({
    status: MedicalStatus.All,
    sort: 'name'
  });
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);

  // Handle filter changes
  const handleFilterChange = (key: keyof Filters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Filter records based on selected filter
  const filteredRecords = mockMedicalRecords.filter(record => {
    if (filters.status === MedicalStatus.All) return true;
    if (filters.status === MedicalStatus.Injured) return record.status === 'injured';
    if (filters.status === MedicalStatus.Recovering) return record.status === 'recovering';
    if (filters.status === MedicalStatus.Available) return record.status === 'available';
    return true;
  });

  // Find the selected record
  const recordDetail = selectedRecord 
    ? mockMedicalRecords.find(record => record.id === selectedRecord)
    : null;

  // Find player details for the selected record
  const playerDetail = recordDetail
    ? mockPlayers.find(player => player.id === recordDetail.playerId)
    : null;

  const getStatusColor = (status: 'available' | 'injured' | 'recovering'): string => {
    switch(status) {
      case 'injured':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'recovering':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'available':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: 'available' | 'injured' | 'recovering'): string => {
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
  const formatDate = (date: Date | string | null): string => {
    if (!date) return 'غير محدد';
    
    const dateObj = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-2">السجل الطبي</h1>
      <p className="text-muted-foreground mb-8">إدارة ومتابعة الحالة الصحية للاعبين</p>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">تصفية السجلات</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status Filter */}
            <Select 
              value={filters.status} 
              onValueChange={(value: MedicalStatus) => handleFilterChange('status', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="تصفية حسب الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={MedicalStatus.All}>{medicalStatusArabic[MedicalStatus.All]}</SelectItem>
                <SelectItem value={MedicalStatus.Injured}>{medicalStatusArabic[MedicalStatus.Injured]}</SelectItem>
                <SelectItem value={MedicalStatus.Recovering}>{medicalStatusArabic[MedicalStatus.Recovering]}</SelectItem>
                <SelectItem value={MedicalStatus.Available}>{medicalStatusArabic[MedicalStatus.Available]}</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Sort Filter */}
            <Select 
              value={filters.sort} 
              onValueChange={(value: string) => handleFilterChange('sort', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">اسم اللاعب</SelectItem>
                <SelectItem value="date">تاريخ التشخيص</SelectItem>
                <SelectItem value="fitness">مستوى اللياقة</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="md:w-auto md:self-end">
              <span>تطبيق الفلتر</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Medical Records List */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">سجلات اللاعبين الطبية</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">اللاعب</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">آخر تشخيص</TableHead>
                    <TableHead className="text-right">تاريخ التعافي</TableHead>
                    <TableHead className="text-right">مستوى اللياقة</TableHead>
                    <TableHead className="text-right">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground h-32">
                        لا توجد سجلات متاحة ضمن الفلتر المحدد
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRecords.map((record) => (
                      <TableRow 
                        key={record.id}
                        onClick={() => setSelectedRecord(record.id)}
                        className={`cursor-pointer hover:bg-accent ${
                          selectedRecord === record.id ? 'bg-accent' : ''
                        }`}
                      >
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{record.playerName.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="mr-4">
                              <div className="text-sm font-medium">
                                {record.playerName}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(record.status)}>
                            {getStatusLabel(record.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {record.diagnosis}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(record.expectedRecovery)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {/* Custom progress bar since we don't have the Progress component */}
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  record.fitnessLevel > 80 ? 'bg-green-500 dark:bg-green-400' : 
                                  record.fitnessLevel > 60 ? 'bg-yellow-500 dark:bg-yellow-400' : 'bg-red-500 dark:bg-red-400'
                                }`}
                                style={{ width: `${record.fitnessLevel}%` }}
                              />
                            </div>
                            <span className="text-sm">{record.fitnessLevel}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="text-primary">عرض</Button>
                            <Button size="sm" variant="ghost" className="text-muted-foreground">تحديث</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Medical Record Details */}
        <Card className="col-span-1 h-fit sticky top-6">
          {recordDetail && playerDetail ? (
            <>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{playerDetail.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{playerDetail.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {playerDetail.position} {playerDetail.jerseyNumber && `| #${playerDetail.jerseyNumber}`}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Badge className={getStatusColor(recordDetail.status)}>
                    {getStatusLabel(recordDetail.status)}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-muted-foreground">التشخيص</h3>
                    <p className="font-medium mt-1">{recordDetail.diagnosis}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm text-muted-foreground">تاريخ التشخيص</h3>
                      <p className="font-medium mt-1">{formatDate(recordDetail.diagnosisDate)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-muted-foreground">تاريخ التعافي المتوقع</h3>
                      <p className="font-medium mt-1">{formatDate(recordDetail.expectedRecovery)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-muted-foreground mb-2">مستوى اللياقة</h3>
                    <div className="flex items-center gap-2">
                      {/* Custom progress bar */}
                      <div className="h-2.5 flex-1 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            recordDetail.fitnessLevel > 80 ? 'bg-green-500 dark:bg-green-400' : 
                            recordDetail.fitnessLevel > 60 ? 'bg-yellow-500 dark:bg-yellow-400' : 'bg-red-500 dark:bg-red-400'
                          }`} 
                          style={{ width: `${recordDetail.fitnessLevel}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{recordDetail.fitnessLevel}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-muted-foreground">ملاحظات</h3>
                    <p className="mt-1">{recordDetail.notes}</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border flex gap-3">
                  <Button className="flex-1">تحديث الحالة</Button>
                  <Button variant="outline" className="flex items-center gap-1">
                    <ChartIcon className="w-4 h-4" />
                    <span>تقرير مفصل</span>
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader className="text-center pb-2">
                <MedicalIcon className="w-16 h-16 mx-auto text-muted-foreground/60 mb-4" />
                <CardTitle className="text-xl">اختر سجل طبي</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-2">
                <p className="text-muted-foreground">الرجاء اختيار سجل طبي من القائمة لعرض التفاصيل</p>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
} 