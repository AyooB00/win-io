'use client';

import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CalendarIcon, 
  Filter, 
  PlusCircle, 
  Search, 
  ClipboardList,
  Bandage
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export default function MedicalInjuriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [injuryType, setInjuryType] = useState('all');
  
  const injuries = [
    {
      id: "INJ-001",
      patientName: "خالد القحطاني",
      patientId: "PLR-003",
      patientAvatar: "/avatars/player3.png",
      injuryType: "تمزق الرباط الصليبي",
      severity: "شديدة",
      status: "تحت العلاج",
      recoveryProgress: 10,
      occurrenceDate: "2024-05-10",
      estimatedRecovery: "2024-07-15",
      doctor: "د. محمد سالم",
      treatmentPlan: "جراحة وإعادة تأهيل لمدة شهرين",
      location: "الركبة اليمنى",
    },
    {
      id: "INJ-002",
      patientName: "محمد العنزي",
      patientId: "PLR-002",
      patientAvatar: "/avatars/player2.png",
      injuryType: "إلتواء الكاحل",
      severity: "متوسطة",
      status: "متعافي",
      recoveryProgress: 100,
      occurrenceDate: "2024-04-10",
      estimatedRecovery: "2024-05-10",
      doctor: "د. فهد الحارثي",
      treatmentPlan: "علاج طبيعي وراحة",
      location: "الكاحل الأيسر",
    },
    {
      id: "INJ-003",
      patientName: "عبدالله الحمدان",
      patientId: "PLR-008",
      patientAvatar: "/avatars/player8.png",
      injuryType: "تمزق عضلي",
      severity: "متوسطة",
      status: "تحت العلاج",
      recoveryProgress: 60,
      occurrenceDate: "2024-04-25",
      estimatedRecovery: "2024-05-20",
      doctor: "د. محمد سالم",
      treatmentPlan: "علاج طبيعي وتقوية العضلات",
      location: "الفخذ الأيمن",
    },
    {
      id: "INJ-004",
      patientName: "فهد المولد",
      patientId: "PLR-005",
      patientAvatar: "/avatars/player5.png",
      injuryType: "شد عضلي",
      severity: "خفيفة",
      status: "متعافي",
      recoveryProgress: 100,
      occurrenceDate: "2024-04-28",
      estimatedRecovery: "2024-05-08",
      doctor: "د. محمد سالم",
      treatmentPlan: "راحة وتمارين تمدد",
      location: "عضلات الظهر",
    },
    {
      id: "INJ-005",
      patientName: "سلمان الفرج",
      patientId: "PLR-012",
      patientAvatar: "/avatars/player12.png",
      injuryType: "كدمة",
      severity: "خفيفة",
      status: "تحت العلاج",
      recoveryProgress: 80,
      occurrenceDate: "2024-05-05",
      estimatedRecovery: "2024-05-12",
      doctor: "د. فهد الحارثي",
      treatmentPlan: "كمادات وراحة",
      location: "الساق اليسرى",
    }
  ];

  const filteredInjuries = injuries.filter(injury => {
    const matchesQuery = injury.patientName.includes(searchQuery) || 
                          injury.id.includes(searchQuery) ||
                          injury.injuryType.includes(searchQuery) ||
                          injury.location.includes(searchQuery);
    
    const matchesType = injuryType === 'all' || injury.injuryType === injuryType;
    
    return matchesQuery && matchesType;
  });
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'شديدة': return 'bg-red-500';
      case 'متوسطة': return 'bg-orange-500';
      case 'خفيفة': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'متعافي': return 'bg-green-500';
      case 'تحت العلاج': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">الإصابات</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            تصفية
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            تسجيل إصابة جديدة
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الإصابات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{injuries.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">تحت العلاج</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{injuries.filter(i => i.status === 'تحت العلاج').length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((injuries.filter(i => i.status === 'تحت العلاج').length / injuries.length) * 100)}% من الإجمالي
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">متعافي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{injuries.filter(i => i.status === 'متعافي').length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((injuries.filter(i => i.status === 'متعافي').length / injuries.length) * 100)}% من الإجمالي
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إصابات شديدة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{injuries.filter(i => i.severity === 'شديدة').length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((injuries.filter(i => i.severity === 'شديدة').length / injuries.length) * 100)}% من الإجمالي
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>سجل الإصابات</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن إصابة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-4 w-full sm:w-64"
                />
              </div>
              <Select value={injuryType} onValueChange={setInjuryType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="نوع الإصابة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الإصابات</SelectItem>
                  <SelectItem value="تمزق الرباط الصليبي">تمزق الرباط الصليبي</SelectItem>
                  <SelectItem value="إلتواء الكاحل">إلتواء الكاحل</SelectItem>
                  <SelectItem value="تمزق عضلي">تمزق عضلي</SelectItem>
                  <SelectItem value="شد عضلي">شد عضلي</SelectItem>
                  <SelectItem value="كدمة">كدمة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الإصابة</TableHead>
                  <TableHead>المريض</TableHead>
                  <TableHead>نوع الإصابة</TableHead>
                  <TableHead>موقع الإصابة</TableHead>
                  <TableHead>شدة الإصابة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تاريخ الإصابة</TableHead>
                  <TableHead>التعافي المتوقع</TableHead>
                  <TableHead>نسبة التعافي</TableHead>
                  <TableHead className="text-left">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInjuries.map((injury) => (
                  <TableRow key={injury.id}>
                    <TableCell className="font-medium">{injury.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={injury.patientAvatar} alt={injury.patientName} />
                          <AvatarFallback>{injury.patientName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{injury.patientName}</div>
                      </div>
                    </TableCell>
                    <TableCell>{injury.injuryType}</TableCell>
                    <TableCell>{injury.location}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getSeverityColor(injury.severity)} text-white`}>
                        {injury.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getStatusColor(injury.status)} text-white`}>
                        {injury.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarIcon className="h-3.5 w-3.5 ml-1" />
                        {injury.occurrenceDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarIcon className="h-3.5 w-3.5 ml-1" />
                        {injury.estimatedRecovery}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={injury.recoveryProgress} className="h-2 w-24" />
                        <span className="text-xs">{injury.recoveryProgress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-start gap-1">
                        <Button variant="ghost" size="sm">
                          <Bandage className="h-4 w-4" />
                          <span className="sr-only">معالجة</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ClipboardList className="h-4 w-4" />
                          <span className="sr-only">تفاصيل</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 