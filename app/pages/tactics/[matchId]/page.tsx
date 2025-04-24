'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import {DashboardLayout} from '@/app/components/layout/DashboardLayout';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import Image from 'next/image';
import { mockMatches, getMatchById, getTacticalAnalysisByMatchId } from '@/app/data/mockData';
import Link from 'next/link';

// Soccer field formation visualization component
const FormationVisualization = ({ formation }: { formation: string }) => {
  // Simple mapping of formations to player positions on the field
  const formations: Record<string, { top: number; right: number }[]> = {
    '4-3-3': [
      { top: 85, right: 50 }, // GK
      { top: 65, right: 20 }, // DEF
      { top: 65, right: 40 }, // DEF
      { top: 65, right: 60 }, // DEF
      { top: 65, right: 80 }, // DEF
      { top: 45, right: 30 }, // MID
      { top: 45, right: 50 }, // MID
      { top: 45, right: 70 }, // MID
      { top: 25, right: 20 }, // FWD
      { top: 25, right: 50 }, // FWD
      { top: 25, right: 80 }, // FWD
    ],
    '4-4-2': [
      { top: 85, right: 50 }, // GK
      { top: 65, right: 20 }, // DEF
      { top: 65, right: 40 }, // DEF
      { top: 65, right: 60 }, // DEF
      { top: 65, right: 80 }, // DEF
      { top: 45, right: 20 }, // MID
      { top: 45, right: 40 }, // MID
      { top: 45, right: 60 }, // MID
      { top: 45, right: 80 }, // MID
      { top: 25, right: 35 }, // FWD
      { top: 25, right: 65 }, // FWD
    ],
    '3-5-2': [
      { top: 85, right: 50 }, // GK
      { top: 65, right: 30 }, // DEF
      { top: 65, right: 50 }, // DEF
      { top: 65, right: 70 }, // DEF
      { top: 45, right: 10 }, // MID
      { top: 45, right: 30 }, // MID
      { top: 45, right: 50 }, // MID
      { top: 45, right: 70 }, // MID
      { top: 45, right: 90 }, // MID
      { top: 25, right: 35 }, // FWD
      { top: 25, right: 65 }, // FWD
    ],
    '5-3-2': [
      { top: 85, right: 50 }, // GK
      { top: 65, right: 10 }, // DEF
      { top: 65, right: 30 }, // DEF
      { top: 65, right: 50 }, // DEF
      { top: 65, right: 70 }, // DEF
      { top: 65, right: 90 }, // DEF
      { top: 45, right: 30 }, // MID
      { top: 45, right: 50 }, // MID
      { top: 45, right: 70 }, // MID
      { top: 25, right: 35 }, // FWD
      { top: 25, right: 65 }, // FWD
    ],
  };
  
  // Default to 4-3-3 if formation not found
  const positions = formations[formation] || formations['4-3-3'];
  
  return (
    <div className="relative w-full h-96 bg-green-600 border-2 border-white rounded-lg overflow-hidden">
      {/* Field markings */}
      <div className="absolute top-0 right-0 w-full h-full">
        {/* Center circle */}
        <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white rounded-full"></div>
        {/* Center line */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-full h-0.5 bg-white"></div>
        {/* Penalty areas */}
        <div className="absolute top-[15%] right-[20%] w-[60%] h-[20%] border-2 border-white"></div>
        <div className="absolute bottom-[15%] right-[20%] w-[60%] h-[20%] border-2 border-white"></div>
        {/* Goal areas */}
        <div className="absolute top-[32%] right-[35%] w-[30%] h-[10%] border-2 border-white"></div>
        <div className="absolute bottom-[32%] right-[35%] w-[30%] h-[10%] border-2 border-white"></div>
      </div>
      
      {/* Player positions */}
      {positions.map((pos, index) => (
        <div
          key={index}
          className="absolute w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 font-bold"
          style={{ top: `${pos.top}%`, right: `${pos.right}%` }}
        >
          {index === 0 ? 'GK' : index}
        </div>
      ))}
    </div>
  );
};

// Main page component
const TacticalAnalysisPage = () => {
  const params = useParams();
  const matchId = params.matchId as string;
  
  // Find the match
  const match = getMatchById(matchId);
  
  // Get tactical analysis
  const tacticalAnalysis = getTacticalAnalysisByMatchId(matchId);
  
  // Local state for active tab
  const [activeTab, setActiveTab] = useState<'overview' | 'opponent' | 'tactics'>('overview');
  
  if (!match || !tacticalAnalysis) {
    return (
      <DashboardLayout>
        <Card>
          <div className="py-8 text-center">
            <p className="text-gray-500">لا يوجد تحليل تكتيكي متاح لهذه المباراة.</p>
            <div className="mt-4">
              <Link href="/matches" passHref>
                <Button>العودة إلى المباريات</Button>
              </Link>
            </div>
          </div>
        </Card>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <Card 
        title={`التحليل التكتيكي - ${match.awayTeam.name || 'المنافس'}`}
        subtitle={new Date(match.date).toLocaleDateString('ar-EG', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      >
        {/* Tabs */}
        <div className="border-b mb-6">
          <div className="flex -mb-px">
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === 'overview'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              نظرة عامة
            </button>
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === 'opponent'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('opponent')}
            >
              تحليل المنافس
            </button>
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === 'tactics'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('tactics')}
            >
              الخطة المقترحة
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-medium mb-4">المباراة</h3>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 relative">
                    {match.awayTeam.logo ? (
                      <Image
                        src={match.awayTeam.logo}
                        alt={match.awayTeam.name}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-lg font-semibold">{match.awayTeam.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className="mr-4">
                    <h4 className="font-bold">{match.awayTeam.name}</h4>
                    <p className="text-gray-500">{match.competition || 'مباراة ودية'}</p>
                    <p className="text-gray-500">{match.venue}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">النقاط الرئيسية</h3>
                <ul className="bg-blue-50 p-4 rounded-lg space-y-2">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>التركيز على الهجمات السريعة من الأطراف</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>استغلال الضعف في تغطية الأطراف</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>الضغط العالي لإجبار المنافس على الأخطاء</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">ملاحظات تكتيكية</h3>
              <p className="text-gray-700 leading-relaxed">
                {tacticalAnalysis.tacticalNotes}
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'opponent' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">نقاط القوة</h3>
                <ul className="space-y-2">
                  {tacticalAnalysis.opponentStrengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="mr-2 text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">نقاط الضعف</h3>
                <ul className="space-y-2">
                  {tacticalAnalysis.opponentWeaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3.707-8.707l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 9.414V13a1 1 0 11-2 0V9.414l-1.293 1.293a1 1 0 01-1.414-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="mr-2 text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">اللاعبون المؤثرون</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tacticalAnalysis.keyPlayers.map((player, index) => {
                  return (
                    <div key={index} className="border rounded-lg p-4 flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold">
                        {index + 1}
                      </div>
                      <div className="mr-3">
                        <h4 className="font-medium">{player}</h4>
                        <p className="text-sm text-gray-500">مهاجم</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'tactics' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-medium mb-4">التشكيل المقترح</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-center mb-4">
                    <span className="text-xl font-bold bg-blue-100 text-blue-800 py-1 px-4 rounded-full">
                      {tacticalAnalysis.recommendedFormation}
                    </span>
                  </div>
                  <FormationVisualization formation={tacticalAnalysis.recommendedFormation} />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">النقاط التكتيكية الرئيسية</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                    <h4 className="font-medium text-blue-800">الهجوم</h4>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-start">
                        <span className="text-blue-600 ml-2">•</span>
                        <span>الهجمات السريعة من الأطراف مع التركيز على الجانب الأيمن</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 ml-2">•</span>
                        <span>استخدام الكرات العرضية العالية للاستفادة من ضعف المدافعين في الهواء</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                    <h4 className="font-medium text-green-800">خط الوسط</h4>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-start">
                        <span className="text-green-600 ml-2">•</span>
                        <span>التحكم في إيقاع اللعب وإبطاء الهجمات المرتدة للمنافس</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 ml-2">•</span>
                        <span>تضييق المساحات في وسط الملعب ومنع التمريرات البينية</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <h4 className="font-medium text-red-800">الدفاع</h4>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-start">
                        <span className="text-red-600 ml-2">•</span>
                        <span>الحذر من السرعة في الأطراف والهجمات المرتدة</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 ml-2">•</span>
                        <span>تنظيم خط دفاعي متماسك مع تغطية عمق الملعب</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
};

export default TacticalAnalysisPage; 