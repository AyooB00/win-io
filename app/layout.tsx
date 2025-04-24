import './globals.css';
import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';

// Initialize Tajawal font with Arabic subset
const tajawal = Tajawal({ 
  subsets: ['arabic'], 
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
});

export const metadata: Metadata = {
  title: 'مساعد المدرب والفريق - منصة إدارة فريق كرة القدم',
  description: 'منصة متكاملة لإدارة فريق كرة القدم، تحليل المنافسين، ومتابعة الحالة البدنية والذهنية للاعبين',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${tajawal.variable} font-sans bg-gray-50 text-gray-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
