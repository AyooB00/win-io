'use client';

import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  FileText, 
  MoreVertical, 
  Search, 
  Stethoscope, 
  Activity,
  AlertCircle
} from 'lucide-react';

export default function MedicalPlayersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const players = [
    {
      id: 1,
      name: "أحمد الشمري",
      position: "مهاجم",
      status: "مصاب",
      severity: "متوسطة",
      diagnosis: "تمزق في أربطة الكاحل",
      expectedReturn: "28 مايو 2024",
      fitnessLevel: 60,
      imageUrl: "/avatars/player1.png"
    },
    {
      id: 2,
      name: "محمد العنزي",
      position: "وسط",
      status: "مصاب",
      severity: "خفيفة",
      diagnosis: "شد عضلي في الفخذ",
      expectedReturn: "18 مايو 2024",
      fitnessLevel: 85,
      imageUrl: "/avatars/player2.png"
    },
    {
      id: 3,
      name: "خالد القحطاني",
      position: "مدافع",
      status: "مصاب",
      severity: "شديدة",
      diagnosis: "التهاب في وتر الركبة",
      expectedReturn: "5 يونيو 2024",
      fitnessLevel: 40,
      imageUrl: "/avatars/player3.png"
    },
    {
      id: 4,
      name: "سعد المنصور",
      position: "حارس مرمى",
      status: "جاهز",
      severity: "",
      diagnosis: "لا يوجد",
      expectedReturn: "",
      fitnessLevel: 95,
      imageUrl: "/avatars/player4.png"
    },
    {
      id: 5,
      name: "عبدالله الدوسري",
      position: "مدافع",
      status: "جاهز",
      severity: "",
      diagnosis: "لا يوجد",
      expectedReturn: "",
      fitnessLevel: 90,
      imageUrl: "/avatars/player5.png"
    }
  ];

  const filteredPlayers = players.filter(player => {
    const matchesQuery = player.name.includes(searchQuery) || 
                         player.position.includes(searchQuery) ||
                         player.diagnosis.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'injured' && player.status === 'مصاب') ||
                          (statusFilter === 'ready' && player.status === 'جاهز');
    
    return matchesQuery && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'خفيفة': return 'bg-yellow-500';
      case 'متوسطة': return 'bg-orange-500';
      case 'شديدة': return 'bg-red-500';
      default: return 'bg-green-500';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'مصاب' ? 'bg-red-500' : 'bg-green-500';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">حالات اللاعبين</h1>
        <Button>
          <Stethoscope className="mr-2 h-4 w-4" />
          تسجيل فحص جديد
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger 
            value="all" 
            onClick={() => setStatusFilter('all')}
          >
            جميع اللاعبين
          </TabsTrigger>
          <TabsTrigger 
            value="injured" 
            onClick={() => setStatusFilter('injured')}
          >
            اللاعبون المصابون
          </TabsTrigger>
          <TabsTrigger 
            value="ready" 
            onClick={() => setStatusFilter('ready')}
          >
            اللاعبون الجاهزون
          </TabsTrigger>
        </TabsList>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>قائمة اللاعبين</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن لاعب..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-4"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">اللاعب</TableHead>
                    <TableHead>المركز</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>آخر تشخيص</TableHead>
                    <TableHead>التعافي المتوقع</TableHead>
                    <TableHead>اللياقة البدنية</TableHead>
                    <TableHead className="text-left">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlayers.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={player.imageUrl} alt={player.name} />
                            <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{player.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{player.position}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getStatusColor(player.status)} text-white`}>
                          {player.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {player.status === 'مصاب' && (
                            <Badge variant="outline" className={`${getSeverityColor(player.severity)} text-white mr-2`}>
                              {player.severity}
                            </Badge>
                          )}
                          {player.diagnosis}
                        </div>
                      </TableCell>
                      <TableCell>{player.expectedReturn || 'جاهز'}</TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div 
                            className={`h-2.5 rounded-full ${
                              player.fitnessLevel > 80 ? 'bg-green-500' : 
                              player.fitnessLevel > 60 ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`} 
                            style={{ width: `${player.fitnessLevel}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">{player.fitnessLevel}%</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-start">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">عرض السجل</span>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Activity className="h-4 w-4" />
                            <span className="sr-only">متابعة التعافي</span>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">المزيد</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>عرض الملف الكامل</DropdownMenuItem>
                              <DropdownMenuItem>تسجيل فحص جديد</DropdownMenuItem>
                              <DropdownMenuItem>تحديث الحالة</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
} 