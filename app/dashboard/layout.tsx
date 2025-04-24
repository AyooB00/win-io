import React from 'react';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { MobileNav } from '@/app/components/layout/MobileNav';
import type { UserRole } from '@/app/types';

// This is the correct layout structure for Next.js App Router
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In a real app, you would get this from an auth context/API
  // For now, we'll mock it
  const userRole: UserRole = 'coach';

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar for desktop */}
      <aside className="hidden lg:block h-screen sticky top-0">
        <Sidebar userRole={userRole} />
      </aside>
      
      {/* Main content area with mobile nav */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile navigation - only visible on small screens */}
        <div className="lg:hidden sticky top-0 z-10">
          <MobileNav userRole={userRole} />
        </div>
        
        {/* Main content area with scroll */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
} 