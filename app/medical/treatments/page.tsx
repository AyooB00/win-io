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
  Download, 
  FileText, 
  Filter, 
  PlusCircle, 
  Printer, 
  Search, 
  Stethoscope
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

export default function MedicalTreatmentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [treatmentType, setTreatmentType] = useState('all');
  
  const treatments = [
    {
      id: "TRT-001",
      patientName: "أحمد الشمري",
      patientId: "PLR-001",
      patientAvatar: "/avatars/player1.png",
      type: "فحص دوري",
      status: "مكتمل",
      startDate: "2024-05-01",
      endDate: "2024-05-10",
      progress: 100,
      doctor: "د. محمد سالم",
      notes: "اكتمل الفحص بنجاح، اللاعب في حالة جيدة.",
    },
    {
      id: "TRT-002",
      patientName: "محمد العنزي",
      patientId: "PLR-002",
      patientAvatar: "/avatars/player2.png",
      type: "إعادة تأهيل",
      status: "جاري",
      startDate: "2024-04-15",
      endDate: "2024-05-15",
      progress: 80,
      doctor: "د. فهد الحارثي",
      notes: "يتماثل للشفاء بشكل جيد، يحتاج متابعة أسبوعية.",
    },
    {
      id: "TRT-003",
      patientName: "خالد القحطاني",
      patientId: "PLR-003",
      patientAvatar: "/avatars/player3.png",
      type: "جراحة",
      status: "جاري",
      startDate: "2024-05-11",
      endDate: "2024-07-11",
      progress: 10,
      doctor: "د. محمد سالم",
      notes: "تمت العملية بنجاح، بدأ برنامج إعادة التأهيل.",
    },
    {
      id: "TRT-004",
      patientName: "سعود الدوسري",
      patientId: "PLR-004",
      patientAvatar: "/avatars/player4.png",
      type: "فحص دوري",
      status: "مجدول",
      startDate: "2024-06-02",
      endDate: "2024-06-02",
      progress: 0,
      doctor: "د. فهد الحارثي",
      notes: "فحص دوري قبل بداية المعسكر.",
    },
    {
      id: "TRT-005",
      patientName: "فهد المولد",
      patientId: "PLR-005",
      patientAvatar: "/avatars/player5.png",
      type: "علاج طبيعي",
      status: "جاري",
      startDate: "2024-05-08",
      endDate: "2024-05-22",
      progress: 60,
      doctor: "د. محمد سالم",
      notes: "يحتاج جلسات علاج متواصلة للتعافي الكامل.",
    }
  ];

  const filteredTreatments = treatments.filter(treatment => {
    const matchesQuery = treatment.patientName.includes(searchQuery) || 
                         treatment.id.includes(searchQuery) ||
                         treatment.type.includes(searchQuery) ||
                         treatment.doctor.includes(searchQuery);
    
    const matchesType = treatmentType === 'all' || treatment.type === treatmentType;
    
    return matchesQuery && matchesType;
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-500';
      case 'جاري': return 'bg-blue-500';
      case 'مجدول': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">العلاجات والفحوصات</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            تصفية
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            إضافة علاج جديد
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي العلاجات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{treatments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">مكتمل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{treatments.filter(t => t.status === 'مكتمل').length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((treatments.filter(t => t.status === 'مكتمل').length / treatments.length) * 100)}% من الإجمالي
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">جاري</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{treatments.filter(t => t.status === 'جاري').length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((treatments.filter(t => t.status === 'جاري').length / treatments.length) * 100)}% من الإجمالي
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">مجدول</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{treatments.filter(t => t.status === 'مجدول').length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((treatments.filter(t => t.status === 'مجدول').length / treatments.length) * 100)}% من الإجمالي
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>قائمة العلاجات</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن علاج..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-4 w-full sm:w-64"
                />
              </div>
              <Select value={treatmentType} onValueChange={setTreatmentType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="نوع العلاج" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="فحص دوري">فحص دوري</SelectItem>
                  <SelectItem value="إعادة تأهيل">إعادة تأهيل</SelectItem>
                  <SelectItem value="جراحة">جراحة</SelectItem>
                  <SelectItem value="علاج طبيعي">علاج طبيعي</SelectItem>
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
                  <TableHead>رقم العلاج</TableHead>
                  <TableHead>المريض</TableHead>
                  <TableHead>نوع العلاج</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تاريخ البدء</TableHead>
                  <TableHead>تاريخ الانتهاء</TableHead>
                  <TableHead>الطبيب المعالج</TableHead>
                  <TableHead>نسبة التقدم</TableHead>
                  <TableHead className="text-left">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTreatments.map((treatment) => (
                  <TableRow key={treatment.id}>
                    <TableCell className="font-medium">{treatment.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={treatment.patientAvatar} alt={treatment.patientName} />
                          <AvatarFallback>{treatment.patientName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{treatment.patientName}</div>
                      </div>
                    </TableCell>
                    <TableCell>{treatment.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getStatusColor(treatment.status)} text-white`}>
                        {treatment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarIcon className="h-3.5 w-3.5 ml-1" />
                        {treatment.startDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarIcon className="h-3.5 w-3.5 ml-1" />
                        {treatment.endDate}
                      </div>
                    </TableCell>
                    <TableCell>{treatment.doctor}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={treatment.progress} className="h-2 w-24" />
                        <span className="text-xs">{treatment.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-start gap-1">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">عرض</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Stethoscope className="h-4 w-4" />
                          <span className="sr-only">معالجة</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Printer className="h-4 w-4" />
                          <span className="sr-only">طباعة</span>
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