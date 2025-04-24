'use client';

import React from 'react';
import { Card } from "@/components/ui/card";

export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: {
    type: 'increase' | 'decrease' | 'neutral';
    value: string;
  };
  description?: string;
  valueColor?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  description,
  valueColor,
  className = '',
}) => {
  // Get the appropriate arrow and color based on change type
  const renderChangeIcon = () => {
    if (change.type === 'increase') {
      return (
        <svg className="w-3 h-3 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      );
    } else if (change.type === 'decrease') {
      return (
        <svg className="w-3 h-3 text-red-500 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      );
    } else {
      return (
        <svg className="w-3 h-3 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      );
    }
  };

  // Get the appropriate text color for the change
  const getChangeColor = () => {
    if (change.type === 'increase') return 'text-green-500 dark:text-green-400';
    if (change.type === 'decrease') return 'text-red-500 dark:text-red-400';
    return 'text-muted-foreground';
  };

  // Determine the value color - default to primary if not provided
  const finalValueColor = valueColor || 'text-primary';

  return (
    <Card className={`${className}`}>
      <div className="flex items-center justify-between p-5">
        <div className="space-y-2">
          <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
          <p className={`text-2xl font-semibold ${finalValueColor}`}>{value}</p>
          
          {change && (
            <p className={`text-sm ${getChangeColor()} flex items-center`}>
              {renderChangeIcon()}
              <span className="mr-1 rtl:mr-0 rtl:ml-1">{change.value}</span>
            </p>
          )}
          
          {(description && !change) && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        
        {icon && (
          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 ml-4 rtl:ml-0 rtl:mr-4">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard; 