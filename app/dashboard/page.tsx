'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { UserRole } from '../types';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import CoachDashboard from '../components/dashboard/CoachDashboard';
import PlayerDashboard from '../components/dashboard/PlayerDashboard';
import MedicalDashboard from '../components/dashboard/MedicalDashboard';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') as UserRole || 'coach';
  
  // Validate role
  const validRoles: UserRole[] = ['admin', 'coach', 'player', 'medical'];
  const userRole = validRoles.includes(role as UserRole) ? role as UserRole : 'coach';
  
  // Render the appropriate dashboard based on user role
  const renderDashboard = () => {
    switch (userRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'coach':
        return <CoachDashboard />;
      case 'player':
        return <PlayerDashboard />;
      case 'medical':
        return <MedicalDashboard />;
      default:
        return <CoachDashboard />;
    }
  };

  return renderDashboard();
}
