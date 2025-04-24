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
  CalendarClock, 
  ClipboardCheck,
  Activity,
  Stethoscope,
  PlusCircle,
  FileText,
  Dumbbell,
  AlertCircle
} from 'lucide-react';

export default function MedicalDashboard() {
  // Mock data for medical dashboard
  const medicalStats = {
    totalPlayers: 24,
    injuredPlayers: 3,
    upcomingCheckups: 5,
    recoveryPrograms: 2,
    activeAlerts: 1
  };

  const injuredPlayers = [
    { 
      id: 1, 
      name: "أحمد الشمري", 
      injury: "تمزق في أربطة الكاحل", 
      date: "5 مايو 2024", 
      status: "قيد التعافي",
      expectedReturn: "28 مايو 2024",
      severity: "متوسطة"
    },
    { 
      id: 2, 
      name: "محمد العنزي", 
      injury: "شد عضلي في الفخذ", 
      date: "10 مايو 2024", 
      status: "قيد التعافي",
      expectedReturn: "18 مايو 2024",
      severity: "خفيفة"
    },
    { 
      id: 3, 
      name: "خالد القحطاني", 
      injury: "التهاب في وتر الركبة", 
      date: "15 مايو 2024", 
      status: "بداية العلاج",
      expectedReturn: "5 يونيو 2024",
      severity: "شديدة"
    }
  ];

  const upcomingCheckups = [
    { id: 1, player: "عبدالله محمد", type: "فحص دوري", date: "اليوم", time: "10:00 صباحًا" },
    { id: 2, player: "فهد العتيبي", type: "متابعة إصابة", date: "غدًا", time: "11:30 صباحًا" },
    { id: 3, player: "سعد الدوسري", type: "فحص دوري", date: "21 مايو 2024", time: "9:30 صباحًا" },
    { id: 4, player: "أحمد الشمري", type: "تقييم التعافي", date: "22 مايو 2024", time: "1:00 ظهرًا" },
  ];

  const fitnessReports = [
    { id: 1, player: "نواف العتيبي", fitnessLevel: 95, change: "+2", lastTest: "أمس" },
    { id: 2, player: "سلمان الفرج", fitnessLevel: 92, change: "+1", lastTest: "قبل 3 أيام" },
    { id: 3, player: "ياسر القحطاني", fitnessLevel: 88, change: "-1", lastTest: "الأسبوع الماضي" },
    { id: 4, player: "محمد الشهراني", fitnessLevel: 90, change: "+3", lastTest: "أمس" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">لوحة التحكم الطبية</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          إضافة تقرير طبي
        </Button>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard
          title="إجمالي اللاعبين"
          value={medicalStats.totalPlayers.toString()}
          icon={<Users className="w-6 h-6" />}
          change={{ type: 'neutral', value: "0" }}
          description="عدد اللاعبين تحت الإشراف الطبي"
        />
        <StatCard
          title="اللاعبين المصابين"
          value={medicalStats.injuredPlayers.toString()}
          icon={<Heart className="w-6 h-6" />}
          change={{ type: 'increase', value: "1" }}
          description="إصابة جديدة هذا الأسبوع"
        />
        <StatCard
          title="فحوصات طبية قادمة"
          value={medicalStats.upcomingCheckups.toString()}
          icon={<Stethoscope className="w-6 h-6" />}
          change={{ type: 'neutral', value: "0" }}
          description="خلال الأسبوع القادم"
        />
        <StatCard
          title="برامج التعافي"
          value={medicalStats.recoveryPrograms.toString()}
          icon={<Activity className="w-6 h-6" />}
          change={{ type: 'decrease', value: "1" }}
          description="تعافى لاعب واحد"
        />
        <StatCard
          title="تنبيهات نشطة"
          value={medicalStats.activeAlerts.toString()}
          icon={<AlertCircle className="w-6 h-6" />}
          change={{ type: 'neutral', value: "0" }}
          description="حالة طبية تتطلب المتابعة"
        />
      </div>

      {/* Injured Players */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">اللاعبون المصابون</CardTitle>
          <CardDescription>
            تفاصيل الإصابات الحالية وحالة التعافي
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اللاعب</TableHead>
                <TableHead>الإصابة</TableHead>
                <TableHead>تاريخ الإصابة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>تاريخ العودة المتوقع</TableHead>
                <TableHead className="text-left">الشدة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {injuredPlayers.map((player) => (
                <TableRow key={player.id}>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell>{player.injury}</TableCell>
                  <TableCell>{player.date}</TableCell>
                  <TableCell>{player.status}</TableCell>
                  <TableCell>{player.expectedReturn}</TableCell>
                  <TableCell className="text-left">
                    {player.severity === 'خفيفة' ? (
                      <Badge className="bg-green-600">{player.severity}</Badge>
                    ) : player.severity === 'متوسطة' ? (
                      <Badge className="bg-yellow-600">{player.severity}</Badge>
                    ) : (
                      <Badge className="bg-red-600">{player.severity}</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 flex justify-end">
            <Button variant="outline" className="mr-2">
              <FileText className="mr-2 h-4 w-4" />
              طباعة التقرير
            </Button>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              تسجيل إصابة جديدة
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Checkups */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">الفحوصات القادمة</CardTitle>
          <CardDescription>
            جدول الفحوصات الطبية المقررة
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اللاعب</TableHead>
                <TableHead>نوع الفحص</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الوقت</TableHead>
                <TableHead className="text-left">الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingCheckups.map((checkup) => (
                <TableRow key={checkup.id}>
                  <TableCell className="font-medium">{checkup.player}</TableCell>
                  <TableCell>{checkup.type}</TableCell>
                  <TableCell>{checkup.date}</TableCell>
                  <TableCell>{checkup.time}</TableCell>
                  <TableCell className="text-left">
                    {checkup.date === 'اليوم' ? (
                      <Badge>اليوم</Badge>
                    ) : checkup.date === 'غدًا' ? (
                      <Badge className="bg-blue-600">غدًا</Badge>
                    ) : (
                      <Badge variant="outline">قادم</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 flex justify-end">
            <Button>
              <CalendarClock className="mr-2 h-4 w-4" />
              جدولة فحص جديد
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">تقارير ومعلومات إضافية</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Tabs defaultValue="fitness" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="fitness">تقارير اللياقة</TabsTrigger>
              <TabsTrigger value="recovery">برامج التعافي</TabsTrigger>
              <TabsTrigger value="nutrition">التغذية والنظام الغذائي</TabsTrigger>
            </TabsList>
            
            <TabsContent value="fitness" className="p-4 pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fitnessReports.map((report) => (
                    <div key={report.id} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{report.player}</h3>
                        <span className={`text-sm font-medium ${report.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {report.change}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-muted-foreground">مستوى اللياقة</span>
                        <span className="font-medium">{report.fitnessLevel}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mb-2">
                        <div 
                          className={`${report.fitnessLevel > 90 ? 'bg-green-500' : report.fitnessLevel > 80 ? 'bg-blue-500' : 'bg-yellow-500'} h-2 rounded-full`} 
                          style={{ width: `${report.fitnessLevel}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        آخر فحص: {report.lastTest}
                      </p>
                    </div>
                  ))}
                </div>
                <Button className="w-full">عرض تقارير اللياقة الكاملة</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="recovery" className="p-4 pt-6">
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold">أحمد الشمري - برنامج تعافي من إصابة الكاحل</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">نسبة التعافي</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      تمارين التأهيل: تمارين توازن، تقوية عضلات الكاحل، تمارين مرونة
                    </p>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">تحديث البرنامج</Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold">محمد العنزي - برنامج تعافي من الشد العضلي</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">نسبة التعافي</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      تمارين التأهيل: تمارين تمدد للعضلات، تقوية عضلات الفخذ، تمارين مائية
                    </p>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">تحديث البرنامج</Button>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Dumbbell className="mr-2 h-4 w-4" />
                  إنشاء برنامج تعافي جديد
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="nutrition" className="p-4 pt-6">
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold">النظام الغذائي العام للفريق</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li>
                      <span className="font-medium">وجبة الإفطار:</span>
                      <span className="text-muted-foreground"> بروتين عالي، كربوهيدرات معقدة، فواكه طازجة</span>
                    </li>
                    <li>
                      <span className="font-medium">وجبة ما قبل التدريب:</span>
                      <span className="text-muted-foreground"> كربوهيدرات بسيطة، بروتين قليل، ماء كافي</span>
                    </li>
                    <li>
                      <span className="font-medium">وجبة ما بعد التدريب:</span>
                      <span className="text-muted-foreground"> بروتين عالي، كربوهيدرات للتعويض، مكملات الاستشفاء</span>
                    </li>
                    <li>
                      <span className="font-medium">وجبة العشاء:</span>
                      <span className="text-muted-foreground"> بروتين معتدل، خضروات متنوعة، دهون صحية</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold">أنظمة غذائية خاصة</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded">
                      <span className="font-medium">خالد القحطاني:</span>
                      <span className="text-muted-foreground"> نظام غذائي غني بالكولاجين ومضادات الالتهاب للمساعدة في علاج التهاب وتر الركبة</span>
                    </li>
                    <li className="p-2 bg-green-100 dark:bg-green-900/20 rounded">
                      <span className="font-medium">أحمد الشمري:</span>
                      <span className="text-muted-foreground"> نظام غذائي غني بالكالسيوم وفيتامين د لتسريع التئام الأربطة</span>
                    </li>
                  </ul>
                </div>
                
                <Button className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  تعديل خطط التغذية
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 