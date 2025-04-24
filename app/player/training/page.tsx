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
import { 
  CalendarClock, 
  Dumbbell, 
  Trophy,
  Activity,
  Clock,
  Flag
} from 'lucide-react';

export default function PlayerTrainingPage() {
  // Mock data for training schedule
  const weeklyTrainings = [
    { 
      id: 1, 
      day: "الإثنين", 
      date: "20 مايو 2024", 
      sessions: [
        {
          time: "9:00 صباحًا",
          type: "الإحماء والتمدد",
          duration: "20 دقيقة",
          status: "مكتمل"
        },
        {
          time: "9:30 صباحًا",
          type: "تدريب تكتيكي",
          duration: "45 دقيقة",
          status: "مكتمل"
        },
        {
          time: "10:30 صباحًا",
          type: "مباراة تدريبية",
          duration: "60 دقيقة",
          status: "مكتمل"
        },
        {
          time: "12:00 ظهرًا",
          type: "تمارين استشفاء",
          duration: "30 دقيقة",
          status: "مكتمل"
        }
      ]
    },
    { 
      id: 2, 
      day: "الثلاثاء", 
      date: "21 مايو 2024", 
      sessions: [
        {
          time: "9:00 صباحًا",
          type: "تمارين لياقة",
          duration: "30 دقيقة",
          status: "مجدول"
        },
        {
          time: "9:45 صباحًا",
          type: "تدريب على الضربات الثابتة",
          duration: "40 دقيقة",
          status: "مجدول"
        },
        {
          time: "10:30 صباحًا",
          type: "تدريب على المراوغة",
          duration: "45 دقيقة",
          status: "مجدول"
        },
        {
          time: "11:30 صباحًا",
          type: "تمارين استشفاء",
          duration: "30 دقيقة",
          status: "مجدول"
        }
      ]
    },
    { 
      id: 3, 
      day: "الأربعاء", 
      date: "22 مايو 2024", 
      sessions: [
        {
          time: "راحة",
          type: "لا يوجد تدريب",
          duration: "-",
          status: "مجدول"
        }
      ]
    },
    { 
      id: 4, 
      day: "الخميس", 
      date: "23 مايو 2024", 
      sessions: [
        {
          time: "9:00 صباحًا",
          type: "تدريب على التكتيكات الدفاعية",
          duration: "60 دقيقة",
          status: "مجدول"
        },
        {
          time: "10:15 صباحًا",
          type: "تدريب على الهجمات المرتدة",
          duration: "45 دقيقة",
          status: "مجدول"
        },
        {
          time: "11:15 صباحًا",
          type: "تمارين استشفاء",
          duration: "30 دقيقة",
          status: "مجدول"
        }
      ]
    },
  ];

  const personalTrainingPlan = [
    {
      id: 1,
      title: "تحسين السرعة والقوة",
      description: "تمارين مخصصة لتحسين قوة العضلات وسرعة العدو",
      progress: 65,
      startDate: "5 مايو 2024",
      endDate: "2 يونيو 2024",
      exercises: [
        "تدريب السرعة: 10 × 20 متر",
        "تمارين البليومترك: 3 × 10 تكرار",
        "تدريب المقاومة: 3 × 12 تكرار",
        "تمارين السرعة الانتقالية: 6 × 30 متر"
      ]
    },
    {
      id: 2,
      title: "تحسين التحمل",
      description: "خطة تدريب لتحسين القدرة على التحمل خلال المباريات الكاملة",
      progress: 40,
      startDate: "10 مايو 2024",
      endDate: "10 يونيو 2024",
      exercises: [
        "تدريب تحمل هوائي: 30 دقيقة جري مستمر",
        "تدريب فتري: 8 × 400 متر",
        "تمارين القلب والأوعية الدموية: 45 دقيقة",
        "تمارين لياقة متقطعة: 15 × 20 ثانية"
      ]
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">جدول التدريب</h1>
        <Button>
          تحميل الجدول
        </Button>
      </div>

      {/* Today's Training Sessions */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">تدريب اليوم</CardTitle>
          <CardDescription>
            تفاصيل جلسات التدريب لهذا اليوم
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                <CalendarClock className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h3 className="font-medium">الإثنين، 20 مايو 2024</h3>
                <p className="text-sm text-muted-foreground">4 جلسات تدريبية مجدولة</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
              اليوم
            </Badge>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الوقت</TableHead>
                <TableHead>نوع التدريب</TableHead>
                <TableHead>المدة</TableHead>
                <TableHead>الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weeklyTrainings[0].sessions.map((session, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{session.time}</TableCell>
                  <TableCell>{session.type}</TableCell>
                  <TableCell>{session.duration}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-600">
                      {session.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Weekly Training Schedule */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">جدول التدريب الأسبوعي</CardTitle>
          <CardDescription>
            برنامج التدريب الأسبوعي الكامل
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Tabs defaultValue="day1" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="day1">الإثنين</TabsTrigger>
              <TabsTrigger value="day2">الثلاثاء</TabsTrigger>
              <TabsTrigger value="day3">الأربعاء</TabsTrigger>
              <TabsTrigger value="day4">الخميس</TabsTrigger>
            </TabsList>
            
            {weeklyTrainings.map((day, dayIndex) => (
              <TabsContent key={day.id} value={`day${day.id}`} className="p-4 pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{day.day}, {day.date}</h3>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {day.sessions.length} {day.sessions.length === 1 ? 'جلسة' : 'جلسات'}
                      </span>
                    </div>
                  </div>
                  
                  {day.sessions.map((session, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg hover:bg-accent/10 transition-colors">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Dumbbell className="h-4 w-4 text-primary" />
                          <span className="font-medium">{session.type}</span>
                        </div>
                        <Badge variant={session.status === 'مكتمل' ? 'default' : 'outline'}>
                          {session.status}
                        </Badge>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Clock className="h-3 w-3" />
                          <span>{session.time}</span>
                        </div>
                        <span className="mx-2">•</span>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Flag className="h-3 w-3" />
                          <span>{session.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Personal Training Plans */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">خطط التدريب الشخصية</CardTitle>
          <CardDescription>
            برامج التدريب المخصصة لتحسين أدائك
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-6">
            {personalTrainingPlan.map((plan) => (
              <div key={plan.id} className="p-4 border rounded-lg bg-card">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{plan.title}</h3>
                  <Badge variant="outline">{plan.startDate} - {plan.endDate}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                
                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">التقدم</span>
                    <span className="text-sm font-medium">{plan.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${plan.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Exercises */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">التمارين:</h4>
                  <ul className="space-y-1">
                    {plan.exercises.map((exercise, index) => (
                      <li key={index} className="text-sm flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>{exercise}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">عرض التفاصيل</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 