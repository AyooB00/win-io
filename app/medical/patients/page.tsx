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
import { CalendarIcon, Download, FileText, Filter, Printer, Search, UserPlus } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

export default function MedicalPatientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const patients = [
    {
      id: "PLR-001",
      name: "أحمد الشمري",
      position: "مهاجم",
      age: 24,
      status: "سليم",
      avatar: "/avatars/player1.png",
      lastCheckup: "2024-05-10",
      nextCheckup: "2024-06-10",
      injuries: 0,
      conditions: ["لياقة عالية"],
    },
    {
      id: "PLR-002",
      name: "محمد العنزي",
      position: "وسط",
      age: 26,
      status: "متعافي",
      avatar: "/avatars/player2.png",
      lastCheckup: "2024-05-05",
      nextCheckup: "2024-05-15",
      injuries: 0,
      conditions: ["متعافي من إصابة الكاحل"],
    },
    {
      id: "PLR-003",
      name: "خالد القحطاني",
      position: "مدافع",
      age: 22,
      status: "مصاب",
      avatar: "/avatars/player3.png",
      lastCheckup: "2024-05-11",
      nextCheckup: "2024-05-18",
      injuries: 1,
      conditions: ["تمزق في الرباط الصليبي"],
    },
    {
      id: "PLR-004",
      name: "سعود الدوسري",
      position: "حارس مرمى",
      age: 28,
      status: "سليم",
      avatar: "/avatars/player4.png",
      lastCheckup: "2024-05-02",
      nextCheckup: "2024-06-02",
      injuries: 0,
      conditions: ["لياقة عالية"],
    },
    {
      id: "PLR-005",
      name: "فهد المولد",
      position: "جناح",
      age: 23,
      status: "متعافي",
      avatar: "/avatars/player5.png",
      lastCheckup: "2024-05-08",
      nextCheckup: "2024-05-22",
      injuries: 0,
      conditions: ["متعافي من شد عضلي"],
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesQuery = patient.name.includes(searchQuery) || 
                         patient.id.includes(searchQuery) ||
                         patient.position.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    
    return matchesQuery && matchesStatus;
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'سليم': return 'bg-green-500';
      case 'متعافي': return 'bg-amber-500';
      case 'مصاب': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">المرضى واللاعبين</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            تصفية
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            إضافة مريض
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المرضى</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.length}</div>
            <p className="text-xs text-muted-foreground">
              من أصل 32 لاعب
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">سليم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.filter(p => p.status === 'سليم').length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((patients.filter(p => p.status === 'سليم').length / patients.length) * 100)}% من الإجمالي
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">متعافي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.filter(p => p.status === 'متعافي').length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((patients.filter(p => p.status === 'متعافي').length / patients.length) * 100)}% من الإجمالي
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">مصاب</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.filter(p => p.status === 'مصاب').length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((patients.filter(p => p.status === 'مصاب').length / patients.length) * 100)}% من الإجمالي
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setStatusFilter('all')}>جميع المرضى</TabsTrigger>
          <TabsTrigger value="healthy" onClick={() => setStatusFilter('سليم')}>سليم</TabsTrigger>
          <TabsTrigger value="recovering" onClick={() => setStatusFilter('متعافي')}>متعافي</TabsTrigger>
          <TabsTrigger value="injured" onClick={() => setStatusFilter('مصاب')}>مصاب</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle>قائمة المرضى</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="بحث عن مريض..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-4 w-full sm:w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead>الاسم</TableHead>
                      <TableHead>المركز</TableHead>
                      <TableHead>العمر</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>آخر فحص</TableHead>
                      <TableHead>الفحص القادم</TableHead>
                      <TableHead>الإصابات</TableHead>
                      <TableHead>الملاحظات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={patient.avatar} alt={patient.name} />
                              <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{patient.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{patient.position}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`${getStatusColor(patient.status)} text-white`}>
                            {patient.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <CalendarIcon className="h-3.5 w-3.5 ml-1" />
                            {patient.lastCheckup}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <CalendarIcon className="h-3.5 w-3.5 ml-1" />
                            {patient.nextCheckup}
                          </div>
                        </TableCell>
                        <TableCell>
                          {patient.injuries > 0 ? (
                            <Badge variant="outline" className="bg-red-500 text-white">
                              {patient.injuries}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-500 text-white">
                              0
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {patient.conditions.join(', ')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="healthy" className="space-y-4">
          {/* Same card component as above but with filtered data */}
        </TabsContent>
        <TabsContent value="recovering" className="space-y-4">
          {/* Same card component as above but with filtered data */}
        </TabsContent>
        <TabsContent value="injured" className="space-y-4">
          {/* Same card component as above but with filtered data */}
        </TabsContent>
      </Tabs>
    </div>
  );
} 