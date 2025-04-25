# Changelog

All notable changes to the WIN IO project will be documented in this file.

## [Unreleased]

### Added
- **Added comprehensive match analysis page for Al-Hilal vs. Al-Ittihad with detailed statistics, team information, and tactical recommendations**
- **README updated with comprehensive project description in both English and Arabic**
- **Added workflow diagram to documentation**
- Initial application interface and pages
- Basic AI feature for data retrieval and processing

### Planned
- Enhanced data processing capabilities
- Improved user interface
- Additional AI features integration
- Database optimization
- Mobile responsiveness improvements

## [Unreleased]

### Added
- **Created role-based dashboard system with dedicated layouts and UI for each user type (admin, coach, player, medical).**
- **Implemented dynamic dashboard navigation that changes based on user role and permissions.**
- **Developed specialized admin dashboard with financial reports, user management, and organizational metrics.**
- **Built dedicated coach dashboard with team performance metrics, training plans, and tactical insights.**
- **Designed player dashboard with personal performance stats, training schedule, and health status information.**
- **Created medical staff dashboard with injury tracking, recovery programs, and health monitoring tools.**
- **Added URL parameter-based role switching to easily test different dashboard types.**
- **Enhanced login page with automatic role parameter routing based on selected user type.**
- Added logout button functionality to the header profile menu, redirecting to the main page on click. (Note: Backend/auth context logout logic still needs implementation).

### Fixed
- **Added missing avatar images in the messages page to properly display user profile pictures.**
- **Refactored theme color definitions in `app/globals.css` to correctly apply light and dark modes using OKLCH variables and the `.dark` class, removing conflicting RGB variables and `prefers-color-scheme` media query.**
- **Updated component styles (`.card`, `.nav-item-*`, scrollbar) in `app/globals.css` to use CSS theme variables, ensuring they adapt correctly to light and dark modes.**
- **Attempted to automatically refactor hardcoded colors in components (`app/medical/page.tsx`, etc.) to use theme variables. Manual review and refactoring likely still required due to widespread use of hardcoded classes.**
- **Refactored hardcoded colors in `app/dashboard/page.tsx` (Recent Activity, Quick Actions, etc.) and `app/components/dashboard/StatCard.tsx` to use theme-aware components and utility classes.**
- **Fixed StatCard component to import the correct theme-aware Card component, resolving stat cards appearing white in dark mode.**
- **Improved spacing, margins, and padding in dashboard components for better layout consistency and visual hierarchy. Standardized card headers, content spacing, and text sizes.**
- **Added missing `uuid` package dependency required for generating unique identifiers in the messages module.**
- **Completely redesigned the medical page with proper theme-aware components, improved filter UI, standardized spacing, and better mobile responsiveness.**
- **Enhanced login page with user type selection cards for quick access, allowing instant login based on user role without entering credentials.**
- **Refined login page interface with improved light/dark mode support, reduced spacing for a more compact design, and better visual hierarchy.**
- **Simplified login page by removing extraneous content and focusing on core login functionality, resulting in a cleaner, more focused interface.**
- **Updated SimpleCalendar component to support all DayPicker props and removed non-existent components to fix type errors.**
- Refactored `ChatBubble` component (`app/components/ui/ChatBubble.tsx`) for improved avatar placement and spacing.
- Adjusted `ChatView` component (`app/components/messages/ChatView.tsx`) to use `space-y-4` for consistent vertical spacing between messages.

## تحسينات واجهة المستخدم وتجربة المستخدم

### 2024-05-24

**تحسين صفحة تسجيل الدخول:**
- **إضافة توجيه تلقائي للوحة التحكم المناسبة حسب نوع المستخدم المحدد**
- **ربط صفحة تسجيل الدخول بنظام الأدوار من خلال معلمات عنوان URL**
- **تحسين تجربة المستخدم من خلال التحويل المباشر إلى لوحة التحكم المناسبة**

### 2024-05-23

**تطوير لوحات تحكم متخصصة حسب نوع المستخدم:**
- **إنشاء نظام للوحات تحكم مخصصة تتغير حسب نوع المستخدم (إداري، مدرب، لاعب، طبي)**
- **تطبيق قوائم تنقل ديناميكية تتغير بناءً على صلاحيات المستخدم**
- **تطوير لوحة تحكم إدارية متخصصة مع تقارير مالية وإدارة مستخدمين ومقاييس تنظيمية**
- **بناء لوحة تحكم للمدربين مع مقاييس أداء الفريق وخطط تدريبية ورؤى تكتيكية**
- **تصميم لوحة تحكم للاعبين مع إحصائيات أداء شخصية وجدول تدريب ومعلومات حالة صحية**
- **إنشاء لوحة تحكم للطاقم الطبي مع تتبع الإصابات وبرامج التعافي وأدوات مراقبة صحية**
- **إضافة تبديل الأدوار عبر معلمات عنوان URL لاختبار أنواع لوحات التحكم المختلفة بسهولة**

