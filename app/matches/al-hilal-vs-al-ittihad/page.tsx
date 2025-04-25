'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// Match data
const matchData = {
  id: 1,
  homeTeam: { 
    name: 'الهلال', 
    logo: '/teams/hilal.png', 
    score: 1,
    formation: '4-3-3',
    coach: 'جورج جيسوس',
    keyPlayers: [
      { name: 'محمد الدعيع', position: 'حارس مرمى' },
      { name: 'سالم الدوسري', position: 'جناح' },
      { name: 'ميتشو باتشواي', position: 'مهاجم' }
    ],
    strengths: ['الهجمات المرتدة', 'الاستحواذ على الكرة', 'الكرات الثابتة'],
    weaknesses: ['الدفاع ضد الهجمات المرتدة', 'الضغط العالي']
  },
  awayTeam: { 
    name: 'الاتحاد', 
    logo: '/teams/ittihad.png', 
    score: 4,
    formation: '4-2-3-1',
    coach: 'نونو سانتو',
    keyPlayers: [
      { name: 'كريم بنزيما', position: 'مهاجم' },
      { name: 'إنجولو كانتي', position: 'وسط' },
      { name: 'ستيفن بيرغوين', position: 'جناح' }
    ],
    strengths: ['الضغط العالي', 'الهجمات المنظمة', 'الدفاع المتماسك'],
    weaknesses: ['الكرات العرضية الدفاعية', 'التعامل مع الفرق السريعة']
  },
  date: '2025-02-22T18:15:00',
  venue: 'ملعب البنك الأهلي في مدينة الملك عبدالله الرياضية',
  attendance: 52870,
  scorers: [
    { team: 'الهلال', player: 'ليوناردو', minute: 23 },
    { team: 'الاتحاد', player: 'كاديش', minute: 29 },
    { team: 'الاتحاد', player: 'بيرغوين', minute: 45 },
    { team: 'الاتحاد', player: 'بيرغوين', minute: 51 },
    { team: 'الاتحاد', player: 'بنزيما', minute: 86 }
  ],
  stats: {
    possession: { home: 45, away: 55 },
    shots: { home: 10, away: 15 },
    shotsOnTarget: { home: 3, away: 7 },
    corners: { home: 5, away: 6 },
    fouls: { home: 12, away: 10 },
    yellowCards: { home: 2, away: 1 },
    redCards: { home: 0, away: 0 }
  },
  headToHead: {
    total: { alHilal: 19, alIttihad: 5, draws: 7 }
  }
};

// Tactical recommendations
const tacticalRecommendations = {
  alHilal: [
    "تحسين التنظيم الدفاعي ضد الهجمات المرتدة السريعة",
    "زيادة الضغط على خط الوسط للحد من خطورة بيرغوين وكانتي",
    "استغلال الجانب الأيمن الضعيف دفاعيًا للاتحاد",
    "التركيز على الكرات الثابتة في الهجوم",
    "استخدام تغيير نقاط الهجوم لإرباك دفاع الاتحاد"
  ],
  alIttihad: [
    "الاستمرار بالضغط العالي على دفاع الهلال",
    "الاعتماد على سرعة بيرغوين في الهجمات المرتدة",
    "استغلال خبرة بنزيما في اختراق دفاع الهلال",
    "تكثيف الوجود في وسط الملعب للسيطرة على مجريات اللعب",
    "تأمين الخط الخلفي ضد الهجمات المرتدة للهلال"
  ]
};

