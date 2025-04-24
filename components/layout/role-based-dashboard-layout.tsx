"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
  Bell,
  ChevronDown,
  Home,
  LineChart,
  Menu,
  MessageSquare,
  Search,
  Settings,
  UserSquare2,
  Users,
  Activity,
  Heart,
  ClipboardCheck,
  CalendarClock,
  Trophy,
  Dumbbell,
  Stethoscope,
  Brain,
  TrendingUp,
  ListChecks,
  FileText,
  BarChart,
  Lock,
  HelpCircle,
  Shield,
  Newspaper,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { UserRole } from '@/app/types'

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
  roles: UserRole[]
  badge?: {
    count: number
    color: string
  }
}

// Nav items for different user roles
const navItems: Record<UserRole, NavItem[]> = {
  admin: [
    {
      label: 'لوحة التحكم',
      path: '/dashboard',
      icon: <Home className="h-5 w-5" />,
      roles: ['admin'],
    },
    {
      label: 'إدارة المستخدمين',
      path: '/admin/users',
      icon: <Users className="h-5 w-5" />,
      roles: ['admin'],
    },
    {
      label: 'إدارة الفرق',
      path: '/admin/teams',
      icon: <Shield className="h-5 w-5" />,
      roles: ['admin'],
    },
    {
      label: 'جدولة المباريات',
      path: '/admin/matches',
      icon: <CalendarClock className="h-5 w-5" />,
      roles: ['admin'],
      badge: {
        count: 3,
        color: 'bg-green-500',
      },
    },
    {
      label: 'التقارير والإحصائيات',
      path: '/admin/reports',
      icon: <BarChart className="h-5 w-5" />,
      roles: ['admin'],
    },
    {
      label: 'المالية والميزانية',
      path: '/admin/finance',
      icon: <TrendingUp className="h-5 w-5" />,
      roles: ['admin'],
    },
    {
      label: 'الإعلانات والأخبار',
      path: '/admin/news',
      icon: <Newspaper className="h-5 w-5" />,
      roles: ['admin'],
    },
    {
      label: 'الرسائل',
      path: '/messages',
      icon: <MessageSquare className="h-5 w-5" />,
      roles: ['admin'],
      badge: {
        count: 5,
        color: 'bg-blue-500',
      },
    },
    {
      label: 'الإعدادات',
      path: '/settings',
      icon: <Settings className="h-5 w-5" />,
      roles: ['admin'],
    },
  ],
  
  coach: [
    {
      label: 'لوحة التحكم',
      path: '/dashboard',
      icon: <Home className="h-5 w-5" />,
      roles: ['coach'],
    },
    {
      label: 'تفاصيل الفريق',
      path: '/team',
      icon: <Users className="h-5 w-5" />,
      roles: ['coach'],
    },
    {
      label: 'المباريات',
      path: '/matches',
      icon: <Trophy className="h-5 w-5" />,
      roles: ['coach'],
      badge: {
        count: 2,
        color: 'bg-green-500',
      },
    },
    {
      label: 'التحليل التكتيكي',
      path: '/tactics',
      icon: <Brain className="h-5 w-5" />,
      roles: ['coach'],
    },
    {
      label: 'الخطط التدريبية',
      path: '/coach/training',
      icon: <ClipboardCheck className="h-5 w-5" />,
      roles: ['coach'],
    },
    {
      label: 'تقييم اللاعبين',
      path: '/coach/evaluation',
      icon: <LineChart className="h-5 w-5" />,
      roles: ['coach'],
    },
    {
      label: 'الحالة البدنية',
      path: '/fitness',
      icon: <Activity className="h-5 w-5" />,
      roles: ['coach'],
    },
    {
      label: 'السجل الطبي',
      path: '/medical',
      icon: <Heart className="h-5 w-5" />,
      roles: ['coach'],
    },
    {
      label: 'الرسائل',
      path: '/messages',
      icon: <MessageSquare className="h-5 w-5" />,
      roles: ['coach'],
      badge: {
        count: 3,
        color: 'bg-blue-500',
      },
    },
    {
      label: 'الإعدادات',
      path: '/settings',
      icon: <Settings className="h-5 w-5" />,
      roles: ['coach'],
    },
  ],
  
  player: [
    {
      label: 'لوحة التحكم',
      path: '/dashboard',
      icon: <Home className="h-5 w-5" />,
      roles: ['player'],
    },
    {
      label: 'جدول التدريب',
      path: '/player/training',
      icon: <CalendarClock className="h-5 w-5" />,
      roles: ['player'],
      badge: {
        count: 1,
        color: 'bg-green-500',
      },
    },
    {
      label: 'المباريات القادمة',
      path: '/matches',
      icon: <Trophy className="h-5 w-5" />,
      roles: ['player'],
    },
    {
      label: 'أدائي وإحصائياتي',
      path: '/player/stats',
      icon: <BarChart className="h-5 w-5" />,
      roles: ['player'],
    },
    {
      label: 'تمارين اللياقة',
      path: '/fitness',
      icon: <Dumbbell className="h-5 w-5" />,
      roles: ['player'],
    },
    {
      label: 'سجلي الطبي',
      path: '/player/medical',
      icon: <Heart className="h-5 w-5" />,
      roles: ['player'],
    },
    {
      label: 'تقييم المدرب',
      path: '/player/evaluation',
      icon: <ClipboardCheck className="h-5 w-5" />,
      roles: ['player'],
      badge: {
        count: 2,
        color: 'bg-yellow-500',
      },
    },
    {
      label: 'الرسائل',
      path: '/messages',
      icon: <MessageSquare className="h-5 w-5" />,
      roles: ['player'],
    },
    {
      label: 'الإعدادات',
      path: '/settings',
      icon: <Settings className="h-5 w-5" />,
      roles: ['player'],
    },
  ],
  
  medical: [
    {
      label: 'لوحة التحكم',
      path: '/dashboard',
      icon: <Home className="h-5 w-5" />,
      roles: ['medical'],
    },
    {
      label: 'حالات اللاعبين',
      path: '/medical/players',
      icon: <Stethoscope className="h-5 w-5" />,
      roles: ['medical'],
      badge: {
        count: 3,
        color: 'bg-red-500',
      },
    },
    {
      label: 'التقارير الطبية',
      path: '/medical/reports',
      icon: <FileText className="h-5 w-5" />,
      roles: ['medical'],
    },
    {
      label: 'جدول الكشوفات',
      path: '/medical/checkups',
      icon: <ListChecks className="h-5 w-5" />,
      roles: ['medical'],
    },
    {
      label: 'إحصائيات الإصابات',
      path: '/medical/stats',
      icon: <BarChart className="h-5 w-5" />,
      roles: ['medical'],
    },
    {
      label: 'تعافي اللاعبين',
      path: '/medical/recovery',
      icon: <Activity className="h-5 w-5" />,
      roles: ['medical'],
    },
    {
      label: 'تمارين التأهيل',
      path: '/medical/rehab',
      icon: <Dumbbell className="h-5 w-5" />,
      roles: ['medical'],
    },
    {
      label: 'الرسائل',
      path: '/messages',
      icon: <MessageSquare className="h-5 w-5" />,
      roles: ['medical'],
      badge: {
        count: 2,
        color: 'bg-blue-500',
      },
    },
    {
      label: 'الإعدادات',
      path: '/settings',
      icon: <Settings className="h-5 w-5" />,
      roles: ['medical'],
    },
  ],
}

