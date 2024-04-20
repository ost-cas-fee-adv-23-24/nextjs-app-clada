import { MainLayout } from '@/components/layout/main-layout';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['500', '600', '700'],
  subsets: ['latin-ext'],
});

export const metadata: Metadata = {
  title: 'Mumble',
  description: 'Mumble Web App 2024',
  applicationName: 'Mumble',
  authors: [
    {
      url: 'https://github.com/claudio-OST',
      name: 'Claudio Steffen',
    },
    {
      url: 'https://github.com/malinovic',
      name: 'Danijel Malinovic',
    },
  ],
  keywords: [
    'Mumble',
    'Platform',
    'Team Clada',
    'Twitter / X Replacement',
    'Much better than Twitter / X',
  ],
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
