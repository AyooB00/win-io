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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Calendar,
  CheckCircle,
  FileText,
  MessageSquare,
  Star,
  TrendingUp,
  User,
  Users
} from 'lucide-react';

export default function PlayerEvaluationPage() {
  // Mock data for evaluations
  const playerEvaluations = {
    currentRating: 8.2,
    skillRatings: {
      technical: {
        passing: 85,
        shooting: 78,
        dribbling: 82,
        heading: 70,
        firstTouch: 86,
        crossing: 75
      },
      mental: {
        decisions: 80,
        vision: 82,
        positioning: 85,
        teamwork: 88,
        leadership: 72,
        composure: 79
      },
      physical: {
        pace: 90,
        stamina: 85,
        strength: 76,
        jumping: 80,
        balance: 84,
        agility: 88
      }
    },
    coachReviews: [
      {
        id: 1,
        coach: "أحمد الشمري",
        position: "المدرب الرئيسي",
        date: "12 مايو 2024",
        rating: 8.5,
        comments: "أظهر تحسنًا كبيرًا في صناعة اللعب والتمريرات الحاسمة. يحتاج إلى تحسين التغطية الدفاعية والتمركز عند فقدان الكرة. أداء متميز في المباريات الأخيرة.",
        strengths: ["التمريرات الدقيقة", "الرؤية الفنية", "الهجمات المرتدة"],
        improvements: ["العودة الدفاعية", "الالتزام التكتيكي"]
      },
      {
        id: 2,
        coach: "فيصل المالكي",
        position: "مدرب مساعد",
        date: "28 أبريل 2024",
        rating: 7.8,
        comments: "يعمل بجد في التدريبات ويطبق التعليمات. مستوى ممتاز في المباريات الحاسمة. يحتاج إلى تحسين الثبات في الأداء والتركيز طوال المباراة.",
        strengths: ["الالتزام", "روح الفريق", "المهارات الفردية"],
        improvements: ["الثبات في الأداء", "التركيز لفترات أطول"]
      }
    ],
    performanceReports: [
      {
        period: "الربع الأول 2024",
        summary: "أداء جيد جدًا مع تحسن ملحوظ في الجوانب التكتيكية",
        rating: 8.1,
        metrics: [
          { name: "دقة التمرير", value: 88, prevValue: 82, target: 90 },
          { name: "معدل اصطياد الكرات", value: 6.8, prevValue: 5.5, target: 7.0 },
          { name: "معدل التسديد على المرمى", value: 75, prevValue: 68, target: 80 },
          { name: "معدل المراوغات الناجحة", value: 65, prevValue: 60, target: 70 },
          { name: "التغطية الدفاعية", value: 72, prevValue: 65, target: 80 }
        ],
        badges: ["أفضل لاعب صاعد", "تشكيلة الفريق المثالي"]
      },
      {
        period: "الربع الرابع 2023",
        summary: "تحسن مستمر وأداء متميز في كأس الخليج",
        rating: 7.9,
        metrics: [
          { name: "دقة التمرير", value: 82, prevValue: 80, target: 85 },
          { name: "معدل اصطياد الكرات", value: 5.5, prevValue: 4.8, target: 6.0 },
          { name: "معدل التسديد على المرمى", value: 68, prevValue: 65, target: 75 },
          { name: "معدل المراوغات الناجحة", value: 60, prevValue: 55, target: 65 },
          { name: "التغطية الدفاعية", value: 65, prevValue: 62, target: 75 }
        ],
        badges: ["لاعب الشهر - ديسمبر"]
      }
    ],
    developmentGoals: [
      {
        id: 1,
        title: "تحسين التغطية الدفاعية",
        description: "التركيز على التمركز الدفاعي والتغطية عند فقدان الكرة",
        progress: 65,
        deadline: "30 يونيو 2024",
        status: "قيد التنفيذ",
        action: "تمارين إضافية للتمركز الدفاعي مع المدرب المساعد"
      },
      {
        id: 2,
        title: "زيادة دقة التسديد",
        description: "تحسين معدل التسديد على المرمى والفعالية الهجومية",
        progress: 80,
        deadline: "15 مايو 2024",
        status: "مكتمل",
        action: "تمارين تسديد بعد التدريب الرئيسي (30 دقيقة إضافية)"
      },
      {
        id: 3,
        title: "تحسين اللياقة البدنية",
        description: "رفع مستوى اللياقة والقدرة على التحمل طوال المباراة",
        progress: 90,
        deadline: "1 أبريل 2024",
        status: "مكتمل",
        action: "برنامج تدريبي مخصص للياقة البدنية"
      }
    ]
  };

  const getPerformanceIndicator = (current, previous) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (current < previous) return <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />;
    return null;
  };

  const getRatingBadgeColor = (rating) => {
    if (rating >= 8.0) return "bg-green-600";
    if (rating >= 7.0) return "bg-blue-600";
    if (rating >= 6.0) return "bg-yellow-600";
    return "bg-red-600";
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-600";
    if (progress >= 60) return "bg-yellow-600";
    if (progress >= 40) return "bg-orange-600";
    return "bg-red-600";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "مكتمل":
        return <Badge className="bg-green-600">مكتمل</Badge>;
      case "قيد التنفيذ":
        return <Badge className="bg-blue-600">قيد التنفيذ</Badge>;
      case "متأخر":
        return <Badge className="bg-red-600">متأخر</Badge>;
      default:
        return <Badge className="bg-gray-600">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">تقييم اللاعب</h1>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Badge className={`${getRatingBadgeColor(playerEvaluations.currentRating)} text-lg py-2 px-4`}>
            {playerEvaluations.currentRating} / 10
          </Badge>
          <Button>
            تنزيل التقييم الكامل
          </Button>
        </div>
      </div>

      {/* Skill Ratings */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">تقييم المهارات</CardTitle>
          <CardDescription>
            تقييم تفصيلي للقدرات الفنية والذهنية والبدنية
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Tabs defaultValue="technical" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="technical">المهارات الفنية</TabsTrigger>
              <TabsTrigger value="mental">القدرات الذهنية</TabsTrigger>
              <TabsTrigger value="physical">القدرات البدنية</TabsTrigger>
            </TabsList>
            
            <TabsContent value="technical">
              <div className="space-y-4">
                {Object.entries(playerEvaluations.skillRatings.technical).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="capitalize">{key}</span>
                      <span className="font-medium">{value}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="mental">
              <div className="space-y-4">
                {Object.entries(playerEvaluations.skillRatings.mental).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="capitalize">{key}</span>
                      <span className="font-medium">{value}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="physical">
              <div className="space-y-4">
                {Object.entries(playerEvaluations.skillRatings.physical).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="capitalize">{key}</span>
                      <span className="font-medium">{value}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Coach Reviews */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">تقييمات المدربين</CardTitle>
          <CardDescription>
            ملاحظات وتقييمات الجهاز الفني
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-6">
            {playerEvaluations.coachReviews.map((review) => (
              <div key={review.id} className="p-4 border rounded-lg">
                <div className="flex flex-wrap justify-between items-center mb-3">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2 sm:mb-0">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{review.coach}</h3>
                      <p className="text-sm text-muted-foreground">{review.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{review.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 inline-block ml-1" />
                      {review.date}
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm">{review.comments}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">نقاط القوة:</h4>
                    <div className="flex flex-wrap gap-2">
                      {review.strengths.map((strength, idx) => (
                        <Badge key={idx} variant="outline" className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">مجالات التحسين:</h4>
                    <div className="flex flex-wrap gap-2">
                      {review.improvements.map((improvement, idx) => (
                        <Badge key={idx} variant="outline" className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                          {improvement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Reports */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">تقارير الأداء</CardTitle>
          <CardDescription>
            تقارير أداء دورية
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Tabs defaultValue="0" className="w-full">
            <TabsList className="mb-4">
              {playerEvaluations.performanceReports.map((report, index) => (
                <TabsTrigger key={index} value={index.toString()}>
                  {report.period}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {playerEvaluations.performanceReports.map((report, index) => (
              <TabsContent key={index} value={index.toString()}>
                <div className="space-y-4">
                  <div className="flex flex-wrap justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">ملخص الفترة</p>
                      <p>{report.summary}</p>
                    </div>
                    <Badge className={getRatingBadgeColor(report.rating)}>
                      التقييم العام: {report.rating}
                    </Badge>
                  </div>
                  
                  {report.badges && report.badges.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground mb-2">الإنجازات:</p>
                      <div className="flex flex-wrap gap-2">
                        {report.badges.map((badge, badgeIndex) => (
                          <Badge key={badgeIndex} variant="outline" className="bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">المؤشرات الرئيسية</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>المؤشر</TableHead>
                          <TableHead>القيمة الحالية</TableHead>
                          <TableHead>القيمة السابقة</TableHead>
                          <TableHead>المستهدف</TableHead>
                          <TableHead>التغيير</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {report.metrics.map((metric, metricIndex) => (
                          <TableRow key={metricIndex}>
                            <TableCell className="font-medium">{metric.name}</TableCell>
                            <TableCell>{metric.value}</TableCell>
                            <TableCell>{metric.prevValue}</TableCell>
                            <TableCell>{metric.target}</TableCell>
                            <TableCell>
                              {getPerformanceIndicator(metric.value, metric.prevValue)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Development Goals */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">أهداف التطوير</CardTitle>
          <CardDescription>
            خطة تطوير مهارات اللاعب
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-6">
            {playerEvaluations.developmentGoals.map((goal) => (
              <div key={goal.id} className="p-4 border rounded-lg">
                <div className="flex flex-wrap justify-between items-center mb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2 sm:mb-0">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-medium">{goal.title}</h3>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {getStatusBadge(goal.status)}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">التقدم</span>
                      <span className="text-sm font-medium">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className={`h-2 ${getProgressColor(goal.progress)}`} />
                  </div>
                  
                  <div className="flex flex-wrap justify-between text-sm">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mr-4">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>الموعد النهائي: {goal.deadline}</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span>الإجراء: {goal.action}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-end mt-4">
              <Button>
                <MessageSquare className="mr-2 h-4 w-4" />
                إضافة ملاحظات
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 