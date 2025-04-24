'use client';

import React from 'react';
import { 
  UserGroupIcon as UserGroup,
  BoltIcon as Lightning,
  NoSymbolIcon as Ban,
  CalendarIcon as Calendar,
  ChartBarIcon as Chart,
  ShieldExclamationIcon as Shield,
  LockClosedIcon as Lock
} from '@heroicons/react/24/outline';

export const UserGroupIcon = (props: React.ComponentProps<typeof UserGroup>) => <UserGroup {...props} />;
export const MedicalIcon = (props: React.ComponentProps<'svg'>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3" />
    <path d="M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4" />
    <circle cx="20" cy="10" r="2" />
    <path d="M15 9h-5a1 1 0 01-1-1V4" />
  </svg>
);
export const BanIcon = (props: React.ComponentProps<typeof Ban>) => <Ban {...props} />;
export const CalendarIcon = (props: React.ComponentProps<typeof Calendar>) => <Calendar {...props} />;
export const ChartIcon = (props: React.ComponentProps<typeof Chart>) => <Chart {...props} />;
export const ShieldIcon = (props: React.ComponentProps<typeof Shield>) => <Shield {...props} />;
export const LockIcon = (props: React.ComponentProps<typeof Lock>) => <Lock {...props} />;
export const GoalIcon = (props: React.ComponentProps<'svg'>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 8a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3H6a3 3 0 01-3-3V8z" />
    <path d="M3 8h18v8H3V8z" />
    <path d="M12 22v-4" />
    <path d="M12 2v4" />
    <path d="M3 8v8" />
    <path d="M21 8v8" />
  </svg>
); 