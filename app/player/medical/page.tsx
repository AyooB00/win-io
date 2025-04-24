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
  HeartPulse,
  Activity,
  Weight,
  Binary,
  Ruler,
  Clock,
  ThermometerSnowflake,
  Vibrate,
  Percentage,
  Calendar
} from 'lucide-react';

export default function PlayerMedicalPage() {
  // Mock data for medical records
  const playerHealth = {
    vitalStats: {
      height: 183,
      weight: 78.5,
      bodyFat: 12.3,
      bloodPressure: "120/80",
      restingHeartRate: 56,
      maxHr: 188,
      vo2Max: 58.4
    },
    injuries: [
      {
        id: 1,
        type: "إصابة عضلية",
        location: "الفخذ الأيمن",
        date: "15 فبراير 2024",
        status: "متعافي",
        duration: "21 يوم",
        treatmentPlan: "علاج طبيعي وراحة",
        notes: "تم التعافي بشكل كامل، يجب المتابعة للتأكد من عدم وجود أي مضاعفات"
      },
      {
        id: 2,
        type: "التواء",
        location: "الكاحل الأيسر",
        date: "5 أبريل 2024",
        status: "قيد العلاج",
        duration: "14 يوم",
        treatmentPlan: "علاج طبيعي وتمارين تقوية",
        notes: "تحسن ملحوظ، يجب الاستمرار في التمارين المقررة"
      }
    ],
    fitnessTests: [
      {
        date: "10 مارس 2024",
        results: [
          { test: "اختبار الجري 20 متر", score: "3.02 ثانية", rating: "ممتاز" },
          { test: "قفز عمودي", score: "65 سم", rating: "جيد جدًا" },
          { test: "اختبار بيب", score: "الحد 13.2", rating: "ممتاز" },
          { test: "رمي الكرة الطبية", score: "14.5 متر", rating: "ممتاز" },
          { test: "مرونة الجذع", score: "12 سم", rating: "جيد" }
        ]
      },
      {
        date: "10 ديسمبر 2023",
        results: [
          { test: "اختبار الجري 20 متر", score: "3.05 ثانية", rating: "جيد جدًا" },
          { test: "قفز عمودي", score: "62 سم", rating: "جيد جدًا" },
          { test: "اختبار بيب", score: "الحد 13.0", rating: "جيد جدًا" },
          { test: "رمي الكرة الطبية", score: "14.1 متر", rating: "جيد جدًا" },
          { test: "مرونة الجذع", score: "10 سم", rating: "جيد" }
        ]
      }
    ],
    nutritionPlan: {
      dailyCalories: 3200,
      macros: {
        protein: 30,
        carbs: 50,
        fat: 20
      },
      mealPlan: [
        {
          meal: "الإفطار",
          time: "7:30 صباحًا",
          foods: [
            "عصيدة الشوفان مع الموز والعسل",
            "بيض (3) وخبز التوست الكامل",
            "أفوكادو",
            "عصير برتقال طازج"
          ]
        },
        {
          meal: "وجبة خفيفة صباحية",
          time: "10:30 صباحًا",
          foods: [
            "زبادي يوناني مع التوت والعسل",
            "مكسرات (30 جرام)",
            "موزة"
          ]
        },
        {
          meal: "الغداء",
          time: "1:00 ظهرًا",
          foods: [
            "صدر دجاج مشوي (200 جرام)",
            "أرز بني أو بطاطا حلوة",
            "سلطة خضراء مع زيت زيتون",
            "خضروات مشكلة"
          ]
        },
        {
          meal: "وجبة ما قبل التدريب",
          time: "4:00 عصرًا",
          foods: [
            "سندويش ديك رومي مع جبن قليل الدسم",
            "تفاحة",
            "عصير طبيعي"
          ]
        },
        {
          meal: "وجبة ما بعد التدريب",
          time: "7:30 مساءً",
          foods: [
            "مشروب بروتين",
            "موز",
            "توست كامل مع العسل"
          ]
        },
        {
          meal: "العشاء",
          time: "8:30 مساءً",
          foods: [
            "سمك مشوي أو لحم بقري (200 جرام)",
            "خضروات مطبوخة",
            "كينوا أو معكرونة كاملة",
            "سلطة مشكلة"
          ]
        }
      ]
    },
    medicalAppointments: [
      {
        id: 1,
        type: "فحص دوري",
        doctor: "د. خالد العلي",
        speciality: "طب رياضي",
        date: "5 يونيو 2024",
        time: "10:00 صباحًا",
        location: "مركز الطب الرياضي"
      },
      {
        id: 2,
        type: "متابعة إصابة",
        doctor: "د. سارة الأحمد",
        speciality: "علاج طبيعي",
        date: "12 مايو 2024",
        time: "2:30 ظهرًا",
        location: "مركز العلاج الطبيعي"
      }
    ]
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "ممتاز":
        return "bg-green-600";
      case "جيد جدًا":
        return "bg-blue-600";
      case "جيد":
        return "bg-yellow-600";
      case "متوسط":
        return "bg-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "متعافي":
        return "bg-green-600";
      case "قيد العلاج":
        return "bg-yellow-600";
      case "خطيرة":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">التقرير الطبي</h1>
        <Button>
          تنزيل التقرير
        </Button>
      </div>

      {/* Vital Statistics */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">المؤشرات الحيوية</CardTitle>
          <CardDescription>
            المعلومات الأساسية والمؤشرات الحيوية للاعب
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center">
              <Ruler className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm text-muted-foreground">الطول</span>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold">{playerHealth.vitalStats.height}</span>
                <span className="text-sm text-muted-foreground mr-1">سم</span>
              </div>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center">
              <Weight className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm text-muted-foreground">الوزن</span>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold">{playerHealth.vitalStats.weight}</span>
                <span className="text-sm text-muted-foreground mr-1">كجم</span>
              </div>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center">
              <Percentage className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm text-muted-foreground">دهون الجسم</span>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold">{playerHealth.vitalStats.bodyFat}</span>
                <span className="text-sm text-muted-foreground mr-1">%</span>
              </div>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center">
              <Activity className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm text-muted-foreground">ضغط الدم</span>
              <span className="text-2xl font-bold">{playerHealth.vitalStats.bloodPressure}</span>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center">
              <HeartPulse className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm text-muted-foreground">النبض وقت الراحة</span>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold">{playerHealth.vitalStats.restingHeartRate}</span>
                <span className="text-sm text-muted-foreground mr-1">ن/د</span>
              </div>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center">
              <Vibrate className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm text-muted-foreground">النبض الأقصى</span>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold">{playerHealth.vitalStats.maxHr}</span>
                <span className="text-sm text-muted-foreground mr-1">ن/د</span>
              </div>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center">
              <ThermometerSnowflake className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm text-muted-foreground">VO2 Max</span>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold">{playerHealth.vitalStats.vo2Max}</span>
                <span className="text-sm text-muted-foreground mr-1">مل/كجم/د</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Injuries & Treatment */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">سجل الإصابات</CardTitle>
          <CardDescription>
            سجل الإصابات وخطط العلاج
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-6">
            {playerHealth.injuries.map((injury) => (
              <div key={injury.id} className="p-4 border rounded-lg">
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2 sm:mb-0">
                    <Badge className={getStatusColor(injury.status)}>
                      {injury.status}
                    </Badge>
                    <h3 className="text-lg font-medium">{injury.type} - {injury.location}</h3>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{injury.date}</span>
                    <span>•</span>
                    <Clock className="h-4 w-4" />
                    <span>{injury.duration}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <h4 className="text-sm font-medium mb-1">خطة العلاج:</h4>
                    <p className="text-sm">{injury.treatmentPlan}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">ملاحظات:</h4>
                    <p className="text-sm">{injury.notes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fitness Tests */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">اختبارات اللياقة البدنية</CardTitle>
          <CardDescription>
            نتائج اختبارات اللياقة البدنية
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Tabs defaultValue="0" className="w-full">
            <TabsList className="mb-4">
              {playerHealth.fitnessTests.map((test, index) => (
                <TabsTrigger key={index} value={index.toString()}>
                  {test.date}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {playerHealth.fitnessTests.map((test, testIndex) => (
              <TabsContent key={testIndex} value={testIndex.toString()}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الاختبار</TableHead>
                      <TableHead>النتيجة</TableHead>
                      <TableHead>التقييم</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {test.results.map((result, resultIndex) => (
                      <TableRow key={resultIndex}>
                        <TableCell className="font-medium">{result.test}</TableCell>
                        <TableCell>{result.score}</TableCell>
                        <TableCell>
                          <Badge className={getRatingColor(result.rating)}>
                            {result.rating}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Nutrition Plan */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">الخطة الغذائية</CardTitle>
          <CardDescription>
            برنامج التغذية المخصص للاعب
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="mb-6">
            <div className="flex flex-wrap justify-between items-center mb-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2 sm:mb-0">
                <h3 className="text-lg font-medium">السعرات الحرارية اليومية:</h3>
                <span className="font-bold">{playerHealth.nutritionPlan.dailyCalories} سعرة</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2 text-center">بروتين</h4>
                <div className="relative h-24 w-24 mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{playerHealth.nutritionPlan.macros.protein}%</span>
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="2"></circle>
                    <circle 
                      cx="18" cy="18" r="16" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      strokeDasharray={`${playerHealth.nutritionPlan.macros.protein} 100`}
                      className="text-blue-500" 
                      transform="rotate(-90 18 18)"
                    ></circle>
                  </svg>
                </div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2 text-center">كربوهيدرات</h4>
                <div className="relative h-24 w-24 mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{playerHealth.nutritionPlan.macros.carbs}%</span>
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="2"></circle>
                    <circle 
                      cx="18" cy="18" r="16" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      strokeDasharray={`${playerHealth.nutritionPlan.macros.carbs} 100`}
                      className="text-green-500" 
                      transform="rotate(-90 18 18)"
                    ></circle>
                  </svg>
                </div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2 text-center">دهون</h4>
                <div className="relative h-24 w-24 mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{playerHealth.nutritionPlan.macros.fat}%</span>
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="2"></circle>
                    <circle 
                      cx="18" cy="18" r="16" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      strokeDasharray={`${playerHealth.nutritionPlan.macros.fat} 100`}
                      className="text-yellow-500" 
                      transform="rotate(-90 18 18)"
                    ></circle>
                  </svg>
                </div>
              </div>
            </div>
              
            <div className="space-y-4">
              {playerHealth.nutritionPlan.mealPlan.map((meal, index) => (
                <div key={index} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{meal.meal}</h4>
                    <span className="text-sm text-muted-foreground">{meal.time}</span>
                  </div>
                  <ul className="space-y-1">
                    {meal.foods.map((food, foodIndex) => (
                      <li key={foodIndex} className="text-sm flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>{food}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">المواعيد الطبية القادمة</CardTitle>
          <CardDescription>
            جدول المواعيد الطبية المحددة للاعب
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {playerHealth.medicalAppointments.map((appointment) => (
              <div key={appointment.id} className="p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="mb-3 sm:mb-0">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                    <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                      {appointment.type}
                    </Badge>
                  </div>
                  <h4 className="font-medium">د. {appointment.doctor}</h4>
                  <p className="text-sm text-muted-foreground">{appointment.speciality}</p>
                </div>
                
                <div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm mt-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm mt-1">
                    <Binary className="h-4 w-4 text-muted-foreground" />
                    <span>{appointment.location}</span>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="mt-3 sm:mt-0">
                  تعديل الموعد
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 