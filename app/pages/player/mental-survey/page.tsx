'use client';

import React, { useState } from 'react';
import {DashboardLayout} from '@/app/components/layout/DashboardLayout';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { getUpcomingMatches, getTeamById } from '@/app/data/mockData';

const MentalSurveyPage = () => {
  const upcomingMatches = getUpcomingMatches();
  const nextMatch = upcomingMatches.length > 0 ? upcomingMatches[0] : null;
  
  const [surveyData, setSurveyData] = useState({
    energy: 5,
    focus: 5,
    confidence: 5,
    motivation: 5,
    anxiety: 5,
    notes: '',
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  // Handle slider changes
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSurveyData(prev => ({
      ...prev,
      [name]: parseInt(value),
    }));
  };
  
  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSurveyData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Survey submitted:', surveyData);
    setSubmitted(true);
  };
  
  // Get opponent team name
  const getOpponentName = () => {
    if (!nextMatch) return 'غير محدد';
    
    // Assuming the first team is always the current team
    const opponentId = nextMatch.homeTeam.id === 'team1' ? nextMatch.awayTeam.id : nextMatch.homeTeam.id;
    const opponent = getTeamById(opponentId);
    return opponent?.name || 'غير محدد';
  };
  
  // Format match date
  const formatMatchDate = (date: Date | undefined) => {
    if (!date) return 'غير محدد';
    
    return new Date(date).toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Render slider with label
  const renderSlider = (
    name: keyof typeof surveyData,
    label: string,
    min: number,
    max: number,
    lowLabel: string,
    highLabel: string
  ) => {
    return (
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <span className="text-sm font-medium text-blue-600">
            {surveyData[name]}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-xs text-gray-500 w-20">{lowLabel}</span>
          <input
            type="range"
            id={name}
            name={name}
            min={min}
            max={max}
            value={surveyData[name]}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mx-4"
          />
          <span className="text-xs text-gray-500 w-20 text-left">{highLabel}</span>
        </div>
      </div>
    );
  };
  
  return (
    <DashboardLayout>
      {submitted ? (
        <Card>
          <div className="py-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="mt-4 text-lg font-medium text-gray-900">
              تم تقديم الاستبيان بنجاح
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              شكرًا لك، تم إرسال استبيان جاهزيتك الذهنية للجهاز الفني.
            </p>
            <div className="mt-6">
              <Button onClick={() => setSubmitted(false)}>
                تقديم استبيان جديد
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <>
          <Card title="المباراة القادمة" className="mb-6">
            <div className="py-4">
              {nextMatch ? (
                <div className="text-center">
                  <h3 className="font-medium text-gray-900">
                    {getOpponentName()}
                  </h3>
                  <p className="text-gray-500 mt-2">
                    {formatMatchDate(nextMatch.date)}
                  </p>
                  <p className="text-gray-500">
                    {nextMatch.venue} - {nextMatch.competition}
                  </p>
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  لا توجد مباريات قادمة مجدولة حاليًا
                </p>
              )}
            </div>
          </Card>
          
          <Card title="استبيان الجاهزية الذهنية">
            <form onSubmit={handleSubmit}>
              <p className="text-gray-500 mb-6">
                يرجى تقييم حالتك الذهنية قبل المباراة القادمة. سيتم مشاركة هذه المعلومات مع الجهاز الفني والطبي لمساعدتك على تحقيق أفضل أداء.
              </p>
              
              {renderSlider(
                'energy',
                'مستوى الطاقة',
                1,
                10,
                'منخفض جدًا',
                'مرتفع جدًا'
              )}
              
              {renderSlider(
                'focus',
                'التركيز',
                1,
                10,
                'مشتت',
                'مركز تمامًا'
              )}
              
              {renderSlider(
                'confidence',
                'الثقة',
                1,
                10,
                'غير واثق',
                'واثق جدًا'
              )}
              
              {renderSlider(
                'motivation',
                'الدافع',
                1,
                10,
                'غير متحمس',
                'متحمس جدًا'
              )}
              
              {renderSlider(
                'anxiety',
                'القلق',
                1,
                10,
                'هادئ تمامًا',
                'قلق جدًا'
              )}
              
              <div className="mb-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  ملاحظات إضافية
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="أي ملاحظات أخرى تود مشاركتها مع الجهاز الفني والطبي..."
                  value={surveyData.notes}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">
                  إرسال الاستبيان
                </Button>
              </div>
            </form>
          </Card>
        </>
      )}
    </DashboardLayout>
  );
};

export default MentalSurveyPage; 