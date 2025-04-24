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
  Trophy, 
  CalendarClock, 
  Dumbbell, 
  Heart,
  TrendingUp,
  MessageSquare,
  ClipboardCheck,
  Info
} from 'lucide-react';

export default function PlayerDashboard() {
  // Mock data for player dashboard
  const playerStats = {
    matches: 18,
    goals: 7,
    assists: 4,
    yellowCards: 3,
    redCards: 0,
    fitnessLevel: 85,
    nextTraining: 'اليوم - 9:00 صباحًا',
    nextMatch: 'السبت - 8:00 مساءً',
  };

  const upcomingTrainings = [
    { id: 1, date: "اليوم", time: "9:00 صباحًا", type: "تكتيكي", duration: "90 دقيقة" },
    { id: 2, date: "غدًا", time: "10:00 صباحًا", type: "لياقة", duration: "60 دقيقة" },
    { id: 3, date: "الأربعاء", time: "9:00 صباحًا", type: "مباراة تدريبية", duration: "120 دقيقة" },
  ];

  const personalPerformance = [
    { id: 1, metric: "سرعة العدو", value: 33, maxValue: 40, unit: "كم/ساعة", change: "+1" },
    { id: 2, metric: "قوة التسديد", value: 84, maxValue: 100, unit: "%", change: "+2" },
    { id: 3, metric: "دقة التمرير", value: 89, maxValue: 100, unit: "%", change: "+3" },
    { id: 4, metric: "معدل التحمل", value: 82, maxValue: 100, unit: "%", change: "-1" },
  ];

  const coachNotes = [
    { id: 1, date: "أمس", note: "استمر في التركيز على زيادة دقة التمريرات الطويلة. تحسن ملحوظ في التمركز الدفاعي." },
    { id: 2, date: "قبل 3 أيام", note: "أداء ممتاز في المباراة التدريبية. تحتاج للعمل على التمركز عند الضربات الركنية." },
  ];

  const upcomingMatches = [
    { id: 1, opponent: "الاتحاد", date: "السبت", time: "8:00 مساءً", location: "ملعبنا" },
    { id: 2, opponent: "الهلال", date: "30 مايو", time: "7:30 مساءً", location: "خارج الديار" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">مرحبًا، عبدالله</h1>
        <Badge className="text-sm py-1">لاعب وسط</Badge>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="مستوى اللياقة"
          value={`${playerStats.fitnessLevel}%`}
          icon={<Dumbbell className="w-6 h-6" />}
          change={{ type: 'increase', value: "3%" }}
          description="تحسن عن الأسبوع الماضي"
        />
        <StatCard
          title="أهداف هذا الموسم"
          value={playerStats.goals.toString()}
          icon={<Trophy className="w-6 h-6" />}
          change={{ type: 'increase', value: "2" }}
          description="زيادة هدفين عن آخر مباراتين"
        />
        <StatCard
          title="التدريب القادم"
          value="اليوم"
          icon={<CalendarClock className="w-6 h-6" />}
          change={{ type: 'neutral', value: "9:00 صباحًا" }}
          description="تدريب تكتيكي مع الفريق"
        />
        <StatCard
          title="المباراة القادمة"
          value="السبت"
          icon={<Trophy className="w-6 h-6" />}
          change={{ type: 'neutral', value: "8:00 مساءً" }}
          description="ضد فريق الاتحاد - ملعبنا"
        />
      </div>

      {/* Two columns layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">أدائي الشخصي</CardTitle>
            <CardDescription>
              مؤشرات الأداء الرئيسية وتطورها
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            {personalPerformance.map((metric) => (
              <div key={metric.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{metric.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{metric.value}{metric.unit}</span>
                    <span className={`text-xs ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`${metric.id === 1 ? 'bg-blue-500' : metric.id === 2 ? 'bg-red-500' : metric.id === 3 ? 'bg-green-500' : 'bg-yellow-500'} h-2 rounded-full`} 
                    style={{ width: `${(metric.value / metric.maxValue) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2">عرض التقرير الكامل</Button>
          </CardContent>
        </Card>

        {/* Coach Notes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">ملاحظات المدرب</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            {coachNotes.map((note) => (
              <div key={note.id} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium">{note.date}</h3>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">تفاصيل</span>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {note.note}
                </p>
              </div>
            ))}
            <Button variant="outline" className="w-full">عرض جميع الملاحظات</Button>
          </CardContent>
        </Card>
      </div>

      {/* Training Schedule */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">جدول التدريبات</CardTitle>
          <CardDescription>
            التدريبات المقبلة المجدولة
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اليوم</TableHead>
                <TableHead>الوقت</TableHead>
                <TableHead>نوع التدريب</TableHead>
                <TableHead>المدة</TableHead>
                <TableHead className="text-left">الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingTrainings.map((training) => (
                <TableRow key={training.id}>
                  <TableCell className="font-medium">{training.date}</TableCell>
                  <TableCell>{training.time}</TableCell>
                  <TableCell>{training.type}</TableCell>
                  <TableCell>{training.duration}</TableCell>
                  <TableCell className="text-left">
                    {training.id === 1 ? (
                      <Badge>اليوم</Badge>
                    ) : (
                      <Badge variant="outline">قادم</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tabs for different views */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">معلومات إضافية</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Tabs defaultValue="matches" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="matches">المباريات القادمة</TabsTrigger>
              <TabsTrigger value="personal">التدريب الشخصي</TabsTrigger>
              <TabsTrigger value="health">الحالة الصحية</TabsTrigger>
            </TabsList>
            
            <TabsContent value="matches" className="p-4 pt-6">
              <div className="space-y-4">
                {upcomingMatches.map((match, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{match.opponent}</h3>
                      <p className="text-sm text-muted-foreground">
                        {match.date} - {match.time}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {match.location}
                      </p>
                    </div>
                    <Badge variant={index === 0 ? "default" : "outline"}>
                      {index === 0 ? "التالية" : "قادمة"}
                    </Badge>
                  </div>
                ))}
                <Button className="w-full mt-2">جدول المباريات الكامل</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="personal" className="p-4 pt-6">
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold">تدريبات قوة الساق</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span>تمارين القرفصاء: 3 مجموعات × 12 تكرار</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span>رفع الكعب: 3 مجموعات × 15 تكرار</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span>تمارين الوثب: 3 مجموعات × 10 تكرار</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold">تمارين اللياقة القلبية</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      <span>جري متقطع: 10 × 100 متر</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      <span>الركض الخفيف: 20 دقيقة</span>
                    </li>
                  </ul>
                </div>
                <Button className="w-full">برنامج التدريب الكامل</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="health" className="p-4 pt-6">
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold">تقرير الحالة الصحية</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    لا توجد إصابات حالية. آخر فحص طبي تم بتاريخ 15 مايو 2024.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold">توصيات الطاقم الطبي</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                      <span>الاستمرار في تمارين تقوية عضلات الفخذ</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                      <span>الالتزام بجدول التغذية المعد من الفريق الطبي</span>
                    </li>
                  </ul>
                </div>
                <Button className="w-full">جدولة فحص طبي</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 