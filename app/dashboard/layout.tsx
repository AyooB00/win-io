import React from 'react';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { MobileNav } from '@/app/components/layout/MobileNav';
import type { UserRole } from '@/app/types';
import DashboardLayout from "@/components/layout/dashboard-layout"

// This is the correct layout structure for Next.js App Router
export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
} 