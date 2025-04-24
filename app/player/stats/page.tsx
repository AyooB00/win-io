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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  BarChart3,
  Clock,
  Calendar,
  Target,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';

export default function PlayerStatsPage() {
  // Mock data for player statistics
  const playerPerformance = {
    summary: {
      gamesPlayed: 22,
      gamesStarted: 18,
      minutesPlayed: 1620,
      goals: 8,
      assists: 5,
      yellowCards: 3,
      redCards: 0
    },
    recentMatches: [
      {
        id: 1,
        opponent: "الهلال",
        date: "15 مايو 2024",
        result: "فوز 2-1",
        minutesPlayed: 90,
        goals: 1,
        assists: 0,
        rating: 8.2
      },
      {
        id: 2,
        opponent: "النصر",
        date: "8 مايو 2024",
        result: "تعادل 1-1",
        minutesPlayed: 85,
        goals: 0,
        assists: 1,
        rating: 7.8
      },
      {
        id: 3,
        opponent: "الاتحاد",
        date: "1 مايو 2024",
        result: "فوز 3-0",
        minutesPlayed: 90,
        goals: 2,
        assists: 0,
        rating: 8.7
      },
      {
        id: 4,
        opponent: "الشباب",
        date: "24 أبريل 2024",
        result: "خسارة 0-1",
        minutesPlayed: 90,
        goals: 0,
        assists: 0,
        rating: 6.5
      }
    ],
    technicalStats: {
      passingAccuracy: 87,
      successfulDribbles: 65,
      keyPasses: 28,
      interceptions: 14,
      tacklesWon: 32,
      aerialDuelsWon: 48
    },
    physicalStats: {
      topSpeed: 33.2,
      distanceCovered: 218.5,
      sprintsPerGame: 16.3,
      recoveryRate: 85
    }
  };

  const seasonGoals = [
    { month: "أغسطس", count: 0 },
    { month: "سبتمبر", count: 1 },
    { month: "أكتوبر", count: 2 },
    { month: "نوفمبر", count: 1 },
    { month: "ديسمبر", count: 0 },
    { month: "يناير", count: 2 },
    { month: "فبراير", count: 1 },
    { month: "مارس", count: 0 },
    { month: "أبريل", count: 1 }
  ];

  const getStatusColor = (rating) => {
    if (rating >= 8.0) return "bg-green-600";
    if (rating >= 7.0) return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">إحصائيات اللاعب</h1>
        <Badge className="text-lg py-2 px-4">موسم 2023-2024</Badge>
      </div>

      {/* Performance Summary */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">ملخص الأداء</CardTitle>
          <CardDescription>
            المؤشرات الرئيسية للموسم الحالي
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center">
              <Calendar className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm text-muted-foreground">المباريات</span>
              <span className="text-2xl font-bold">{playerPerformance.summary.gamesPlayed}</span>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center">
              <Users className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm text-muted-foreground">أساسي</span>
              <span className="text-2xl font-bold">{playerPerformance.summary.gamesStarted}</span>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center">
              <Clock className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm text-muted-foreground">الدقائق</span>
              <span className="text-2xl font-bold">{playerPerformance.summary.minutesPlayed}</span>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center">
              <Target className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm text-muted-foreground">الأهداف</span>
              <span className="text-2xl font-bold">{playerPerformance.summary.goals}</span>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center">
              <Award className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm text-muted-foreground">التمريرات الحاسمة</span>
              <span className="text-2xl font-bold">{playerPerformance.summary.assists}</span>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center">
              <Badge className="h-6 w-6 bg-yellow-500 mb-2" />
              <span className="text-sm text-muted-foreground">إنذارات</span>
              <span className="text-2xl font-bold">{playerPerformance.summary.yellowCards}</span>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center">
              <Badge className="h-6 w-6 bg-red-500 mb-2" />
              <span className="text-sm text-muted-foreground">طرد</span>
              <span className="text-2xl font-bold">{playerPerformance.summary.redCards}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals by Month Chart */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">الأهداف حسب الشهر</CardTitle>
          <CardDescription>
            توزيع الأهداف على مدار الموسم
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-48 flex items-end justify-between space-x-2 rtl:space-x-reverse">
            {seasonGoals.map((month, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-primary rounded-t-md transition-all duration-500"
                  style={{ height: `${month.count * 20}%`, minHeight: month.count ? '10%' : '5%' }}
                ></div>
                <div className="text-xs mt-2 text-muted-foreground">{month.month}</div>
                <div className="text-sm font-semibold">{month.count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Matches */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">آخر المباريات</CardTitle>
          <CardDescription>
            أداء اللاعب في المباريات الأخيرة
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المنافس</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>النتيجة</TableHead>
                <TableHead>الدقائق</TableHead>
                <TableHead>الأهداف</TableHead>
                <TableHead>التمريرات</TableHead>
                <TableHead>التقييم</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {playerPerformance.recentMatches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell className="font-medium">{match.opponent}</TableCell>
                  <TableCell>{match.date}</TableCell>
                  <TableCell>{match.result}</TableCell>
                  <TableCell>{match.minutesPlayed}</TableCell>
                  <TableCell>{match.goals}</TableCell>
                  <TableCell>{match.assists}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(match.rating)}>
                      {match.rating}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Technical & Physical Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Technical Stats */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">الإحصائيات الفنية</CardTitle>
            <CardDescription>
              المهارات التقنية والتكتيكية
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">دقة التمرير</span>
                  <span className="text-sm font-medium">{playerPerformance.technicalStats.passingAccuracy}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${playerPerformance.technicalStats.passingAccuracy}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">المراوغات الناجحة</span>
                  <span className="text-sm font-medium">{playerPerformance.technicalStats.successfulDribbles}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${playerPerformance.technicalStats.successfulDribbles}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">التمريرات المفتاحية</span>
                  <span className="text-sm font-medium">{playerPerformance.technicalStats.keyPasses}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${(playerPerformance.technicalStats.keyPasses / 40) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">الاعتراضات</span>
                  <span className="text-sm font-medium">{playerPerformance.technicalStats.interceptions}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${(playerPerformance.technicalStats.interceptions / 25) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">التدخلات الناجحة</span>
                  <span className="text-sm font-medium">{playerPerformance.technicalStats.tacklesWon}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${(playerPerformance.technicalStats.tacklesWon / 50) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">الكرات الهوائية</span>
                  <span className="text-sm font-medium">{playerPerformance.technicalStats.aerialDuelsWon}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${playerPerformance.technicalStats.aerialDuelsWon}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Physical Stats */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">الإحصائيات البدنية</CardTitle>
            <CardDescription>
              المؤشرات البدنية والفسيولوجية
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center bg-muted/50 p-4 rounded-lg">
                <Zap className="h-8 w-8 text-yellow-500 mb-2" />
                <span className="text-sm text-muted-foreground">السرعة القصوى</span>
                <div className="mt-2 flex items-baseline">
                  <span className="text-2xl font-bold">{playerPerformance.physicalStats.topSpeed}</span>
                  <span className="text-sm text-muted-foreground mr-1">كم/س</span>
                </div>
              </div>
              <div className="flex flex-col items-center bg-muted/50 p-4 rounded-lg">
                <BarChart3 className="h-8 w-8 text-blue-500 mb-2" />
                <span className="text-sm text-muted-foreground">المسافة المقطوعة</span>
                <div className="mt-2 flex items-baseline">
                  <span className="text-2xl font-bold">{playerPerformance.physicalStats.distanceCovered}</span>
                  <span className="text-sm text-muted-foreground mr-1">كم</span>
                </div>
              </div>
              <div className="flex flex-col items-center bg-muted/50 p-4 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-500 mb-2" />
                <span className="text-sm text-muted-foreground">العدوات السريعة</span>
                <div className="mt-2 flex items-baseline">
                  <span className="text-2xl font-bold">{playerPerformance.physicalStats.sprintsPerGame}</span>
                  <span className="text-sm text-muted-foreground mr-1">لكل مباراة</span>
                </div>
              </div>
              <div className="flex flex-col items-center bg-muted/50 p-4 rounded-lg">
                <Activity className="h-8 w-8 text-red-500 mb-2" />
                <span className="text-sm text-muted-foreground">معدل الاستشفاء</span>
                <div className="mt-2 flex items-baseline">
                  <span className="text-2xl font-bold">{playerPerformance.physicalStats.recoveryRate}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 