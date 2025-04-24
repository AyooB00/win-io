'use client';

import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
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
  ListChecks,
  ClockIcon,
  UserPlus
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function MedicalCheckupsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  const upcomingCheckups = [
    {
      id: "CHK-001",
      patientName: "سعود الدوسري",
      patientId: "PLR-004",
      patientAvatar: "/avatars/player4.png",
      type: "فحص دوري",
      status: "مجدول",
      date: "2024-06-02",
      time: "10:00",
      doctor: "د. فهد الحارثي",
      location: "العيادة الرئيسية",
      notes: "فحص دوري قبل بداية المعسكر",
      priority: "عادي"
    },
    {
      id: "CHK-002",
      patientName: "محمد العنزي",
      patientId: "PLR-002",
      patientAvatar: "/avatars/player2.png",
      type: "متابعة إصابة",
      status: "مجدول",
      date: "2024-05-15",
      time: "11:30",
      doctor: "د. محمد سالم",
      location: "غرفة العلاج الطبيعي",
      notes: "متابعة حالة إصابة الكاحل",
      priority: "عاجل"
    },
    {
      id: "CHK-003",
      patientName: "خالد القحطاني",
      patientId: "PLR-003",
      patientAvatar: "/avatars/player3.png",
      type: "فحص ما بعد العملية",
      status: "مجدول",
      date: "2024-05-18",
      time: "09:00",
      doctor: "د. فهد الحارثي",
      location: "مستشفى التخصصي",
      notes: "متابعة بعد عملية الرباط الصليبي",
      priority: "عاجل"
    },
    {
      id: "CHK-004",
      patientName: "أحمد الشمري",
      patientId: "PLR-001",
      patientAvatar: "/avatars/player1.png",
      type: "فحص دوري",
      status: "مكتمل",
      date: "2024-05-10",
      time: "10:30",
      doctor: "د. محمد سالم",
      location: "العيادة الرئيسية",
      notes: "اكتمل الفحص بنجاح، حالة اللاعب مستقرة",
      priority: "عادي"
    },
    {
      id: "CHK-005",
      patientName: "فهد المولد",
      patientId: "PLR-005",
      patientAvatar: "/avatars/player5.png",
      type: "متابعة تعافي",
      status: "مجدول",
      date: "2024-05-22",
      time: "14:00",
      doctor: "د. محمد سالم",
      location: "غرفة العلاج الطبيعي",
      notes: "متابعة برنامج التعافي من الشد العضلي",
      priority: "متوسط"
    }
  ];

  const completedCheckups = upcomingCheckups.filter(c => c.status === 'مكتمل');
  const pendingCheckups = upcomingCheckups.filter(c => c.status === 'مجدول');

  const filteredCheckups = upcomingCheckups.filter(checkup => {
    return checkup.patientName.includes(searchQuery) || 
           checkup.id.includes(searchQuery) ||
           checkup.type.includes(searchQuery) ||
           checkup.doctor.includes(searchQuery);
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-500';
      case 'مجدول': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عاجل': return 'bg-red-500';
      case 'متوسط': return 'bg-orange-500';
      case 'عادي': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getDayCheckups = (day: Date) => {
    const formattedDay = format(day, 'yyyy-MM-dd');
    return upcomingCheckups.filter(checkup => checkup.date === formattedDay);
  };

  // Get checkups for the selected date
  const selectedDateCheckups = getDayCheckups(currentDate);
  
  // Sort checkups by time
  const sortedCheckups = [...selectedDateCheckups].sort((a, b) => {
    return a.time.localeCompare(b.time);
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">جدول الكشوفات</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            تصفية
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            إضافة موعد جديد
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المواعيد اليوم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getDayCheckups(new Date()).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {format(new Date(), 'EEEE', { locale: ar })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">مجموع الفحوصات المجدولة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCheckups.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">فحوصات مكتملة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCheckups.length}</div>
            <p className="text-xs text-muted-foreground">
              هذا الشهر
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>التقويم</CardTitle>
            <CardDescription>
              حدد تاريخًا لعرض المواعيد
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={currentDate}
              onSelect={(date) => date && setCurrentDate(date)}
              locale={ar}
              className="rounded-md border"
            />
          </CardContent>
          <CardFooter>
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">اليوم</span>
                <Badge variant="outline" className="bg-blue-500 text-white">
                  {getDayCheckups(new Date()).length} مواعيد
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">هذا الأسبوع</span>
                <Badge variant="outline" className="bg-green-500 text-white">
                  {pendingCheckups.length} مواعيد
                </Badge>
              </div>
              <div className="flex justify-center mt-4">
                <Button className="w-full">
                  <UserPlus className="mr-2 h-4 w-4" />
                  حجز موعد جديد
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>جدول المواعيد</CardTitle>
                <CardDescription>
                  {format(currentDate, 'EEEE d MMMM yyyy', { locale: ar })}
                </CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن موعد..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-4 w-full sm:w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {sortedCheckups.length > 0 ? (
              <div className="space-y-4">
                {sortedCheckups.map((checkup) => (
                  <Card key={checkup.id} className="overflow-hidden">
                    <div className={`h-2 ${getPriorityColor(checkup.priority)}`} />
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={checkup.patientAvatar} alt={checkup.patientName} />
                            <AvatarFallback>{checkup.patientName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{checkup.patientName}</div>
                            <div className="text-sm text-muted-foreground">{checkup.type}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className={`${getStatusColor(checkup.status)} text-white`}>
                          {checkup.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <ClockIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{checkup.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ListChecks className="h-4 w-4 text-muted-foreground" />
                          <span>{checkup.doctor}</span>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-muted-foreground">
                        {checkup.notes}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-60 border rounded-md border-dashed">
                <CalendarIcon className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">لا توجد مواعيد في هذا اليوم</p>
                <Button variant="outline" className="mt-4">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  إضافة موعد
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>جميع المواعيد المجدولة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الموعد</TableHead>
                  <TableHead>المريض</TableHead>
                  <TableHead>نوع الفحص</TableHead>
                  <TableHead>الأولوية</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>الوقت</TableHead>
                  <TableHead>الطبيب</TableHead>
                  <TableHead>المكان</TableHead>
                  <TableHead className="text-left">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCheckups.map((checkup) => (
                  <TableRow key={checkup.id}>
                    <TableCell className="font-medium">{checkup.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={checkup.patientAvatar} alt={checkup.patientName} />
                          <AvatarFallback>{checkup.patientName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{checkup.patientName}</div>
                      </div>
                    </TableCell>
                    <TableCell>{checkup.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getPriorityColor(checkup.priority)} text-white`}>
                        {checkup.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getStatusColor(checkup.status)} text-white`}>
                        {checkup.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarIcon className="h-3.5 w-3.5 ml-1" />
                        {checkup.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <ClockIcon className="h-3.5 w-3.5 ml-1" />
                        {checkup.time}
                      </div>
                    </TableCell>
                    <TableCell>{checkup.doctor}</TableCell>
                    <TableCell>{checkup.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-start gap-1">
                        <Button variant="ghost" size="sm">
                          <ListChecks className="h-4 w-4" />
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