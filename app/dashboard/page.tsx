'use client';

import React from 'react';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { StatCard } from '@/app/components/dashboard/StatCard';
import { 
  UserGroupIcon, 
  MedicalIcon, 
  BanIcon, 
  CalendarIcon, 
  GoalIcon, 
  ShieldIcon, 
  LockIcon, 
  ChartIcon 
} from '@/app/components/ui/Icons';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  // Mock data - in a real app this would come from API calls
  const upcomingMatches = [
    { id: 1, opponent: "الاتحاد", date: "23 مايو 2024", location: "ملعبنا" },
    { id: 2, opponent: "الهلال", date: "30 مايو 2024", location: "خارج الديار" },
    { id: 3, opponent: "النصر", date: "5 يونيو 2024", location: "ملعبنا" },
  ]

  const recentPerformance = [
    { id: 1, player: "محمد عبدالله", status: "ممتاز", lastTraining: "أمس", fitnessLevel: 95 },
    { id: 2, player: "خالد القحطاني", status: "جيد", lastTraining: "اليوم", fitnessLevel: 85 },
    { id: 3, player: "عبدالرحمن الشمري", status: "متوسط", lastTraining: "قبل يومين", fitnessLevel: 75 },
    { id: 4, player: "فهد السليم", status: "ضعيف", lastTraining: "قبل 3 أيام", fitnessLevel: 60 },
  ]

  const teamStats = {
    wins: 12,
    draws: 5,
    losses: 3,
    goalsScored: 35,
    goalsConceded: 15,
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">لوحة التحكم</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="إجمالي اللاعبين"
            value="24"
            icon={<UserGroupIcon className="w-6 h-6" />}
            change={{ type: 'increase', value: "2" }}
            description="زيادة 2 لاعبين هذا الشهر"
          />
          <StatCard
            title="اللاعبين المصابين"
            value="3"
            icon={<MedicalIcon className="w-6 h-6" />}
            change={{ type: 'decrease', value: "1" }}
            description="تحسن حالة لاعب واحد"
          />
          <StatCard
            title="المباريات القادمة"
            value="5"
            icon={<CalendarIcon className="w-6 h-6" />}
            change={{ type: 'neutral', value: "0" }}
            description="خلال الـ 30 يوم القادمة"
          />
          <StatCard
            title="الأهداف المسجلة"
            value="42"
            icon={<GoalIcon className="w-6 h-6" />}
            change={{ type: 'increase', value: "8" }}
            description="زيادة 8 أهداف هذا الموسم"
          />
        </div>

        {/* Recent Activity */}
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">النشاط الأخير</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {[
              {
                title: 'تم تسجيل هدف جديد',
                description: 'أحمد سجل هدف في المباراة الأخيرة',
                time: 'منذ ساعتين',
                icon: <GoalIcon className="w-5 h-5 text-green-500 dark:text-green-400" />
              },
              {
                title: 'تحديث الحالة البدنية',
                description: 'تم تحديث حالة محمد البدنية',
                time: 'منذ 4 ساعات',
                icon: <MedicalIcon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              },
              {
                title: 'جدولة مباراة جديدة',
                description: 'تم إضافة مباراة ضد فريق النصر',
                time: 'منذ يوم',
                icon: <CalendarIcon className="w-5 h-5 text-purple-500 dark:text-purple-400" />
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse p-4 bg-muted/50 rounded-lg hover:bg-accent transition-colors">
                <div className="mt-1">{activity.icon}</div>
                <div>
                  <h3 className="font-medium text-foreground">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions and Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">إجراءات سريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <Button className="w-full flex items-center justify-between">
                <span>إضافة لاعب جديد</span>
                <UserGroupIcon className="w-5 h-5" />
              </Button>
              <Button variant="secondary" className="w-full flex items-center justify-between">
                <span>جدولة مباراة</span>
                <CalendarIcon className="w-5 h-5" />
              </Button>
              <Button variant="secondary" className="w-full flex items-center justify-between">
                <span>تحديث الحالة البدنية</span>
                <MedicalIcon className="w-5 h-5" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">المباريات القادمة (مثال)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              {[
                { team: 'النصر', date: '2024-03-15', time: '20:00', logo: '/images/teams/team1.png' },
                { team: 'الهلال', date: '2024-03-20', time: '19:30', logo: '/images/teams/team2.png' },
                { team: 'الاتحاد', date: '2024-03-25', time: '21:00', logo: '/images/teams/team3.png' }
              ].map((match, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg hover:bg-accent transition-colors flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-xs">
                    {match.team.substring(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{match.team}</p>
                    <p className="text-sm text-muted-foreground">{match.date} - {match.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">إحصائيات سريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">معدل الأهداف</span>
                  <span className="font-medium text-foreground">2.1</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">معدل التمريرات</span>
                  <span className="font-medium text-foreground">85%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 dark:bg-green-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">معدل التملك</span>
                  <span className="font-medium text-foreground">58%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-yellow-500 dark:bg-yellow-400 h-2 rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mb-8">
          {/* Upcoming Matches */}
          <Card className="col-span-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">المباريات القادمة</CardTitle>
              <CardDescription>
                جدول المباريات القادمة للفريق في الأسابيع المقبلة
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الفريق المنافس</TableHead>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>الملعب</TableHead>
                    <TableHead className="text-left">حالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingMatches.map((match) => (
                    <TableRow key={match.id}>
                      <TableCell className="font-medium">{match.opponent}</TableCell>
                      <TableCell>{match.date}</TableCell>
                      <TableCell>{match.location}</TableCell>
                      <TableCell className="text-left">
                        {match.id === 1 ? (
                          <Badge>قريبة</Badge>
                        ) : (
                          <Badge variant="outline">قادمة</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Player Performance */}
          <Card className="col-span-3">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">حالة اللاعبين</CardTitle>
              <CardDescription>
                مستوى اللياقة ومعلومات آخر تدريب
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اللاعب</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-left">المستوى</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPerformance.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell className="font-medium">{player.player}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{player.status}</span>
                          <span className="text-xs text-muted-foreground">
                            آخر تدريب: {player.lastTraining}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-left">
                        {player.fitnessLevel >= 90 ? (
                          <Badge className="bg-green-600">{player.fitnessLevel}%</Badge>
                        ) : player.fitnessLevel >= 80 ? (
                          <Badge className="bg-blue-600">{player.fitnessLevel}%</Badge>
                        ) : player.fitnessLevel >= 70 ? (
                          <Badge className="bg-yellow-600">{player.fitnessLevel}%</Badge>
                        ) : (
                          <Badge className="bg-red-600">{player.fitnessLevel}%</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        {/* Team Training Plan */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">الخطة التدريبية</CardTitle>
            <CardDescription>
              خطة التدريب الأسبوعية للفريق
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Tabs defaultValue="today" className="w-full">
              <TabsListWithCounts />
              <TabsContent value="today" className="p-4 pt-2">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <h3 className="font-semibold">تدريبات اليوم</h3>
                    <p className="text-sm text-muted-foreground">
                      اليوم: الإثنين، 20 مايو 2024
                    </p>
                    <ul className="grid gap-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span>9:00 صباحًا - الإحماء والتمدد (20 دقيقة)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                        <span>9:30 صباحًا - تدريب تكتيكي (45 دقيقة)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                        <span>10:30 صباحًا - مباراة تدريبية (60 دقيقة)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                        <span>12:00 ظهرًا - تمارين استشفاء (30 دقيقة)</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full">تفاصيل الجدول الكامل</Button>
                </div>
              </TabsContent>
              <TabsContent value="tomorrow" className="p-4 pt-2">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <h3 className="font-semibold">تدريبات الغد</h3>
                    <p className="text-sm text-muted-foreground">
                      غدًا: الثلاثاء، 21 مايو 2024
                    </p>
                    <ul className="grid gap-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span>9:00 صباحًا - تمارين لياقة (30 دقيقة)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                        <span>9:45 صباحًا - تدريب على الضربات الثابتة (40 دقيقة)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                        <span>10:30 صباحًا - تدريب على المراوغة (45 دقيقة)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                        <span>11:30 صباحًا - تدريب حراس المرمى (45 دقيقة)</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full">تفاصيل الجدول الكامل</Button>
                </div>
              </TabsContent>
              <TabsContent value="week" className="p-4 pt-2">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <h3 className="font-semibold">خطة الأسبوع</h3>
                    <p className="text-sm text-muted-foreground">
                      الأسبوع: 20 - 26 مايو 2024
                    </p>
                    <ul className="grid gap-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="font-medium">الاثنين:</span>
                        <span className="text-muted-foreground">تدريب تكتيكي + مباراة تدريبية</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-medium">الثلاثاء:</span>
                        <span className="text-muted-foreground">لياقة + ضربات ثابتة</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-medium">الأربعاء:</span>
                        <span className="text-muted-foreground">راحة</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-medium">الخميس:</span>
                        <span className="text-muted-foreground">تدريب على التكتيكات الدفاعية</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-medium">الجمعة:</span>
                        <span className="text-muted-foreground">التدريب قبل المباراة</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-medium">السبت:</span>
                        <span className="text-muted-foreground">مباراة ضد الاتحاد</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-medium">الأحد:</span>
                        <span className="text-muted-foreground">استشفاء + تحليل المباراة</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full">تحميل الجدول (PDF)</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function TabsListWithCounts() {
  return (
    <TabsList className="grid w-full grid-cols-3">
      <TabsTrigger value="today">اليوم <span className="ml-1 text-xs">4</span></TabsTrigger>
      <TabsTrigger value="tomorrow">غدًا <span className="ml-1 text-xs">4</span></TabsTrigger>
      <TabsTrigger value="week">الأسبوع <span className="ml-1 text-xs">7</span></TabsTrigger>
    </TabsList>
  )
}
