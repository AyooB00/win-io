'use client';

import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter,
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
import { CalendarIcon, Download, FileText, Filter, Printer, Search } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MedicalReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [reportType, setReportType] = useState('all');
  
  const reports = [
    {
      id: "REP-001",
      title: "تقرير فحص دوري - الفريق الأول",
      createdAt: "2024-05-10",
      type: "فحص دوري",
      status: "مكتمل",
      author: "د. محمد سالم",
      authorAvatar: "/avatars/doctor1.png",
      playersCount: 25,
      findings: 3,
    },
    {
      id: "REP-002",
      title: "تقرير إصابة - أحمد الشمري",
      createdAt: "2024-05-08",
      type: "تقرير إصابة",
      status: "مكتمل",
      author: "د. فهد الحارثي",
      authorAvatar: "/avatars/doctor2.png",
      playersCount: 1,
      findings: 1,
    },
    {
      id: "REP-003",
      title: "تقرير متابعة التعافي - محمد العنزي",
      createdAt: "2024-05-05",
      type: "متابعة تعافي",
      status: "مكتمل",
      author: "د. فهد الحارثي",
      authorAvatar: "/avatars/doctor2.png",
      playersCount: 1,
      findings: 0,
    },
    {
      id: "REP-004",
      title: "فحص ما قبل الموسم - الفريق الأول",
      createdAt: "2024-04-15",
      type: "فحص دوري",
      status: "مكتمل",
      author: "د. محمد سالم",
      authorAvatar: "/avatars/doctor1.png",
      playersCount: 28,
      findings: 5,
    },
    {
      id: "REP-005",
      title: "تقرير متابعة التعافي - خالد القحطاني",
      createdAt: "2024-05-11",
      type: "متابعة تعافي",
      status: "قيد الإعداد",
      author: "د. محمد سالم",
      authorAvatar: "/avatars/doctor1.png",
      playersCount: 1,
      findings: 1,
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesQuery = report.title.includes(searchQuery) || 
                         report.id.includes(searchQuery) ||
                         report.author.includes(searchQuery);
    
    const matchesType = reportType === 'all' || report.type === reportType;
    
    return matchesQuery && matchesType;
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-500';
      case 'قيد الإعداد': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">التقارير الطبية</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            تصفية
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            إنشاء تقرير جديد
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي التقارير</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 هذا الأسبوع
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">تقارير مكتملة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.filter(r => r.status === 'مكتمل').length}</div>
            <p className="text-xs text-muted-foreground">
              80% من الإجمالي
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ملاحظات طبية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.reduce((acc, r) => acc + r.findings, 0)}</div>
            <p className="text-xs text-muted-foreground">
              تم تسجيل 3 ملاحظات جديدة
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>قائمة التقارير</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن تقرير..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-4 w-full sm:w-64"
                />
              </div>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="نوع التقرير" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="فحص دوري">فحص دوري</SelectItem>
                  <SelectItem value="تقرير إصابة">تقرير إصابة</SelectItem>
                  <SelectItem value="متابعة تعافي">متابعة تعافي</SelectItem>
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
                  <TableHead>رقم التقرير</TableHead>
                  <TableHead>عنوان التقرير</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الطبيب</TableHead>
                  <TableHead>عدد اللاعبين</TableHead>
                  <TableHead>الملاحظات</TableHead>
                  <TableHead className="text-left">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>{report.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarIcon className="h-3.5 w-3.5 ml-1" />
                        {report.createdAt}
                      </div>
                    </TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getStatusColor(report.status)} text-white`}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={report.authorAvatar} alt={report.author} />
                          <AvatarFallback>{report.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{report.author}</span>
                      </div>
                    </TableCell>
                    <TableCell>{report.playersCount}</TableCell>
                    <TableCell>
                      {report.findings > 0 ? (
                        <Badge variant="outline" className="bg-red-500 text-white">
                          {report.findings}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-500 text-white">
                          0
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-start gap-1">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">عرض</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">تنزيل</span>
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