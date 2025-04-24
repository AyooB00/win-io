'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from './StatCard';
import { 
  Users, 
  Heart, 
  Calendar, 
  Trophy,
  DollarSign,
  Percent,
  AlertCircle,
  FileText
} from 'lucide-react';

export default function AdminDashboard() {
  // Mock data for admin dashboard
  const teamStats = {
    totalTeams: 4,
    totalPlayers: 87,
    totalCoaches: 12,
    totalMedicalStaff: 5,
  };

  const recentEvents = [
    { 
      id: 1, 
      title: 'تم تعيين مدرب جديد',
      description: 'تم تعيين خالد محمد كمدرب مساعد للفريق الأول',
      time: 'منذ 3 ساعات',
    },
    { 
      id: 2, 
      title: 'إضافة لاعب جديد',
      description: 'تم ضم عبدالله العمري للفريق تحت 18 سنة',
      time: 'منذ يوم',
    },
    { 
      id: 3, 
      title: 'تحديث موعد مباراة',
      description: 'تم تغيير موعد مباراة الفريق الأول مع النصر',
      time: 'منذ يومين',
    },
  ];

  const financialData = [
    { id: 1, category: 'رواتب اللاعبين', amount: 2500000, change: '+5%' },
    { id: 2, category: 'رواتب المدربين', amount: 800000, change: '+2%' },
    { id: 3, category: 'تكاليف المرافق', amount: 450000, change: '-3%' },
    { id: 4, category: 'تكاليف السفر', amount: 350000, change: '+12%' },
  ];

  const pendingTasks = [
    { id: 1, title: 'موافقة على عقد لاعب جديد', priority: 'عالي', deadline: '22 مايو 2024' },
    { id: 2, title: 'مراجعة تقارير المالية الشهرية', priority: 'متوسط', deadline: '25 مايو 2024' },
    { id: 3, title: 'تجديد تراخيص الملعب', priority: 'منخفض', deadline: '10 يونيو 2024' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">لوحة التحكم الإدارية</h1>
        <Button>تقرير جديد</Button>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="إجمالي الفرق"
          value={teamStats.totalTeams.toString()}
          icon={<Trophy className="w-6 h-6" />}
          change={{ type: 'increase', value: "1" }}
          description="زيادة فريق جديد هذا الموسم"
        />
        <StatCard
          title="إجمالي اللاعبين"
          value={teamStats.totalPlayers.toString()}
          icon={<Users className="w-6 h-6" />}
          change={{ type: 'increase', value: "7" }}
          description="زيادة 7 لاعبين هذا الموسم"
        />
        <StatCard
          title="إجمالي المدربين"
          value={teamStats.totalCoaches.toString()}
          icon={<FileText className="w-6 h-6" />}
          change={{ type: 'increase', value: "2" }}
          description="زيادة 2 مدرب هذا الموسم"
        />
        <StatCard
          title="الطاقم الطبي"
          value={teamStats.totalMedicalStaff.toString()}
          icon={<Heart className="w-6 h-6" />}
          change={{ type: 'neutral', value: "0" }}
          description="لا تغيير في الموسم الحالي"
        />
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">آخر التحديثات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-4 rtl:space-x-reverse p-4 bg-muted/50 rounded-lg hover:bg-accent transition-colors">
                <div>
                  <h3 className="font-medium text-foreground">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">عرض كل التحديثات</Button>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">المهام المعلقة</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المهمة</TableHead>
                  <TableHead>الأولوية</TableHead>
                  <TableHead>الموعد النهائي</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>
                      {task.priority === 'عالي' ? (
                        <Badge className="bg-red-500">{task.priority}</Badge>
                      ) : task.priority === 'متوسط' ? (
                        <Badge className="bg-yellow-500">{task.priority}</Badge>
                      ) : (
                        <Badge className="bg-green-500">{task.priority}</Badge>
                      )}
                    </TableCell>
                    <TableCell>{task.deadline}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button variant="outline" className="w-full mt-4">إدارة المهام</Button>
          </CardContent>
        </Card>
      </div>

      {/* Financial Overview */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">النظرة المالية</CardTitle>
          <CardDescription>
            ملخص الموازنة والمصروفات الشهرية
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الفئة</TableHead>
                <TableHead>المبلغ (ريال)</TableHead>
                <TableHead>التغيير</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {financialData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell>{item.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    {item.change.startsWith('+') ? (
                      <span className="text-green-500">{item.change}</span>
                    ) : (
                      <span className="text-red-500">{item.change}</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <DollarSign className="h-10 w-10 text-green-500 mb-2" />
                <h3 className="text-xl font-bold">4,100,000</h3>
                <p className="text-sm text-muted-foreground">إجمالي المصروفات (ريال)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Percent className="h-10 w-10 text-yellow-500 mb-2" />
                <h3 className="text-xl font-bold">+3.2%</h3>
                <p className="text-sm text-muted-foreground">نسبة التغيير عن الشهر الماضي</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">إجراءات سريعة</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-0">
          <Button className="w-full">إضافة لاعب</Button>
          <Button className="w-full">تعيين مدرب</Button>
          <Button className="w-full">جدولة مباراة</Button>
          <Button variant="outline" className="w-full">إنشاء تقرير</Button>
          <Button variant="outline" className="w-full">إدارة الفرق</Button>
          <Button variant="outline" className="w-full">ضبط الإعدادات</Button>
        </CardContent>
      </Card>
    </div>
  );
} 