### 2024-05-21

**تحسين ألوان السمة الفاتحة:**
- إعادة تصميم كامل للنظام اللوني للوضع الفاتح
- تنفيذ نظام ألوان متناسق مع قيم oklch محسنة
- تحسين التباين والقراءة في جميع العناصر
- إضافة قيم لونية متناغمة للسمة الرئيسية والثانوية
- تحسين تجربة المستخدم البصرية في الوضع الفاتح

### 2024-05-20

**إصلاح مشكلة ألوان السمات:**
- تصحيح قيم الألوان في وضع السمة الفاتحة لعرض خلفية فاتحة بشكل صحيح
- تحسين قيم ألوان السمة الداكنة لتباين أفضل
- تعديل قيم إضاءة الألوان في نظام oklch لضمان رؤية أفضل

### 2024-05-19

**تم تطبيق تحسينات جذرية على واجهة المستخدم باستخدام Shadcn/UI:**

- إضافة نظام السمات (الوضع الفاتح والداكن) باستخدام `next-themes`
- تحديث تخطيط لوحة التحكم الرئيسية للمنصة
- إنشاء واجهة مستخدم متجاوبة لجميع أحجام الشاشات
- تنفيذ شريط جانبي محسّن مع تنقل سلس
- إضافة رأس متجاوب للأجهزة المحمولة والحواسيب المكتبية
- تكامل مكونات Shadcn UI التالية:
  - Button
  - Card
  - Table
  - Badge
  - Avatar
  - Sheet (للقائمة الجانبية المتجاوبة)
  - Tabs
  - DropdownMenu
  - Dialog
  - Form components
  - Tooltip
  - Popover

### تحسينات تجربة المستخدم:
- تحسين التنقل بين صفحات التطبيق
- إضافة القابلية للوصول وتوافق سياقات القراءة من اليمين لليسار
- تحسين تصميم البطاقات وعرض البيانات
- تنفيذ تجربة مستخدم متماسكة عبر جميع صفحات التطبيق

## Plans for Next Update
- إضافة الرسوم البيانية وتصورات البيانات لعرض إحصائيات اللاعبين
- تنفيذ نموذج تسجيل الدخول المحسّن
- تحسين واجهة الإشعارات والتنبيهات
- تحسين واجهة المستخدم لصفحات التحليل التكتيكي

## Summary in English

Added role-based dashboards and improved UI/UX:
- Created specialized dashboards for different user roles (admin, coach, player, medical)
- Implemented dynamic sidebar navigation based on user permissions
- Built role-specific UI components tailored to each user type's needs
- Added URL parameter-based role switching for easy testing
- Enhanced login page with automatic role-based routing
- Restructured the application to support role-based layouts
- Improved data visualization and organization for each user type
- Enhanced user experience with role-specific actions and data views

Previously:
- Added light/dark theme support
- Updated dashboard layout
- Created responsive layout for all screen sizes
- Implemented improved sidebar with smooth navigation
- Added responsive header for mobile and desktop
- Integrated various Shadcn UI components (Button, Card, Table, etc.)
- Improved user experience with enhanced navigation, RTL support, and consistent design
- Fixed theme color values to properly display light background in light mode and dark background in dark mode
- Completely redesigned light theme color scheme for a more professional and cohesive look 

## 2023-11-15

**Type fixes in `app/medical/page.tsx`**:
- **Fixed type errors by updating interfaces to match data structure**
- Updated `MedicalRecord` interface to use string IDs and proper type for status
- Added proper date handling with support for Date objects
- Added explicit typing for filter states and handlers
- Fixed conditional rendering for player jersey numbers 

## 2024-05-20

### Added
- **Created missing player dashboard pages to fix 404 errors:**
  - `/player/training`: Added training schedule, weekly training plan, and personal training plans
  - `/player/stats`: Added player statistics, performance metrics, and match analysis
  - `/player/medical`: Added medical reports, injury history, and nutrition plans
  - `/player/evaluation`: Added player evaluations, coach reviews, and development goals
- Created Progress UI component with Radix UI
- Installed required dependencies (@radix-ui/react-progress)

### Fixed
- Resolved 404 errors in the player dashboard navigation routes 