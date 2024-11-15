import { StoreWrapper } from '@/app/store/provider';
import { leftRoutes, rightRoutes } from '@/shared/constants';
import NavBarWrapper from '@/widgets/Navbar/ui/NavBarWrapper';
import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Listopia',
  description: 'Portfolio project',
};

const logo = { name: 'LISTOPIA' };

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="body">
        <header className="header">
          <StoreWrapper>
            <NavBarWrapper
              leftRoutes={leftRoutes}
              logo={logo}
              rightRoutes={rightRoutes}
            />
          </StoreWrapper>
        </header>
        {children}
      </body>
    </html>
  );
}
