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
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
  roles: string[]
  badge?: {
    count: number
    color: string
  }
}

const navItems: NavItem[] = [
  {
    label: 'لوحة التحكم',
    path: '/dashboard',
    icon: <Home className="h-5 w-5" />,
    roles: ['coach', 'player', 'medical', 'admin'],
  },
  {
    label: 'تفاصيل الفريق',
    path: '/team',
    icon: <Users className="h-5 w-5" />,
    roles: ['coach', 'admin'],
  },
  {
    label: 'المباريات',
    path: '/matches',
    icon: <LineChart className="h-5 w-5" />,
    roles: ['coach', 'player', 'admin'],
    badge: {
      count: 2,
      color: 'bg-green-500',
    },
  },
  {
    label: 'التحليل التكتيكي',
    path: '/tactics',
    icon: <Activity className="h-5 w-5" />,
    roles: ['coach'],
  },
  {
    label: 'الحالة البدنية',
    path: '/fitness',
    icon: <UserSquare2 className="h-5 w-5" />,
    roles: ['player', 'medical', 'coach'],
    badge: {
      count: 3,
      color: 'bg-yellow-500',
    },
  },
  {
    label: 'السجل الطبي',
    path: '/medical',
    icon: <Heart className="h-5 w-5" />,
    roles: ['medical', 'coach'],
  },
  {
    label: 'الرسائل',
    path: '/messages',
    icon: <MessageSquare className="h-5 w-5" />,
    roles: ['coach', 'player', 'medical', 'admin'],
  },
  {
    label: 'الإعدادات',
    path: '/settings',
    icon: <Settings className="h-5 w-5" />,
    roles: ['admin', 'coach', 'player', 'medical'],
  },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  // Mock user role - will be replaced with real auth later
  const userRole = 'coach'

  const filteredNavItems = navItems.filter((item) => item.roles.includes(userRole))

  // Get page title based on current path
  const getPageTitle = () => {
    const pathSegments = pathname.split('/')
    const currentPath = pathSegments[pathSegments.length - 1]
    
    switch(currentPath) {
      case 'dashboard':
        return 'لوحة التحكم'
      case 'team':
        return 'تفاصيل الفريق'
      case 'matches':
        return 'المباريات'
      case 'tactics':
        return 'التحليل التكتيكي'
      case 'fitness':
        return 'الحالة البدنية'
      case 'medical':
        return 'السجل الطبي'
      case 'messages':
        return 'الرسائل'
      case 'settings':
        return 'الإعدادات'
      default:
        return 'لوحة التحكم'
    }
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
                    <Badge variant="secondary" className="mr-auto">
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
                <AvatarFallback>مد</AvatarFallback>
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
                    <Badge variant="secondary" className="mr-auto">
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
                <AvatarFallback>مد</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">المدرب أحمد</p>
                <p className="text-xs text-muted-foreground">المدرب الرئيسي</p>
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