import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

import getCurrentUser from '@/actions/get-current-user';

import { NavBar } from '@/components/layout/nav-bar';
import { ModalProvider } from '@/components/providers/modal-provider';
import { ToasterProvider } from '@/components/providers/toaster-provider';

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body className={font.className}>
        <ToasterProvider />
        <ModalProvider />
        <NavBar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
