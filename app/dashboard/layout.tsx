'use client';

import React from 'react';
import RoleBasedDashboardLayout from '@/components/layout/role-based-dashboard-layout';
import { useSearchParams } from 'next/navigation';
import { UserRole } from '../types';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') as UserRole || 'coach';
  
  // Validate role
  const validRoles: UserRole[] = ['admin', 'coach', 'player', 'medical'];
  const userRole = validRoles.includes(role as UserRole) ? role as UserRole : 'coach';

  return <RoleBasedDashboardLayout userRole={userRole}>{children}</RoleBasedDashboardLayout>;
} 