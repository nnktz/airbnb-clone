import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

import { NavBar } from '@/components/layout/nav-bar';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Holiday Homes & Condo Rentals',
  icons: [
    {
      url: '/airbnb-ico.svg',
      href: '/airbnb-ico.svg',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}