// User details by role
const userDetails: Record<UserRole, { name: string, title: string }> = {
  admin: { name: 'أحمد العلي', title: 'المدير الإداري' },
  coach: { name: 'محمد خالد', title: 'المدرب الرئيسي' },
  player: { name: 'عبدالله سلطان', title: 'لاعب وسط' },
  medical: { name: 'د. سعيد الشمري', title: 'رئيس الطاقم الطبي' },
}

interface RoleBasedDashboardLayoutProps {
  children: React.ReactNode
  userRole: UserRole
}

export default function RoleBasedDashboardLayout({ 
  children, 
  userRole 
}: RoleBasedDashboardLayoutProps) {
  const pathname = usePathname()
  
  // Get the navigation items for the current user role
  const filteredNavItems = navItems[userRole] || []
  const currentUserDetails = userDetails[userRole] || { name: 'المستخدم', title: '' }

  // Get page title based on current path
  const getPageTitle = () => {
    const pathSegments = pathname.split('/')
    const currentPath = pathSegments[pathSegments.length - 1]
    
    const currentNavItem = filteredNavItems.find(item => 
      item.path.endsWith(currentPath) || item.path === pathname
    )
    
    return currentNavItem?.label || 'لوحة التحكم'
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header for mobile */}
      <header className="lg:hidden sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">فتح القائمة</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="text-right">مساعد الفريق</SheetTitle>
            </SheetHeader>
            <nav className="grid gap-2 py-6">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === item.path
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50 hover:text-accent-foreground"
                  )}
                >
                  {item.icon}
                  {item.label}
                  {item.badge && (
                    <Badge variant="secondary" className={cn("mr-auto", item.badge.color)}>
                      {item.badge.count}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">مساعد الفريق</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="icon" className="shrink-0">
            <Bell className="h-5 w-5" />
            <span className="sr-only">الإشعارات</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarFallback>{currentUserDetails.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
              <DropdownMenuItem>الإعدادات</DropdownMenuItem>
              <DropdownMenuItem>تسجيل الخروج</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <aside className="hidden lg:flex h-screen w-64 flex-col border-l fixed">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                FC
              </div>
              <h1 className="text-lg font-semibold">مساعد الفريق</h1>
            </Link>
          </div>
          <nav className="flex-1 overflow-auto py-6 px-3">
            <div className="grid gap-2">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    pathname === item.path
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50 hover:text-accent-foreground"
                  )}
                >
                  {item.icon}
                  {item.label}
                  {item.badge && (
                    <Badge variant="secondary" className={cn("mr-auto", item.badge.color)}>
                      {item.badge.count}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>
          </nav>
          <div className="border-t p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{currentUserDetails.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{currentUserDetails.name}</p>
                <p className="text-xs text-muted-foreground">{currentUserDetails.title}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-auto">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
                  <DropdownMenuItem>الإعدادات</DropdownMenuItem>
                  <DropdownMenuItem>تسجيل الخروج</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </aside>
        {/* Main content */}
        <main className="flex-1 lg:mr-64">
          {/* Desktop header */}
          <header className="hidden lg:flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex-1">
              <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="بحث..."
                className="hidden md:flex h-9 w-64 rounded-md border border-input bg-background px-3 py-1 pr-9 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <Button variant="outline" size="icon" className="shrink-0">
              <Bell className="h-5 w-5" />
              <span className="sr-only">الإشعارات</span>
            </Button>
            <ThemeToggle />
          </header>
          {/* Page content */}
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 