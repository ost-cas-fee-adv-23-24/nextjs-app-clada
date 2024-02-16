import { MainLayout } from '@/components/layout/main-layout';
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['500', '600', '700'],
  subsets: ['latin-ext'],
});

export const metadata: Metadata = {
  title: 'Mumble',
  description: 'Mumble Web App 2024',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