export default function MatchAnalysisPage() {
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="p-6 max-w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">تحليل المباراة: {matchData.homeTeam.name} ضد {matchData.awayTeam.name}</h1>
          <p className="text-gray-500">{formatDate(matchData.date)} - {matchData.venue}</p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Badge variant="outline" className="text-lg">
            الجولة 21 - الدوري السعودي
          </Badge>
        </div>
      </div>

      {/* Match Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Home Team */}
          <div className="flex flex-col items-center mb-4 md:mb-0 w-full md:w-1/3">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-blue-700">{matchData.homeTeam.name.substring(0, 2)}</span>
            </div>
            <h2 className="text-xl font-bold">{matchData.homeTeam.name}</h2>
            <p className="text-sm opacity-90 mt-1">{matchData.homeTeam.formation}</p>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center justify-center w-full md:w-1/3 mb-4 md:mb-0">
            <div className="text-sm mb-2 opacity-80">النتيجة النهائية</div>
            <div className="text-5xl font-bold mb-3">
              {matchData.homeTeam.score} - {matchData.awayTeam.score}
            </div>
            <div className="bg-white px-4 py-1 rounded-full text-blue-800 text-sm font-medium">
              {formatDate(matchData.date)} - {formatTime(matchData.date)}
            </div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center w-full md:w-1/3">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-blue-700">{matchData.awayTeam.name.substring(0, 2)}</span>
            </div>
            <h2 className="text-xl font-bold">{matchData.awayTeam.name}</h2>
            <p className="text-sm opacity-90 mt-1">{matchData.awayTeam.formation}</p>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold mb-2">الأهداف</h3>
            <div className="space-y-2">
              {matchData.scorers.map((scorer, index) => (
                <div key={index} className="flex items-center justify-center">
                  <span className="font-bold">{scorer.team}</span>
                  <span className="mx-2">-</span>
                  <span>{scorer.player}</span>
                  <span className="mx-2">({scorer.minute}')</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for detailed analysis */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="stats">الإحصائيات</TabsTrigger>
          <TabsTrigger value="teams">تحليل الفرق</TabsTrigger>
          <TabsTrigger value="recommendations">التوصيات التكتيكية</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>معلومات المباراة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">الملعب</p>
                    <p className="font-medium">{matchData.venue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">الحضور</p>
                    <p className="font-medium">{matchData.attendance.toLocaleString()} متفرج</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">المواجهات السابقة</p>
                    <div className="flex space-x-4 rtl:space-x-reverse mt-2">
                      <div className="text-center">
                        <span className="block font-bold text-lg">{matchData.headToHead.total.alHilal}</span>
                        <span className="text-xs text-gray-500">الهلال</span>
                      </div>
                      <div className="text-center">
                        <span className="block font-bold text-lg">{matchData.headToHead.total.draws}</span>
                        <span className="text-xs text-gray-500">تعادل</span>
                      </div>
                      <div className="text-center">
                        <span className="block font-bold text-lg">{matchData.headToHead.total.alIttihad}</span>
                        <span className="text-xs text-gray-500">الاتحاد</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ملخص المباراة</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  حقق فريق الاتحاد فوزاً كبيراً على منافسه الهلال بنتيجة 4-1 في مباراة قوية ضمن منافسات الجولة 21 من الدوري السعودي. تألق ستيفن بيرغوين بتسجيله هدفين، فيما سجل كريم بنزيما وكاديش هدفي الاتحاد الآخرين، بينما سجل ليوناردو الهدف الوحيد للهلال.
                </p>
                <p className="text-gray-700">
                  هذا الفوز يعزز من موقع الاتحاد في صدارة الدوري السعودي، ويضرب بقوة في سباق اللقب، بينما تعقدت مهمة الهلال في المنافسة على الصدارة.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>إحصائيات المباراة</CardTitle>
              <CardDescription>مقارنة بين الفريقين في الأرقام</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium">{matchData.stats.possession.home}%</span>
                    <span className="text-gray-500">الاستحواذ</span>
                    <span className="font-medium">{matchData.stats.possession.away}%</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
                    <div className="bg-blue-600" style={{ width: `${matchData.stats.possession.home}%` }}></div>
                    <div className="bg-green-600" style={{ width: `${matchData.stats.possession.away}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium">{matchData.stats.shots.home}</span>
                    <span className="text-gray-500">التسديدات</span>
                    <span className="font-medium">{matchData.stats.shots.away}</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
                    <div className="bg-blue-600" style={{ width: `${(matchData.stats.shots.home / (matchData.stats.shots.home + matchData.stats.shots.away)) * 100}%` }}></div>
                    <div className="bg-green-600" style={{ width: `${(matchData.stats.shots.away / (matchData.stats.shots.home + matchData.stats.shots.away)) * 100}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium">{matchData.stats.shotsOnTarget.home}</span>
                    <span className="text-gray-500">التسديدات على المرمى</span>
                    <span className="font-medium">{matchData.stats.shotsOnTarget.away}</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
                    <div className="bg-blue-600" style={{ width: `${(matchData.stats.shotsOnTarget.home / (matchData.stats.shotsOnTarget.home + matchData.stats.shotsOnTarget.away)) * 100}%` }}></div>
                    <div className="bg-green-600" style={{ width: `${(matchData.stats.shotsOnTarget.away / (matchData.stats.shotsOnTarget.home + matchData.stats.shotsOnTarget.away)) * 100}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium">{matchData.stats.corners.home}</span>
                    <span className="text-gray-500">الركنيات</span>
                    <span className="font-medium">{matchData.stats.corners.away}</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
                    <div className="bg-blue-600" style={{ width: `${(matchData.stats.corners.home / (matchData.stats.corners.home + matchData.stats.corners.away)) * 100}%` }}></div>
                    <div className="bg-green-600" style={{ width: `${(matchData.stats.corners.away / (matchData.stats.corners.home + matchData.stats.corners.away)) * 100}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium">{matchData.stats.fouls.home}</span>
                    <span className="text-gray-500">الأخطاء</span>
                    <span className="font-medium">{matchData.stats.fouls.away}</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
                    <div className="bg-blue-600" style={{ width: `${(matchData.stats.fouls.home / (matchData.stats.fouls.home + matchData.stats.fouls.away)) * 100}%` }}></div>
                    <div className="bg-green-600" style={{ width: `${(matchData.stats.fouls.away / (matchData.stats.fouls.home + matchData.stats.fouls.away)) * 100}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium">{matchData.stats.yellowCards.home}</span>
                    <span className="text-gray-500">البطاقات الصفراء</span>
                    <span className="font-medium">{matchData.stats.yellowCards.away}</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
                    <div className="bg-blue-600" style={{ width: `${(matchData.stats.yellowCards.home / (matchData.stats.yellowCards.home + matchData.stats.yellowCards.away || 1)) * 100}%` }}></div>
                    <div className="bg-green-600" style={{ width: `${(matchData.stats.yellowCards.away / (matchData.stats.yellowCards.home + matchData.stats.yellowCards.away || 1)) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Teams Tab */}
        <TabsContent value="teams">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-2">
                    {matchData.homeTeam.name.substring(0, 1)}
                  </span>
                  {matchData.homeTeam.name}
                </CardTitle>
                <CardDescription>المدرب: {matchData.homeTeam.coach}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">اللاعبين الأساسيين</h4>
                  <ul className="space-y-2">
                    {matchData.homeTeam.keyPlayers.map((player, index) => (
                      <li key={index} className="flex items-center">
                        <Badge variant="outline" className="mr-2">
                          {player.position}
                        </Badge>
                        <span>{player.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">نقاط القوة</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {matchData.homeTeam.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">نقاط الضعف</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {matchData.homeTeam.weaknesses.map((weakness, index) => (
                      <li key={index}>{weakness}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center">
                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-2">
                    {matchData.awayTeam.name.substring(0, 1)}
                  </span>
                  {matchData.awayTeam.name}
                </CardTitle>
                <CardDescription>المدرب: {matchData.awayTeam.coach}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">اللاعبين الأساسيين</h4>
                  <ul className="space-y-2">
                    {matchData.awayTeam.keyPlayers.map((player, index) => (
                      <li key={index} className="flex items-center">
                        <Badge variant="outline" className="mr-2">
                          {player.position}
                        </Badge>
                        <span>{player.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">نقاط القوة</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {matchData.awayTeam.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">نقاط الضعف</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {matchData.awayTeam.weaknesses.map((weakness, index) => (
                      <li key={index}>{weakness}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-2">
                    {matchData.homeTeam.name.substring(0, 1)}
                  </span>
                  التوصيات التكتيكية لـ {matchData.homeTeam.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {tacticalRecommendations.alHilal.map((recommendation, index) => (
                    <li key={index} className="flex">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mr-3">
                        {index + 1}
                      </span>
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">تحليل مفصل للاعبين</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center">
                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-2">
                    {matchData.awayTeam.name.substring(0, 1)}
                  </span>
                  التوصيات التكتيكية لـ {matchData.awayTeam.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {tacticalRecommendations.alIttihad.map((recommendation, index) => (
                    <li key={index} className="flex">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center mr-3">
                        {index + 1}
                      </span>
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">تحليل مفصل للاعبين</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 