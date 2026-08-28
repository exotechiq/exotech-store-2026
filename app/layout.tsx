import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EXOTECH | إكسوتيك',
  description: 'المتجر الإلكتروني الرسمي لـ EXOTECH - حواسب تجميع، ملحقات قيمنق، وخدمات الطباعة ثلاثية الأبعاد',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-cyan-500 selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
